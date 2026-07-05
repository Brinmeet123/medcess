'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import type { CaseVocabEntry } from '@/data/scenarios'
import { useVocabStore } from '@/lib/useVocabStore'

type Props = {
  terms: CaseVocabEntry[]
  caseTitle: string
}

export default function CaseVocabPanel({ terms, caseTitle }: Props) {
  const { status } = useSession()
  const { saveCaseVocabTerm, hasSavedPracticeTerm, isLoaded } = useVocabStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [expanded, setExpanded] = useState(true)
  const [savingTerm, setSavingTerm] = useState<string | null>(null)
  const [savedFlash, setSavedFlash] = useState<Set<string>>(() => new Set())

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return terms
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.whyItMatters.toLowerCase().includes(q)
    )
  }, [terms, searchQuery])

  const showCollapse = terms.length > 12
  const visible = expanded || !showCollapse ? filtered : filtered.slice(0, 12)

  const handleSave = async (entry: CaseVocabEntry) => {
    if (hasSavedPracticeTerm(entry.term)) return
    setSavingTerm(entry.term)
    try {
      const ok = await saveCaseVocabTerm({
        term: entry.term,
        definition: entry.definition,
        sourceCaseName: caseTitle,
      })
      if (ok) {
        setSavedFlash((prev) => new Set(prev).add(entry.term))
      }
    } finally {
      setSavingTerm(null)
    }
  }

  const isSignedIn = status === 'authenticated'

  return (
    <div className="case-panel">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-[#F8FAFC] mb-2">Vocabulary</h2>
      <p className="mb-4 text-sm text-slate-600 dark:text-[#CBD5E1]">
        Key terms for this case. Terms highlighted in amber appear directly in the case text. Add terms to
        your Practice List to review later.
      </p>

      {status !== 'loading' && !isSignedIn ? (
        <div className="mb-4 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/40 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
          <Link href="/login" className="font-semibold underline hover:opacity-90">
            Sign in
          </Link>{' '}
          to sync your Practice List across devices. You can still save terms on this device while signed out.
        </div>
      ) : null}

      <div className="mb-4">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search terms..."
          className="w-full rounded-lg border border-slate-300 dark:border-[#14345C] bg-white dark:bg-[#0a1f3d] px-4 py-2 text-sm text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-label="Search vocabulary terms"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-[#14345C]">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-[#14345C] text-sm">
          <thead className="bg-slate-50 dark:bg-[#071A33]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-[#F8FAFC]">Term</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-[#F8FAFC]">Definition</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-[#F8FAFC]">
                Why it matters in this case
              </th>
              <th className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-[#F8FAFC] w-40">
                Practice
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#14345C] bg-white dark:bg-[#0a1f3d]">
            {visible.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">
                  No terms match your search.
                </td>
              </tr>
            ) : (
              visible.map((entry) => {
                const alreadySaved =
                  isLoaded && (hasSavedPracticeTerm(entry.term) || savedFlash.has(entry.term))
                const isSaving = savingTerm === entry.term

                return (
                  <tr
                    key={entry.term}
                    className={
                      entry.inCaseText ? 'bg-amber-50/60 dark:bg-amber-950/20' : undefined
                    }
                  >
                    <td className="px-4 py-3 align-top font-medium text-slate-900 dark:text-[#F8FAFC] whitespace-nowrap">
                      {entry.inCaseText ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden />
                          {entry.term}
                        </span>
                      ) : (
                        entry.term
                      )}
                    </td>
                    <td className="px-4 py-3 align-top text-slate-700 dark:text-[#CBD5E1]">
                      {entry.definition}
                    </td>
                    <td className="px-4 py-3 align-top text-slate-700 dark:text-[#CBD5E1]">
                      {entry.whyItMatters}
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <button
                        type="button"
                        disabled={alreadySaved || isSaving || !isLoaded}
                        onClick={() => void handleSave(entry)}
                        className={[
                          'inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold transition whitespace-nowrap',
                          alreadySaved
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 cursor-default'
                            : 'bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50',
                        ].join(' ')}
                      >
                        {isSaving ? 'Saving…' : alreadySaved ? 'Saved' : 'Add to Practice List'}
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {showCollapse && filtered.length > 12 ? (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-3 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
        >
          {expanded ? `Show fewer terms` : `Show all ${filtered.length} terms`}
        </button>
      ) : null}

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
        {filtered.length} term{filtered.length === 1 ? '' : 's'}
        {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ''}
      </p>
    </div>
  )
}
