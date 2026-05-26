'use client'

import type { ReactNode } from 'react'

type Props<T extends string> = {
  label?: string
  categories: readonly T[]
  selected: T | 'All'
  onSelect: (category: T | 'All') => void
  footer?: ReactNode
}

export default function CatalogCategorySidebar<T extends string>({
  label = 'Category',
  categories,
  selected,
  onSelect,
  footer,
}: Props<T>) {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-[#CBD5E1] mb-2">
          {label}
        </label>
        <div className="space-y-1 max-h-64 overflow-y-auto scroll-smooth overscroll-contain">
          <button
            type="button"
            onClick={() => onSelect('All')}
            className={`w-full text-left px-3 py-2 rounded text-sm ${
              selected === 'All'
                ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 font-medium'
                : 'text-gray-700 dark:text-[#CBD5E1] hover:bg-gray-50 dark:hover:bg-[#14345C]/40'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onSelect(cat)}
              className={`w-full text-left px-3 py-2 rounded text-sm ${
                selected === cat
                  ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 font-medium'
                  : 'text-gray-700 dark:text-[#CBD5E1] hover:bg-gray-50 dark:hover:bg-[#14345C]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {footer}
    </>
  )
}
