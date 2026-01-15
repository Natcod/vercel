"use client"

import { AlertCircle, RefreshCw } from "lucide-react"

interface SearchErrorStateProps {
  onRetry: () => void
}

export default function SearchErrorState({ onRetry }: SearchErrorStateProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-[var(--red-pill-bg)] p-4">
            <AlertCircle className="h-8 w-8 text-[var(--red)]" />
          </div>
        </div>
        <div className="text-[16px] font-medium text-[var(--foreground)] mb-2">Search failed</div>
        <div className="text-[14px] text-[var(--muted)] mb-4 max-w-sm">
          We couldn't complete your search. Please check your connection and try again.
        </div>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-[13px] font-medium text-black hover:bg-[var(--accent)]/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  )
}
