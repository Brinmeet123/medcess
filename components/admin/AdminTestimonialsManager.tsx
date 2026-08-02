'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import {
  TESTIMONIAL_LEVEL_SUGGESTIONS,
  formatTestimonialRole,
  type AdminTestimonial,
} from '@/lib/testimonials'

type Props = {
  initialRows: AdminTestimonial[]
}

type FormState = {
  name: string
  text: string
  level: string
  organization: string
  specialty: string
  photoUrl: string | null
  rating: string
  visible: boolean
}

const emptyForm = (): FormState => ({
  name: '',
  text: '',
  level: '',
  organization: '',
  specialty: '',
  photoUrl: null,
  rating: '',
  visible: true,
})

function formFromRow(row: AdminTestimonial): FormState {
  return {
    name: row.name,
    text: row.text,
    level: row.level,
    organization: row.organization,
    specialty: row.specialty ?? '',
    photoUrl: row.photoUrl,
    rating: row.rating != null ? String(row.rating) : '',
    visible: row.visible,
  }
}

const MAX_PHOTO_BYTES = 350_000

async function fileToDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPG, PNG, or WebP).')
  }
  if (file.size > MAX_PHOTO_BYTES) {
    throw new Error('Photo must be under 350 KB. Try a smaller image.')
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('Could not read image.'))
    }
    reader.onerror = () => reject(new Error('Could not read image.'))
    reader.readAsDataURL(file)
  })
}

export default function AdminTestimonialsManager({ initialRows }: Props) {
  const [rows, setRows] = useState(initialRows)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sorted = useMemo(
    () => [...rows].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)),
    [rows]
  )

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm())
    setShowForm(true)
    setError(null)
    setMessage(null)
  }

  function openEdit(row: AdminTestimonial) {
    setEditingId(row.id)
    setForm(formFromRow(row))
    setShowForm(true)
    setError(null)
    setMessage(null)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm())
  }

  function payloadFromForm() {
    const ratingNum = form.rating.trim() === '' ? null : Number(form.rating)
    return {
      name: form.name.trim(),
      text: form.text.trim(),
      level: form.level,
      organization: form.organization.trim(),
      specialty: form.specialty.trim() || null,
      photoUrl: form.photoUrl,
      rating: ratingNum != null && !Number.isNaN(ratingNum) ? ratingNum : null,
      visible: form.visible,
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      const body = payloadFromForm()
      if (editingId) {
        const res = await fetch(`/api/admin/testimonials/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          setError(typeof data.error === 'string' ? data.error : 'Could not update.')
          return
        }
        setRows((prev) => prev.map((r) => (r.id === editingId ? data.row : r)))
        setMessage('Testimonial updated.')
      } else {
        const res = await fetch('/api/admin/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          setError(typeof data.error === 'string' ? data.error : 'Could not create.')
          return
        }
        setRows((prev) => [...prev, data.row])
        setMessage('Testimonial added.')
      }
      closeForm()
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this testimonial? This cannot be undone.')) return
    setError(null)
    setMessage(null)
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(typeof data.error === 'string' ? data.error : 'Could not delete.')
      return
    }
    setRows((prev) => prev.filter((r) => r.id !== id))
    setMessage('Testimonial deleted.')
  }

  async function toggleVisible(row: AdminTestimonial) {
    setError(null)
    const res = await fetch(`/api/admin/testimonials/${row.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: !row.visible }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError(typeof data.error === 'string' ? data.error : 'Could not update visibility.')
      return
    }
    setRows((prev) => prev.map((r) => (r.id === row.id ? data.row : r)))
  }

  async function move(id: string, direction: -1 | 1) {
    const ordered = sorted.map((r) => r.id)
    const idx = ordered.indexOf(id)
    const target = idx + direction
    if (idx < 0 || target < 0 || target >= ordered.length) return

    const next = [...ordered]
    ;[next[idx], next[target]] = [next[target], next[idx]]

    // Optimistic UI
    setRows((prev) =>
      prev.map((r) => {
        const sortOrder = next.indexOf(r.id)
        return sortOrder >= 0 ? { ...r, sortOrder } : r
      })
    )

    const res = await fetch('/api/admin/testimonials/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds: next }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError(typeof data.error === 'string' ? data.error : 'Could not reorder.')
      return
    }
    if (Array.isArray(data.rows)) setRows(data.rows)
  }

  async function onPhotoChange(file: File | null) {
    if (!file) {
      setForm((f) => ({ ...f, photoUrl: null }))
      return
    }
    try {
      const dataUrl = await fileToDataUrl(file)
      setForm((f) => ({ ...f, photoUrl: dataUrl }))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not read photo.')
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-slate-600 dark:text-[#94a3b8]">
            {rows.length} testimonial{rows.length === 1 ? '' : 's'} ·{' '}
            {rows.filter((r) => r.visible).length} visible on homepage
          </p>
        </div>
        <button type="button" onClick={openCreate} className="medcess-btn-primary !px-4 !py-2.5 text-sm gap-2">
          <Plus className="h-4 w-4" />
          Add testimonial
        </button>
      </div>

      {message ? (
        <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-900 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-200">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-900 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </p>
      ) : null}

      {showForm ? (
        <div className="medcess-card p-5 sm:p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-medcess-navy dark:text-[#F8FAFC]">
              {editingId ? 'Edit testimonial' : 'New testimonial'}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-medcess-dark-muted"
              aria-label="Close form"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">Name *</span>
                <input
                  className="medcess-input mt-1"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  maxLength={120}
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">Level *</span>
                <input
                  className="medcess-input mt-1"
                  list="testimonial-level-suggestions"
                  value={form.level}
                  onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
                  required
                  maxLength={120}
                  placeholder="e.g. Second-year medical student"
                />
                <datalist id="testimonial-level-suggestions">
                  {TESTIMONIAL_LEVEL_SUGGESTIONS.map((level) => (
                    <option key={level} value={level} />
                  ))}
                </datalist>
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block text-sm">
                <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">
                  School / organization *
                </span>
                <input
                  className="medcess-input mt-1"
                  value={form.organization}
                  onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
                  required
                  maxLength={200}
                  placeholder="e.g. Rutgers New Jersey Medical School"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">
                  Specialty / area of study
                </span>
                <input
                  className="medcess-input mt-1"
                  value={form.specialty}
                  onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
                  maxLength={160}
                  placeholder="Optional"
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">Testimonial text *</span>
              <textarea
                className="medcess-input mt-1 min-h-[120px] resize-y"
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                required
                maxLength={4000}
              />
            </label>
            <div className="grid sm:grid-cols-2 gap-4 items-start">
              <label className="block text-sm">
                <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">Star rating</span>
                <select
                  className="medcess-input mt-1"
                  value={form.rating}
                  onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                >
                  <option value="">None</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} star{n === 1 ? '' : 's'}
                    </option>
                  ))}
                </select>
              </label>
              <div className="text-sm">
                <span className="font-medium text-slate-700 dark:text-[#CBD5E1]">Profile photo</span>
                <div className="mt-1 flex items-center gap-3">
                  {form.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={form.photoUrl}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-medcess-dark-muted border border-slate-200 dark:border-medcess-dark-border" />
                  )}
                  <div className="flex flex-col gap-1">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(e) => onPhotoChange(e.target.files?.[0] ?? null)}
                      className="text-xs text-slate-600 file:mr-2 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-700"
                    />
                    {form.photoUrl ? (
                      <button
                        type="button"
                        className="text-xs text-red-600 hover:underline text-left"
                        onClick={() => setForm((f) => ({ ...f, photoUrl: null }))}
                      >
                        Remove photo
                      </button>
                    ) : null}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Optional. Max 350 KB.</p>
              </div>
            </div>
            <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-[#CBD5E1]">
              <input
                type="checkbox"
                checked={form.visible}
                onChange={(e) => setForm((f) => ({ ...f, visible: e.target.checked }))}
                className="rounded border-slate-300 text-primary-600 focus:ring-primary-400"
              />
              Visible on homepage
            </label>
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" disabled={saving} className="medcess-btn-primary !px-5 !py-2.5 text-sm">
                {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add testimonial'}
              </button>
              <button type="button" onClick={closeForm} className="medcess-btn-secondary !px-5 !py-2.5 text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {sorted.length === 0 ? (
        <div className="medcess-card p-10 text-center text-slate-600 dark:text-[#94a3b8]">
          No testimonials yet. Add one to show it on the homepage.
        </div>
      ) : (
        <ul className="space-y-3">
          {sorted.map((row, i) => (
            <li key={row.id} className="medcess-card p-4 sm:p-5">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {row.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={row.photoUrl}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="h-11 w-11 rounded-full bg-gradient-medcess text-white flex items-center justify-center text-xs font-semibold shrink-0">
                      {row.name
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((p) => p[0]?.toUpperCase() ?? '')
                        .join('')}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-semibold text-medcess-navy dark:text-[#F8FAFC]">{row.name}</p>
                      {row.rating != null ? (
                        <span className="inline-flex items-center gap-0.5 text-xs text-amber-600">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {row.rating}
                        </span>
                      ) : null}
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md ${
                          row.visible
                            ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200'
                            : 'bg-slate-100 text-slate-600 dark:bg-medcess-dark-muted dark:text-[#94a3b8]'
                        }`}
                      >
                        {row.visible ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-[#94a3b8] mb-2">
                      {formatTestimonialRole(row.level, row.organization, row.specialty)}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-[#CBD5E1] whitespace-pre-wrap line-clamp-4">
                      {row.text}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => move(row.id, -1)}
                    disabled={i === 0}
                    className="btn-press p-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 dark:border-medcess-dark-border dark:hover:bg-medcess-dark-muted"
                    aria-label="Move up"
                    title="Move up"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(row.id, 1)}
                    disabled={i === sorted.length - 1}
                    className="btn-press p-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 dark:border-medcess-dark-border dark:hover:bg-medcess-dark-muted"
                    aria-label="Move down"
                    title="Move down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleVisible(row)}
                    className="btn-press p-2 rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-medcess-dark-border dark:hover:bg-medcess-dark-muted"
                    aria-label={row.visible ? 'Hide on homepage' : 'Show on homepage'}
                    title={row.visible ? 'Hide on homepage' : 'Show on homepage'}
                  >
                    {row.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(row)}
                    className="btn-press p-2 rounded-lg border border-slate-200 hover:bg-slate-50 dark:border-medcess-dark-border dark:hover:bg-medcess-dark-muted"
                    aria-label="Edit"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(row.id)}
                    className="btn-press p-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 dark:border-red-900/50 dark:text-red-300 dark:hover:bg-red-950/30"
                    aria-label="Delete"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
