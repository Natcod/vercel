import StockList from "./stock-list"
import MainPanel from "./main-panel"

export default function AppShell() {
  return (
    <main className="min-h-screen w-full p-6" style={{ background: "var(--bg)" }}>
      <div className="mx-auto w-full max-w-[1280px]">
        {/* 2 columns on lg+, stacked on smaller screens.
            On small screens: MainPanel on top, StockList at the bottom */}
        <div className="grid min-w-0 gap-[var(--gap)] lg:grid-cols-[minmax(280px,320px)_1fr]">
          <div className="order-2 min-w-0 lg:order-1">
            <StockList />
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <MainPanel />
          </div>
        </div>
      </div>
    </main>
  )
}
