'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Scenario } from '@/data/scenarios'
import { getMockPatientResponse } from '@/lib/mockResponses'
import VocabText from './VocabText'
import VocabContextBlock from './VocabContextBlock'

type Message = {
  role: 'doctor' | 'patient'
  content: string
}

type QuestionGroup = {
  id: string
  label: string
  questions: string[]
}

const MEDACADEMY_QUESTION_GROUPS: QuestionGroup[] = [
  {
    id: 'history',
    label: 'Patient history',
    questions: [
      'Can I get the full patient history?',
      'What is your history?',
      'Tell me your full history.',
    ],
  },
  {
    id: 'symptoms',
    label: 'Symptoms',
    questions: [
      'Do you have any weight loss?',
      'Have you had any hemoptysis or coughing blood?',
      'Have you had any hoarseness?',
      'Do you have chronic low back pain?',
      'Do you have headache?',
      'Any changes in mentation or coordination?',
    ],
  },
  {
    id: 'background',
    label: 'Background',
    questions: [
      'What is your smoking history?',
      'What is your past medical history?',
      'What is your family history?',
    ],
  },
  {
    id: 'exam',
    label: 'Physical examination',
    questions: ['What is the physical examination?', 'Give me the physical exam.'],
  },
]

type Props = {
  scenario: Scenario
  messages?: Message[]
  onChatUpdate: (messages: Message[]) => void
  onTermClick?: (term: string) => void
  onTermSave?: (term: string) => void
}

export default function MedacademyInterviewPanel({
  scenario,
  messages: initialMessages = [],
  onChatUpdate,
  onTermClick,
  onTermSave,
}: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(['history']))
  const scrollRef = useRef<HTMLDivElement>(null)
  const onChatUpdateRef = useRef(onChatUpdate)
  onChatUpdateRef.current = onChatUpdate

  useEffect(() => {
    onChatUpdateRef.current(messages)
  }, [messages])

  useEffect(() => {
    if (!initialMessages?.length) return
    setMessages((prev) => {
      if (prev.length === initialMessages.length && prev.every((m, i) => m.content === initialMessages[i]?.content && m.role === initialMessages[i]?.role)) {
        return prev
      }
      return initialMessages
    })
  }, [initialMessages])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const askQuestion = useCallback(
    (question: string) => {
      const trimmed = question.trim()
      if (!trimmed) return
      setMessages((prev) => {
        const doctorMessage: Message = { role: 'doctor', content: trimmed }
        const withDoctor = [...prev, doctorMessage]
        const reply = getMockPatientResponse(scenario.id, withDoctor)
        return [...withDoctor, { role: 'patient', content: reply }]
      })
    },
    [scenario.id]
  )

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ question?: string }>
      const q = ce.detail?.question?.trim()
      if (q) askQuestion(q)
    }
    window.addEventListener('send-preset-question', handler as EventListener)
    return () => window.removeEventListener('send-preset-question', handler as EventListener)
  }, [askQuestion])

  const toggleGroup = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-stretch" style={{ minHeight: '520px' }}>
      <aside className="w-full shrink-0 rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 dark:border-[#14345C] dark:bg-[#071A33] lg:w-[320px] lg:overflow-y-auto">
        <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">Interview questions</h3>
        <p className="mb-4 text-xs leading-relaxed text-slate-600 dark:text-[#94a3b8]">
          Select a question to hear the patient&apos;s answer. Answers use only information from this case.
        </p>
        <div className="space-y-2">
          {MEDACADEMY_QUESTION_GROUPS.map((group) => {
            const isOpen = expanded.has(group.id)
            return (
              <div
                key={group.id}
                className="overflow-hidden rounded-lg border border-slate-200/90 bg-white dark:border-[#14345C] dark:bg-[#0a1f3d]"
              >
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-50 dark:text-[#F8FAFC] dark:hover:bg-[#14345C]/40"
                >
                  <span>{group.label}</span>
                  <span className="text-slate-400" aria-hidden>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen ? (
                  <div className="space-y-1.5 border-t border-slate-100 px-3 pb-3 pt-2 dark:border-[#14345C]">
                    {group.questions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => askQuestion(question)}
                        className="btn-press w-full rounded-md border border-slate-200/90 bg-white px-2.5 py-2 text-left text-xs leading-snug text-slate-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 dark:border-[#14345C] dark:bg-[#071A33] dark:text-[#CBD5E1] dark:hover:border-primary-600/50 dark:hover:bg-primary-950/30 dark:hover:text-primary-200"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </aside>

      <div className="flex min-h-[400px] min-w-0 flex-1 flex-col rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-[#14345C] dark:bg-[#0a1f3d]">
        <h2 className="mb-3 text-sm font-semibold text-slate-800 dark:text-[#F8FAFC]">Patient responses</h2>
        <VocabContextBlock
          source="history"
          scenarioId={scenario.id}
          text={messages.map((m) => m.content).join('\n')}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500 dark:text-[#94a3b8]">
                Choose a question on the left to begin the patient interview.
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'doctor'
                        ? 'bg-primary-600 text-white'
                        : 'border border-slate-200 bg-slate-50 text-slate-800 dark:border-[#14345C] dark:bg-[#071A33] dark:text-[#CBD5E1]'
                    }`}
                  >
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide opacity-80">
                      {msg.role === 'doctor' ? 'You' : scenario.patientPersona.name}
                    </p>
                    <VocabText text={msg.content} onTermClick={onTermClick} onTermSave={onTermSave} />
                  </div>
                </div>
              ))
            )}
          </div>
        </VocabContextBlock>
      </div>
    </div>
  )
}
