'use client'

import { useState, useMemo, useEffect } from 'react'
import { Scenario } from '@/data/scenarios'
import { diagnosisCatalog, DxCategory, DiagnosisItem } from '@/data/diagnosisCatalog'
import { resolveDx, checkMissingMustNotMiss } from '@/lib/dxEngine'
import { groupCatalogByCategory } from '@/lib/groupCatalogByCategory'
import VocabText from './VocabText'
import NextStepGuidance from './ux/NextStepGuidance'
import { getScenarioSectionGuidanceLine } from './ux/ScenarioSectionHeader'
import CatalogBrowseLayout from './catalog/CatalogBrowseLayout'
import CatalogCategorySidebar from './catalog/CatalogCategorySidebar'
import CatalogSectionHeader from './catalog/CatalogSectionHeader'

type DifferentialItem = {
  dxId: string
  rank: number
  confidence: 'High' | 'Medium' | 'Low'
  note?: string
}

type Props = {
  scenario: Scenario
  differential?: DifferentialItem[]
  finalDxId?: string | null
  onDifferentialUpdate?: (differential: DifferentialItem[]) => void
  onFinalDxUpdate?: (finalDxId: string | null) => void
  onSubmit: (data: {
    differentialDetailed: DifferentialItem[]
    finalDxId: string | null
    missingMustNotMiss: string[]
  }) => void
  onTermClick?: (term: string) => void
  onTermSave?: (term: string) => void
  doctorMessageCount?: number
  orderedTestCount?: number
}

const CATEGORIES: DxCategory[] = [
  'Cardiac', 'Pulmonary', 'Neurology', 'GI', 'Infectious',
  'Endocrine', 'Renal', 'Hematology', 'Psych', 'MSK', 'Other',
]

export default function DiagnosisPanel({
  scenario,
  differential: initialDifferential = [],
  finalDxId: initialFinalDxId = null,
  onDifferentialUpdate,
  onFinalDxUpdate,
  onSubmit,
  onTermClick,
  onTermSave,
  doctorMessageCount = 0,
  orderedTestCount = 0,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<DxCategory | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [commonOnly, setCommonOnly] = useState(false)
  const [differential, setDifferential] = useState<DifferentialItem[]>(initialDifferential)
  const [finalDxId, setFinalDxId] = useState<string | null>(initialFinalDxId)

  useEffect(() => {
    setDifferential(initialDifferential)
  }, [initialDifferential])

  useEffect(() => {
    setFinalDxId(initialFinalDxId)
  }, [initialFinalDxId])

  const differentialIds = useMemo(() => new Set(differential.map((d) => d.dxId)), [differential])

  const filteredDiagnoses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return diagnosisCatalog.filter((dx) => {
      const categoryMatch = selectedCategory === 'All' || dx.category === selectedCategory
      const searchMatch =
        q === '' ||
        dx.name.toLowerCase().includes(q) ||
        dx.brief.toLowerCase().includes(q) ||
        dx.typicalClues.some((clue) => clue.toLowerCase().includes(q))
      const commonMatch = !commonOnly || dx.common
      const notInDifferential = !differentialIds.has(dx.id)

      return categoryMatch && searchMatch && commonMatch && notInDifferential
    })
  }, [selectedCategory, searchQuery, commonOnly, differentialIds])

  const groupedDiagnoses = useMemo(
    () => groupCatalogByCategory(filteredDiagnoses, CATEGORIES, selectedCategory === 'All'),
    [filteredDiagnoses, selectedCategory]
  )

  const handleAddToDifferential = (dxId: string) => {
    if (differentialIds.has(dxId)) return

    const newRank = differential.length + 1
    const newDifferential = [
      ...differential,
      {
        dxId,
        rank: newRank,
        confidence: 'Medium' as const,
        note: '',
      },
    ]
    setDifferential(newDifferential)
    onDifferentialUpdate?.(newDifferential)
  }

  const handleRemoveFromDifferential = (dxId: string) => {
    const filtered = differential.filter((d) => d.dxId !== dxId)
    const reRanked = filtered.map((d, idx) => ({ ...d, rank: idx + 1 }))
    setDifferential(reRanked)
    onDifferentialUpdate?.(reRanked)
    if (finalDxId === dxId) {
      setFinalDxId(null)
      onFinalDxUpdate?.(null)
    }
  }

  const handleMoveRank = (dxId: string, direction: 'up' | 'down') => {
    const index = differential.findIndex((d) => d.dxId === dxId)
    if (index === -1) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= differential.length) return

    const newDifferential = [...differential]
    ;[newDifferential[index], newDifferential[newIndex]] = [
      newDifferential[newIndex],
      newDifferential[index],
    ]

    const reRanked = newDifferential.map((d, idx) => ({ ...d, rank: idx + 1 }))
    setDifferential(reRanked)
    onDifferentialUpdate?.(reRanked)
  }

  const handleUpdateConfidence = (dxId: string, confidence: 'High' | 'Medium' | 'Low') => {
    const updated = differential.map((d) => (d.dxId === dxId ? { ...d, confidence } : d))
    setDifferential(updated)
    onDifferentialUpdate?.(updated)
  }

  const handleUpdateNote = (dxId: string, note: string) => {
    const updated = differential.map((d) => (d.dxId === dxId ? { ...d, note } : d))
    setDifferential(updated)
    onDifferentialUpdate?.(updated)
  }

  const handleSubmit = () => {
    if (finalDxId) {
      const missingMustNotMiss = checkMissingMustNotMiss(
        differential.map((d) => d.dxId),
        scenario.requiredMustNotMiss
      )

      onSubmit({
        differentialDetailed: differential,
        finalDxId,
        missingMustNotMiss,
      })
    }
  }

  const sortedDifferential = [...differential].sort((a, b) => a.rank - b.rank)
  const missingMustNotMiss = checkMissingMustNotMiss(
    differential.map((d) => d.dxId),
    scenario.requiredMustNotMiss
  )

  const renderDiagnosisCard = (dx: DiagnosisItem) => (
    <div
      key={dx.id}
      className="border-2 rounded-lg p-4 border-gray-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] hover:border-primary-200 dark:hover:border-primary-600 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-medium text-gray-900 dark:text-[#F8FAFC]">{dx.name}</h3>
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-[#14345C] text-gray-700 dark:text-[#CBD5E1] text-xs rounded">
              {dx.category}
            </span>
            {dx.common && (
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs rounded">
                Common
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-[#CBD5E1] mb-1">
            <VocabText text={dx.brief} onTermClick={onTermClick} onTermSave={onTermSave} />
          </p>
          <p className="text-xs text-gray-500 dark:text-[#94a3b8]">
            Clues: {dx.typicalClues.join(', ')}
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleAddToDifferential(dx.id)}
          className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition text-sm whitespace-nowrap"
        >
          Add to DDx
        </button>
      </div>
    </div>
  )

  const listContent = groupedDiagnoses.map((group) => (
    <div key={group.category || 'all'}>
      {group.category ? <CatalogSectionHeader title={group.category} /> : null}
      <div className="space-y-3">{group.items.map(renderDiagnosisCard)}</div>
    </div>
  ))

  return (
    <div className="case-panel">
      <p className="mb-4 text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
        Build a ranked differential, then choose one final diagnosis. Your picks shape the feedback you&apos;ll see
        next.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-[#F8FAFC] mb-4">Make your diagnosis</h2>

      {scenario.earlyDiagnosisWarning && (doctorMessageCount < 3 || orderedTestCount < 2) && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800/50 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
            You can submit a diagnosis now, but you may want to complete the patient interview and review key tests first.
          </div>
        )}

      <CatalogBrowseLayout
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search diagnoses..."
        emptyMessage="No diagnoses found"
        isEmpty={filteredDiagnoses.length === 0}
        sidebar={
          <CatalogCategorySidebar
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            footer={
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={commonOnly}
                  onChange={(e) => setCommonOnly(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-[#CBD5E1]">Common only</span>
              </label>
            }
          />
        }
        list={listContent}
      />

      {differential.length > 0 && (
        <div className="mt-6 border-t border-gray-200 dark:border-[#14345C] pt-6">
          <h3 className="text-md font-semibold text-gray-900 dark:text-[#F8FAFC] mb-4">
            Your Differential Diagnosis (Ranked)
          </h3>

          {missingMustNotMiss.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-amber-950/40 border border-yellow-200 dark:border-amber-800/50 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-amber-200 font-medium mb-1">Must-not-miss to consider:</p>
              <p className="text-xs text-yellow-700 dark:text-amber-300/90 mb-2">
                These are dangerous diagnoses that should be considered in your differential, even if you rule them
                out. Good clinical practice requires evaluating them for chest pain cases.
              </p>
              <ul className="text-sm text-yellow-700 dark:text-amber-300/90 list-disc list-inside">
                {missingMustNotMiss.map((dxId) => {
                  const dx = diagnosisCatalog.find((d) => d.id === dxId)
                  return <li key={dxId}>{dx?.name || dxId}</li>
                })}
              </ul>
            </div>
          )}

          <div className="space-y-3">
            {sortedDifferential.map((item) => {
              const dx = diagnosisCatalog.find((d) => d.id === item.dxId)
              const resolved = resolveDx(scenario, item.dxId)
              const isFinal = finalDxId === item.dxId

              return (
                <div
                  key={item.dxId}
                  className={`border-2 rounded-lg p-4 transition-colors ${
                    isFinal
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                      : resolved.yield === 'correct'
                        ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/40'
                        : resolved.yield === 'reasonable'
                          ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40'
                          : resolved.yield === 'dangerous-miss'
                            ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/40'
                            : 'border-gray-200 dark:border-[#14345C] bg-gray-50 dark:bg-[#0a1f3d]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-bold text-gray-700 dark:text-[#CBD5E1]">#{item.rank}</span>
                        <span className="font-medium text-gray-900 dark:text-[#F8FAFC]">{dx?.name}</span>
                        {isFinal && (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 text-xs rounded">
                            Final diagnosis
                          </span>
                        )}
                      </div>
                      <p
                        className="text-xs text-gray-600 dark:text-[#CBD5E1] mb-2 vocab-simplify-block"
                        data-vocab-mode="simplify"
                      >
                        {resolved.explanation}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleMoveRank(item.dxId, 'up')}
                        disabled={item.rank === 1}
                        className="px-2 py-1 bg-gray-100 dark:bg-[#14345C] text-gray-700 dark:text-[#CBD5E1] rounded text-xs hover:bg-gray-200 dark:hover:bg-[#1e4a7a] disabled:opacity-50"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveRank(item.dxId, 'down')}
                        disabled={item.rank === differential.length}
                        className="px-2 py-1 bg-gray-100 dark:bg-[#14345C] text-gray-700 dark:text-[#CBD5E1] rounded text-xs hover:bg-gray-200 dark:hover:bg-[#1e4a7a] disabled:opacity-50"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromDifferential(item.dxId)}
                        className="px-2 py-1 bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 rounded text-xs hover:bg-red-200 dark:hover:bg-red-900/50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">
                        Confidence
                      </label>
                      <select
                        value={item.confidence}
                        onChange={(e) =>
                          handleUpdateConfidence(item.dxId, e.target.value as 'High' | 'Medium' | 'Low')
                        }
                        className="w-full px-2 py-1 border border-gray-300 dark:border-[#14345C] dark:bg-[#020817] dark:text-[#F8FAFC] rounded text-sm"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-[#CBD5E1] mb-1">
                        Reasoning Note (optional)
                      </label>
                      <input
                        type="text"
                        value={item.note || ''}
                        onChange={(e) => handleUpdateNote(item.dxId, e.target.value)}
                        placeholder="(e.g., Chest pain radiating to arm, elevated troponin)"
                        className="w-full px-2 py-1 border border-gray-300 dark:border-[#14345C] dark:bg-[#020817] dark:text-[#F8FAFC] rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="mt-6 border-t border-gray-200 dark:border-[#14345C] pt-6">
        <h3 className="text-md font-semibold text-gray-900 dark:text-[#F8FAFC] mb-4">Final diagnosis</h3>
        {differential.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-[#94a3b8]">Add diagnoses to the differential first.</p>
        ) : (
          <div className="space-y-2">
            {sortedDifferential.map((item) => {
              const dx = diagnosisCatalog.find((d) => d.id === item.dxId)
              const isFinal = finalDxId === item.dxId
              return (
                <label
                  key={item.dxId}
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    isFinal
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-gray-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] hover:border-primary-200 dark:hover:border-primary-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="final-diagnosis"
                    checked={isFinal}
                    onChange={() => {
                      setFinalDxId(item.dxId)
                      onFinalDxUpdate?.(item.dxId)
                    }}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <span className="text-sm text-gray-900 dark:text-[#F8FAFC] font-medium">
                      #{item.rank} - {dx?.name}
                    </span>
                    {item.confidence && (
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 dark:bg-[#14345C] text-gray-700 dark:text-[#CBD5E1] text-xs rounded">
                        {item.confidence} confidence
                      </span>
                    )}
                    {item.note && (
                      <p className="text-xs text-gray-600 dark:text-[#CBD5E1] mt-1">Note: {item.note}</p>
                    )}
                  </div>
                </label>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-6 mx-auto flex w-full max-w-xl justify-center px-2">
        <NextStepGuidance
          compact
          showHeading={false}
          centered
          action={
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!finalDxId || differential.length === 0}
              className="btn-press w-full rounded-lg px-6 py-3 bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold"
            >
              Next step
            </button>
          }
        >
          {getScenarioSectionGuidanceLine('diagnosis')}
        </NextStepGuidance>
      </div>
    </div>
  )
}
