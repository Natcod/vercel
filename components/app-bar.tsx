"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface AppBarProps {
  title: string
  onBack?: () => void
}

export default function AppBar({ title, onBack }: AppBarProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <div className="sticky top-0 z-40 bg-[var(--bg)] border-b border-[var(--panel-divider)] px-4 py-3 sm:hidden">
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--panel-hover)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-[16px] font-semibold text-[var(--foreground)] truncate">{title}</h1>
      </div>
    </div>
  )
}
