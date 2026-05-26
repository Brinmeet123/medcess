'use client'

import { useState, useMemo, useEffect } from 'react'
import { Scenario } from '@/data/scenarios'
import { testCatalog, TestCategory, TestKind } from '@/data/testCatalog'
import { resolveTest } from '@/lib/testEngine'
import { groupCatalogByCategory } from '@/lib/groupCatalogByCategory'
import VocabText from './VocabText'
import VocabContextBlock from './VocabContextBlock'
import CatalogBrowseLayout from './catalog/CatalogBrowseLayout'
import CatalogCategorySidebar from './catalog/CatalogCategorySidebar'
import CatalogSectionHeader from './catalog/CatalogSectionHeader'

type Props = {
  scenario: Scenario
  orderedTests?: Map<string, OrderedTest>
  onTestsOrdered: (tests: Map<string, OrderedTest>) => void
  onTermClick?: (term: string) => void
  onTermSave?: (term: string) => void
}

type OrderedTest = {
  testId: string
  result: string
}

const CATEGORIES: TestCategory[] = [
  'Cardiac', 'Pulmonary', 'Neurology', 'GI', 'Renal',
  'Endocrine', 'Infectious', 'Hematology', 'MSK', 'Imaging', 'Other',
]

export default function TestsPanel({ scenario, orderedTests: initialOrderedTests, onTestsOrdered, onTermClick, onTermSave }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<TestCategory | 'All'>('All')
  const [selectedKind, setSelectedKind] = useState<TestKind | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [commonOnly, setCommonOnly] = useState(false)
  const [orderedTests, setOrderedTests] = useState<Map<string, OrderedTest>>(initialOrderedTests || new Map())

  useEffect(() => {
    if (initialOrderedTests) {
      setOrderedTests(initialOrderedTests)
    }
  }, [initialOrderedTests])

  const testsVocabText = useMemo(() => {
    const lines: string[] = []
    orderedTests.forEach((o) => lines.push(o.result))
    return lines.join('\n')
  }, [orderedTests])

  const filteredTests = useMemo(() => {
    return testCatalog.filter(test => {
      const categoryMatch = selectedCategory === 'All' || test.category === selectedCategory
      const kindMatch = selectedKind === 'All' || test.kind === selectedKind
      const q = searchQuery.trim().toLowerCase()
      const searchMatch =
        q === '' ||
        test.name.toLowerCase().includes(q) ||
        test.description.toLowerCase().includes(q) ||
        test.typicalUses.some((u) => u.toLowerCase().includes(q))
      const commonMatch = !commonOnly || test.common

      return categoryMatch && kindMatch && searchMatch && commonMatch
    })
  }, [selectedCategory, selectedKind, searchQuery, commonOnly])

  const groupedTests = useMemo(
    () => groupCatalogByCategory(filteredTests, CATEGORIES, selectedCategory === 'All'),
    [filteredTests, selectedCategory]
  )

  const handleOrderTest = (testId: string) => {
    if (orderedTests.has(testId)) return

    const resolved = resolveTest(scenario, testId)
    const newOrdered = new Map(orderedTests)
    newOrdered.set(testId, {
      testId,
      result: resolved.result,
    })
    setOrderedTests(newOrdered)
    onTestsOrdered(newOrdered)
  }

  const renderTestCard = (test: (typeof testCatalog)[number]) => {
    const isOrdered = orderedTests.has(test.id)

    return (
      <div
        key={test.id}
        className={`border-2 rounded-lg p-4 transition-colors ${
          isOrdered
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
            : 'border-gray-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] hover:border-primary-200 dark:hover:border-primary-600'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-medium text-gray-900 dark:text-[#F8FAFC]">{test.name}</h3>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-[#14345C] text-gray-700 dark:text-[#CBD5E1] text-xs rounded">
                {test.kind}
              </span>
              {test.common && (
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs rounded">
                  Common
                </span>
              )}
              {isOrdered && (
                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 text-xs rounded">
                  Ordered
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-[#CBD5E1] mb-1">
              <VocabText
                text={test.description}
                onTermClick={onTermClick}
                onTermSave={onTermSave}
              />
            </p>
            {test.typicalUses.length > 0 && (
              <p className="text-xs text-gray-500 dark:text-[#94a3b8]">
                Typical uses: {test.typicalUses.join(', ')}
              </p>
            )}
          </div>
          {!isOrdered && (
            <button
              type="button"
              onClick={() => handleOrderTest(test.id)}
              className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition text-sm whitespace-nowrap"
            >
              Order
            </button>
          )}
        </div>
        {isOrdered && (
          <div
            className="mt-3 pt-3 border-t border-gray-200 dark:border-[#14345C] vocab-simplify-block"
            data-vocab-mode="simplify"
          >
            <p className="text-sm font-medium text-gray-900 dark:text-[#F8FAFC] mb-1">Result:</p>
            <p className="text-sm text-gray-700 dark:text-[#CBD5E1] bg-white dark:bg-[#020817] p-2 rounded border border-gray-200 dark:border-[#14345C]">
              {orderedTests.get(test.id)?.result || ''}
            </p>
          </div>
        )}
      </div>
    )
  }

  const listContent = groupedTests.map((group) => (
    <div key={group.category || 'all'}>
      {group.category ? <CatalogSectionHeader title={group.category} /> : null}
      <div className="space-y-3">{group.items.map(renderTestCard)}</div>
    </div>
  ))

  return (
    <div className="case-panel">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-[#F8FAFC] mb-4">Diagnostic Tests</h2>

      <VocabContextBlock source="tests" scenarioId={scenario.id} text={testsVocabText}>
        <CatalogBrowseLayout
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search tests..."
          emptyMessage="No tests found"
          isEmpty={filteredTests.length === 0}
          sidebar={
            <CatalogCategorySidebar
              categories={CATEGORIES}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              footer={
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">Kind</label>
                    <div className="space-y-1">
                      {(['All', 'Lab', 'Imaging', 'Bedside', 'Procedure'] as const).map((kind) => (
                        <button
                          key={kind}
                          type="button"
                          onClick={() => setSelectedKind(kind as TestKind | 'All')}
                          className={`w-full text-left px-3 py-2 rounded text-sm ${
                            selectedKind === kind
                              ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 font-medium'
                              : 'text-gray-700 dark:text-[#CBD5E1] hover:bg-gray-50 dark:hover:bg-[#14345C]/40'
                          }`}
                        >
                          {kind}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={commonOnly}
                      onChange={(e) => setCommonOnly(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-[#CBD5E1]">Common only</span>
                  </label>
                </>
              }
            />
          }
          list={listContent}
        />
      </VocabContextBlock>
    </div>
  )
}
