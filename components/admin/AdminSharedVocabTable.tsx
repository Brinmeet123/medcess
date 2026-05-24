'use client'

import { useMemo, useState } from 'react'

export type AdminSharedVocabRow = {
  id: string
  term: string
  normalizedTerm: string
  definition: string
  simpleDefinition: string
  category: string | null
  source: string
  usageCount: number
  createdAt: string
  updatedAt: string
}

type Props = {
  initialRows: AdminSharedVocabRow[]
  initialTotal: number
}

type SortKey = 'term' | 'usageCount' | 'source' | 'updatedAt'

export default function AdminSharedVocabTable({ initialRows, initialTotal }: Props) {
  const [rows, setRows] = useState(initialRows)
  const [total, setTotal] = useState(initialTotal)
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('usageCount')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editSimple, setEditSimple] = useState('')
  const [editDefinition, setEditDefinition] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = rows
    if (q) {
      list = list.filter(
        (r) =>
          r.term.toLowerCase().includes(q) ||
          r.normalizedTerm.includes(q) ||
          r.definition.toLowerCase().includes(q) ||
          (r.category ?? '').toLowerCase().includes(q)
      )
    }
    list = [...list].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av
      }
      const as = String(av ?? '')
      const bs = String(bv ?? '')
      return sortDir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
    })
    return list
  }, [rows, query, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'term' ? 'asc' : 'desc')
    }
  }

  function startEdit(row: AdminSharedVocabRow) {
    setEditingId(row.id)
    setEditSimple(row.simpleDefinition)
    setEditDefinition(row.definition)
    setEditCategory(row.category ?? '')
    setMessage(null)
  }

  async function saveEdit(id: string) {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch('/api/admin/shared-vocab', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          simpleDefinition: editSimple.trim(),
          definition: editDefinition.trim(),
          category: editCategory.trim() || null,
        }),
      })
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(err.error ?? 'Save failed')
      }
      const data = (await res.json()) as { row: AdminSharedVocabRow }
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...data.row } : r)))
      setEditingId(null)
      setMessage('Saved.')
    } catch (e: unknown) {
      setMessage(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function refreshFromServer() {
    setMessage(null)
    const params = new URLSearchParams({ limit: '200', offset: '0' })
    if (query.trim()) params.set('search', query.trim())
    const res = await fetch(`/api/admin/shared-vocab?${params}`)
    if (!res.ok) {
      setMessage('Could not refresh list.')
      return
    }
    const data = (await res.json()) as { rows: AdminSharedVocabRow[]; total: number }
    setRows(data.rows)
    setTotal(data.total)
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
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="search"
          placeholder="Search term or definition…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => void refreshFromServer()}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
        >
          Refresh
        </button>
        <p className="text-sm text-slate-600">{total} total entries</p>
      </div>

      {message && <p className="text-sm text-slate-700">{message}</p>}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {th('term', 'Term')}
              {th('usageCount', 'Lookups')}
              {th('source', 'Source')}
              {th('updatedAt', 'Updated')}
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Definition
              </th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 align-top">
                <td className="px-3 py-3 font-medium text-slate-900">
                  {row.term}
                  <p className="text-xs text-slate-500 font-normal">{row.normalizedTerm}</p>
                </td>
                <td className="px-3 py-3 tabular-nums">{row.usageCount}</td>
                <td className="px-3 py-3 capitalize">{row.source.replace('_', ' ')}</td>
                <td className="px-3 py-3 text-xs text-slate-600 whitespace-nowrap">
                  {new Date(row.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-3 min-w-[280px]">
                  {editingId === row.id ? (
                    <div className="space-y-2">
                      <input
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        placeholder="Category"
                        className="w-full rounded border border-slate-300 px-2 py-1 text-xs"
                      />
                      <input
                        value={editSimple}
                        onChange={(e) => setEditSimple(e.target.value)}
                        placeholder="Short definition"
                        className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
                      />
                      <textarea
                        value={editDefinition}
                        onChange={(e) => setEditDefinition(e.target.value)}
                        rows={3}
                        placeholder="Full definition"
                        className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
                      />
                    </div>
                  ) : (
                    <div>
                      {row.category && (
                        <p className="text-xs uppercase tracking-wide text-teal-700 mb-1">{row.category}</p>
                      )}
                      <p className="text-sm text-slate-900">{row.simpleDefinition}</p>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-3">{row.definition}</p>
                    </div>
                  )}
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  {editingId === row.id ? (
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => void saveEdit(row.id)}
                        className="rounded bg-teal-700 text-white px-2 py-1 text-xs hover:bg-teal-800 disabled:opacity-50"
                      >
                        {saving ? 'Saving…' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(row)}
                      className="rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-slate-500">
                  No shared vocabulary entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
