'use client'

import { useState } from 'react'

type Props = {
  onInsertQuestion: (question: string) => void
}

type FocusPrompt = {
  id: string
  label: string
  questions: string[]
}

const focusPrompts: FocusPrompt[] = [
  {
    id: 'main-symptom',
    label: 'Clarify the main symptom',
    questions: [
      'Can you tell me more about what you\'re feeling?',
      'What does it feel like?'
    ]
  },
  {
    id: 'timing',
    label: 'Understand timing and progression',
    questions: [
      'When did this start?',
      'Has it been getting better or worse?'
    ]
  },
  {
    id: 'location',
    label: 'Pinpoint where it is',
    questions: [
      'Where exactly do you feel it?',
      'Does it go anywhere else?'
    ]
  },
  {
    id: 'red-flags',
    label: 'Ask about 1–2 red flags',
    questions: [
      'Any shortness of breath, nausea, or sweating?',
      'Does anything make it worse?'
    ]
  },
  {
    id: 'background',
    label: 'Check relevant background',
    questions: [
      'Do you have any medical conditions?',
      'Do you take any medications?'
    ]
  }
]

export default function FocusPrompts({ onInsertQuestion }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const handleToggle = (id: string) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpanded(newExpanded)
  }

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-3">Suggested angles</h3>
      <div className="space-y-2">
        {focusPrompts.map(prompt => {
          const isExpanded = expanded.has(prompt.id)
          
          return (
            <div
              key={prompt.id}
              className="bg-white dark:bg-[#071A33] border border-gray-200 dark:border-[#14345C] rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow"
            >
              <button
                type="button"
                onClick={() => handleToggle(prompt.id)}
                className="btn-press w-full px-3 py-2.5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#14345C]/40 transition"
              >
                <span className="text-sm text-gray-900 dark:text-[#F8FAFC]">{prompt.label}</span>
                <span className="text-gray-400 dark:text-[#94a3b8] text-xs">
                  {isExpanded ? '−' : '+'}
                </span>
              </button>
              
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-gray-100 dark:border-[#14345C] bg-gray-50 dark:bg-[#020817]">
                  <div className="space-y-1.5">
                    {prompt.questions.map((question, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onInsertQuestion(question)
                        }}
                        className="btn-press w-full text-left px-2.5 py-1.5 text-xs text-gray-700 dark:text-[#CBD5E1] bg-white dark:bg-[#0a1f3d] border border-gray-200 dark:border-[#14345C] rounded hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:border-primary-300 dark:hover:border-primary-600 hover:text-primary-700 dark:hover:text-primary-300 transition"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}


