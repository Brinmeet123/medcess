'use client'

import { useState, useEffect } from 'react'
import { PhysicalExamSection } from '@/data/scenarios'
import VocabText from './VocabText'
import VocabContextBlock from './VocabContextBlock'

type Props = {
  sections: PhysicalExamSection[]
  /** Psychiatry and mood cases: structured MSE sections shown below physical exam. */
  mentalStatusExam?: PhysicalExamSection[]
  scenarioId?: string
  viewedSections?: string[]
  onSectionsViewed: (sectionIds: string[]) => void
  onTermClick?: (term: string) => void
  onTermSave?: (term: string) => void
}

export default function PhysicalExamPanel({ sections, mentalStatusExam = [], scenarioId, viewedSections: initialViewedSections = [], onSectionsViewed, onTermClick, onTermSave }: Props) {
  const [viewedSections, setViewedSections] = useState<Set<string>>(new Set(initialViewedSections))
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Sync with parent when initial viewed sections change
  useEffect(() => {
    setViewedSections(new Set(initialViewedSections))
  }, [initialViewedSections])

  const handleSectionClick = (sectionId: string) => {
    const newViewed = new Set(viewedSections)
    newViewed.add(sectionId)
    setViewedSections(newViewed)
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
    onSectionsViewed(Array.from(newViewed))
  }

  const examContextText = [...sections, ...mentalStatusExam]
    .map((s) => `${s.summary}\n${s.details}`)
    .join('\n')

  const renderGrid = (blockSections: PhysicalExamSection[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {blockSections.map((section) => {
        const isViewed = viewedSections.has(section.id)
        const isExpanded = expandedSection === section.id

        return (
          <div key={section.id}>
            <button
              onClick={() => handleSectionClick(section.id)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition ${
                isViewed
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/40 text-primary-900 dark:text-[#F8FAFC]'
                  : 'border-gray-200 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] text-gray-700 dark:text-[#CBD5E1] hover:border-primary-300 dark:hover:border-primary-500'
              }`}
            >
              <p className="font-medium text-sm">{section.label}</p>
              {isViewed && (
                <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">Opened</p>
              )}
            </button>
            {isExpanded && (
              <div className="mt-2 p-3 bg-gray-50 dark:bg-[#020817] rounded-lg border border-gray-200 dark:border-[#14345C]">
                <p className="text-sm font-medium text-gray-900 dark:text-[#F8FAFC] mb-1">Summary:</p>
                <p className="text-sm text-gray-700 dark:text-[#CBD5E1] mb-2">
                  <VocabText
                    text={section.summary}
                    onTermClick={onTermClick}
                    onTermSave={onTermSave}
                  />
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-[#F8FAFC] mb-1">Details:</p>
                <p className="text-sm text-gray-700 dark:text-[#CBD5E1]">
                  <VocabText
                    text={section.details}
                    onTermClick={onTermClick}
                    onTermSave={onTermSave}
                  />
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="case-panel">
      <VocabContextBlock source="exam" scenarioId={scenarioId} text={examContextText}>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#F8FAFC] mb-4">Physical Examination</h2>
        {renderGrid(sections)}
        {mentalStatusExam.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#F8FAFC] mt-8 mb-4">Mental Status Examination</h2>
            {renderGrid(mentalStatusExam)}
          </>
        )}
      </VocabContextBlock>
    </div>
  )
}

