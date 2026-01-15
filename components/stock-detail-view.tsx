"use client"

import { useEffect } from "react"
import { useStockStore } from "@/lib/store"
import { STOCK_DATA } from "@/lib/stock-data"
import AppBar from "./app-bar"
import PriceHeader from "./price-header"
import TradingChart from "./trading-chart"
import TimeframeSelector from "./timeframe-selector"
import StatsTable from "./stats-table"
import AboutSection from "./about-section"
import ActionButtons from "./action-buttons"

interface StockDetailViewProps {
  ticker: string
}

export default function StockDetailView({ ticker }: StockDetailViewProps) {
  const { setSelectedTicker } = useStockStore()
  const stockData = STOCK_DATA[ticker]

  useEffect(() => {
    setSelectedTicker(ticker)
  }, [ticker, setSelectedTicker])

  if (!stockData) {
    return (
      <main className="min-h-screen w-full" style={{ background: "var(--bg)" }}>
        <AppBar title="Stock Not Found" />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-[16px] font-medium text-[var(--foreground)] mb-2">Stock not found</div>
            <div className="text-[14px] text-[var(--muted)]">The ticker symbol "{ticker}" could not be found</div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full pb-20 sm:pb-6" style={{ background: "var(--bg)" }}>
      <AppBar title={`${ticker} Stock`} />

      <div className="p-4 sm:p-6">
        <div className="mx-auto w-full max-w-[1280px]">
          <section className="panel rounded-card flex h-full min-h-[560px] min-w-0 flex-col overflow-x-hidden overflow-y-auto p-4">
            <PriceHeader />
            <div className="border-b border-[var(--panel-divider)]" />
            <TradingChart />
            <TimeframeSelector />
            <div className="mt-4 border-b border-[var(--panel-divider)]" />
            <div className="mt-4 flex justify-end">
              <ActionButtons />
            </div>
            <div className="mt-4 border-b border-[var(--panel-divider)]" />
            <div className="mt-4 flex-1 min-h-0 grid min-w-0 grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-2">
              <div className="min-w-0">
                <StatsTable />
              </div>
              <div className="min-w-0">
                <AboutSection />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
