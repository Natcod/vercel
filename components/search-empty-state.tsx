import { Search } from "lucide-react"

export default function SearchEmptyState() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-[var(--panel-elev)] p-4">
            <Search className="h-8 w-8 text-[var(--muted)]" />
          </div>
        </div>
        <div className="text-[16px] font-medium text-[var(--foreground)] mb-2">Search for stocks</div>
        <div className="text-[14px] text-[var(--muted)] max-w-sm">
          Enter a ticker symbol or company name to find stocks and view their details
        </div>
      </div>
    </div>
  )
}
