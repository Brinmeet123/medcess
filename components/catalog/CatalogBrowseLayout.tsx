'use client'

import { ReactNode } from 'react'

type Props = {
  sidebar: ReactNode
  searchQuery: string
  onSearchChange: (value: string) => void
  searchPlaceholder: string
  list: ReactNode
  emptyMessage: string
  isEmpty: boolean
}

/**
 * Shared Tests / Diagnosis browse shell: sidebar filters, search, scrollable list.
 */
export default function CatalogBrowseLayout({
  sidebar,
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  list,
  emptyMessage,
  isEmpty,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 min-h-0">
      <div className="lg:w-48 flex-shrink-0">{sidebar}</div>

      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        <div className="mb-4 flex-shrink-0">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-[#14345C] dark:bg-[#020817] dark:text-[#F8FAFC] rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div
          className="catalog-browse-scroll flex-1 min-h-0 max-h-[min(600px,60vh)] overflow-y-auto scroll-smooth overscroll-contain space-y-3 pr-1 -mr-1"
          role="list"
        >
          {isEmpty ? (
            <div className="text-center py-8 text-gray-500 dark:text-[#94a3b8]">{emptyMessage}</div>
          ) : (
            list
          )}
        </div>
      </div>
    </div>
  )
}
