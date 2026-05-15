'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  MEDICAL_SPECIALTIES,
  SPECIALTY_FILTER_ALL,
  SPECIALTY_FILTER_LABEL_ALL,
  type SpecialtyFilterValue,
} from '@/data/specialties'

type Props = {
  value: SpecialtyFilterValue
  onChange: (value: SpecialtyFilterValue) => void
}

export default function SpecialtyFilter({ value, onChange }: Props) {
  const listboxId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const displayLabel =
    value === SPECIALTY_FILTER_ALL ? SPECIALTY_FILTER_LABEL_ALL : value

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return [...MEDICAL_SPECIALTIES]
    return MEDICAL_SPECIALTIES.filter((s) => s.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const select = (next: SpecialtyFilterValue) => {
    onChange(next)
    setOpen(false)
    setQuery('')
    inputRef.current?.blur()
  }

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={`${listboxId}-input`} className="block text-sm font-medium text-gray-700 mb-2">
        Specialty
      </label>
      <input
        ref={inputRef}
        id={`${listboxId}-input`}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-autocomplete="list"
        placeholder="Search specialties…"
        value={open ? query : displayLabel}
        onChange={(e) => {
          setQuery(e.target.value)
          if (!open) setOpen(true)
        }}
        onFocus={() => {
          setOpen(true)
          setQuery('')
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
      />
      {open && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1 w-full max-h-60 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
        >
          <li role="option" aria-selected={value === SPECIALTY_FILTER_ALL}>
            <button
              type="button"
              className={`w-full px-3 py-2 text-left text-sm hover:bg-primary-50 ${
                value === SPECIALTY_FILTER_ALL ? 'bg-primary-50 font-medium text-primary-700' : 'text-gray-900'
              }`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(SPECIALTY_FILTER_ALL)}
            >
              {SPECIALTY_FILTER_LABEL_ALL}
            </button>
          </li>
          {filteredOptions.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-500">No matching specialties</li>
          ) : (
            filteredOptions.map((specialty) => (
              <li key={specialty} role="option" aria-selected={value === specialty}>
                <button
                  type="button"
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-primary-50 ${
                    value === specialty ? 'bg-primary-50 font-medium text-primary-700' : 'text-gray-900'
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => select(specialty)}
                >
                  {specialty}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
