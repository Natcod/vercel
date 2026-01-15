import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import StockItem, { type StockRow } from "./stock-item"

const STOCKS: StockRow[] = [
  { ticker: "AAPL", shares: 120, price: 105.67, direction: "up" },
  { ticker: "FB", shares: 90, price: 113.05, direction: "up" },
  { ticker: "TWTR", shares: 80, price: 15.91, direction: "down" },
  { ticker: "TSLA", shares: 75, price: 227.75, direction: "up", selected: true },
  { ticker: "NFLX", shares: 50, price: 98.36, direction: "down" },
  { ticker: "F", shares: 20, price: 13.06, direction: "down" },
  { ticker: "DIS", shares: 30, price: 97.22, direction: "up" },
  { ticker: "GPRO", shares: 18, price: 12.42, direction: "up" },
  { ticker: "FIT", shares: 14, price: 14.58, direction: "up" },
  { ticker: "BABA", shares: 5, price: 75.86, direction: "down" },
]

export default function StockListPanel() {
  return (
    <section className="panel rounded-card flex h-[calc(100vh-3rem)] flex-col">
      <div className="border-b border-[var(--panel-divider)] p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
          <Input
            aria-label="Search by stock or market name"
            placeholder="Search by stock or market name"
            className="h-9 rounded-md border-[var(--panel-divider)] bg-[var(--panel-elev)] pl-9 text-[13px] placeholder:text-[var(--muted)]"
          />
        </div>
      </div>

      <ul role="list" className="flex-1 overflow-auto">
        {STOCKS.map((s, idx) => (
          <li key={s.ticker}>
            <StockItem index={idx} {...s} />
          </li>
        ))}
      </ul>
    </section>
  )
}
