"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import StockItem, { type StockRow } from "./stock-item"
import { useStockStore } from "@/lib/store"
import { STOCK_DATA } from "@/lib/stock-data"
import { useState, useMemo } from "react"

const STOCKS: StockRow[] = Object.values(STOCK_DATA).map((stock) => ({
  ticker: stock.ticker,
  shares: stock.shares,
  price: stock.price,
  direction: stock.direction,
}))

export default function StockList() {
  const { selectedTicker } = useStockStore()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStocks = useMemo(() => {
    if (!searchQuery.trim()) return STOCKS

    const query = searchQuery.toLowerCase()
    return STOCKS.filter(
      (stock) =>
        stock.ticker.toLowerCase().includes(query) || STOCK_DATA[stock.ticker]?.name.toLowerCase().includes(query),
    )
  }, [searchQuery])

  return (
    <section className="panel rounded-card flex h-full min-h-[560px] min-w-0 flex-col overflow-hidden lg:h-[calc(100vh-3rem)]">
      {/* Header search */}
      <div className="border-b border-[var(--panel-divider)] p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <Input
            aria-label="Search by stock or market name"
            placeholder="Search by stock or market name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-md border-[var(--panel-divider)] bg-[var(--panel-elev)] pl-9 text-[13px] placeholder:text-[var(--muted)]"
          />
        </div>
      </div>

      {/* List */}
      <ul role="list" className="flex-1 overflow-x-hidden overflow-y-auto">
        {filteredStocks.map((row, i) => (
          <li key={row.ticker}>
            <StockItem index={i} {...row} selected={row.ticker === selectedTicker} />
          </li>
        ))}
        {filteredStocks.length === 0 && searchQuery.trim() && (
          <li className="p-4 text-center text-[var(--muted)]">No stocks found matching "{searchQuery}"</li>
        )}
      </ul>
    </section>
  )
}
