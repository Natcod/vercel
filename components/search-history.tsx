"use client"

import { Clock, X } from "lucide-react"
import { useSearchStore } from "@/lib/search-store"

interface SearchHistoryProps {
  onSelect: (query: string) => void
}

export default function SearchHistory({ onSelect }: SearchHistoryProps) {
  const { searchHistory, removeFromHistory, clearHistory } = useSearchStore()

  if (searchHistory.length === 0) {
    return null
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[var(--muted)]" />
          <span className="text-[14px] font-medium text-[var(--foreground)]">Recent Searches</span>
        </div>
        <button
          onClick={clearHistory}
          className="text-[12px] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Clear All
        </button>
      </div>

      <ul className="space-y-1">
        {searchHistory.map((query, index) => (
          <li key={`${query}-${index}`}>
            <div className="flex items-center justify-between group hover:bg-[var(--panel-hover)] rounded-md px-3 py-2 transition-colors">
              <button
                onClick={() => onSelect(query)}
                className="flex-1 text-left text-[14px] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              >
                {query}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeFromHistory(query)
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-[var(--muted)] hover:text-[var(--red)] transition-all"
                aria-label={`Remove ${query} from history`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
