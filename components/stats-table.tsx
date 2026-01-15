"use client"

import { useStockStore } from "@/lib/store"
import { STOCK_DATA } from "@/lib/stock-data"

export default function StatsTable() {
  const { selectedTicker } = useStockStore()
  const stockData = STOCK_DATA[selectedTicker]

  if (!stockData) return null

  const rows: [string, string][] = [
    ["OPEN", stockData.stats.open],
    ["HIGH", stockData.stats.high],
    ["LOW", stockData.stats.low],
    ["52 WK HIGH", stockData.stats.weekHigh52],
    ["52 WK LOW", stockData.stats.weekLow52],
    ["VOLUME", stockData.stats.volume],
    ["AVG VOLUME", stockData.stats.avgVolume],
    ["MKT CAP", stockData.stats.marketCap],
  ]

  return (
    <div className="min-w-0">
      <div className="mb-3 text-[14px] font-medium tracking-[-0.01em]">Stats</div>
      <div className="space-y-2 text-[12px]">
        {rows.map(([k, v]) => (
          <div
            key={k}
            className="flex min-w-0 items-center justify-between border-b border-[var(--panel-divider)] pb-2"
          >
            <span className="truncate text-[var(--muted)] pr-2">{k}</span>
            <span className="flex-shrink-0 text-[var(--foreground)]/90">{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
