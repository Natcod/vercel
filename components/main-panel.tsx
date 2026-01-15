import PriceHeader from "./price-header"
import TradingChart from "./trading-chart"
import TimeframeSelector from "./timeframe-selector"
import StatsTable from "./stats-table"
import AboutSection from "./about-section"
import ActionButtons from "./action-buttons"

export default function MainPanel() {
  return (
    <div className="relative flex h-full flex-col">
      <section className="panel rounded-card flex h-full min-h-[560px] min-w-0 flex-col overflow-x-hidden overflow-y-auto p-4 pb-20 lg:h-[calc(100vh-3rem)]">
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
  )
}
