import { Loader2 } from "lucide-react"

export default function SearchLoadingState() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <Loader2 className="h-8 w-8 text-[var(--accent)] animate-spin" />
        </div>
        <div className="text-[16px] font-medium text-[var(--foreground)] mb-2">Searching...</div>
        <div className="text-[14px] text-[var(--muted)]">Finding stocks that match your query</div>
      </div>
    </div>
  )
}
