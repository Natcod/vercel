"use client"

import { useStockStore } from "@/lib/store"
import { STOCK_DATA } from "@/lib/stock-data"

export default function AboutSection() {
  const { selectedTicker } = useStockStore()
  const stockData = STOCK_DATA[selectedTicker]

  if (!stockData) return null

  return (
    <div className="min-w-0">
      <div className="mb-3 text-[14px] font-medium tracking-[-0.01em]">About</div>
      <p className="text-[12px] leading-5 text-[var(--muted)] break-words">{stockData.about}</p>
      <span className="mt-2 inline-block text-[12px] underline decoration-dotted underline-offset-4">SHOW MORE</span>
    </div>
  )
}
