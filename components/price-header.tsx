"use client"

import { useStockStore } from "@/lib/store"

export default function PriceHeader() {
  const { selectedStock } = useStockStore()

  if (!selectedStock) {
    console.log("No selected stock found")
    return <div>Loading...</div>
  }

  const changeSign = selectedStock.change >= 0 ? "+" : ""
  const changeColor = selectedStock.direction === "up" ? "var(--green)" : "var(--red)"

  return (
    <div className="flex items-start justify-between pb-4">
      <div>
        <div className="text-[42px] font-semibold leading-[1.1] tracking-tight">${selectedStock.price.toFixed(2)}</div>
        <div className="mt-1 text-[12px]" style={{ color: changeColor }}>
          {changeSign}
          {selectedStock.change.toFixed(2)} ({changeSign}
          {selectedStock.changePercent.toFixed(2)}%) TODAY
        </div>
        <div className="mt-1 text-[10px] text-[var(--muted)]">28% UP TO 15:30 AFTER HOURS</div>
      </div>
      <div className="text-right">
        <div className="text-[14px] font-medium tracking-[-0.01em] text-[var(--foreground)]">
          {selectedStock.ticker}
        </div>
        <div className="text-[12px] text-[var(--muted)]">{selectedStock.name}</div>
      </div>
    </div>
  )
}
