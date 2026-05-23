'use client'

import { useMemo, useState } from 'react'
import type { AdminUsageRow } from '@/lib/ai/tokenUsage'

type Props = {
  rows: AdminUsageRow[]
}

type SortKey = 'displayUser' | 'tokensUsed' | 'requestCount' | 'lastRequestAt'

export default function AdminAIUsageTable({ rows }: Props) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('tokensUsed')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = rows
    if (q) {
      list = list.filter(
        (r) =>
          r.displayUser.toLowerCase().includes(q) ||
          r.actorId.toLowerCase().includes(q)
      )
    }
    list = [...list].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av
      }
      const as = String(av)
      const bs = String(bv)
      return sortDir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
    })
    return list
  }, [rows, query, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'displayUser' ? 'asc' : 'desc')
    }
  }

  const th = (key: SortKey, label: string) => (
    <th className="px-3 py-2 text-left">
      <button
        type="button"
        onClick={() => toggleSort(key)}
        className="text-xs font-semibold uppercase tracking-wide text-slate-600 hover:text-teal-800"
      >
        {label}
        {sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
      </button>
    </th>
  )

  return (
    <div className="space-y-4">
      <input
        type="search"
        placeholder="Search user or id…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {th('displayUser', 'User')}
              {th('tokensUsed', 'Daily tokens')}
              {th('requestCount', 'Requests')}
              {th('lastRequestAt', 'Last request')}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-8 text-center text-slate-500">
                  No usage recorded for today.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.actorId} className="hover:bg-slate-50/80">
                  <td className="px-3 py-2 font-medium text-slate-900">{row.displayUser}</td>
                  <td className="px-3 py-2 tabular-nums">
                    {row.tokensUsed.toLocaleString()} / {row.dailyLimit.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 tabular-nums">{row.requestCount}</td>
                  <td className="px-3 py-2 text-slate-600 whitespace-nowrap">
                    {new Date(row.lastRequestAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
