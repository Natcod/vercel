"use client";

import StockItem, { type StockRow } from "./stock-item";

// User's portfolio stocks
const PORTFOLIO_STOCKS: StockRow[] = [
  { ticker: "AAPL", shares: 120, price: 105.67, direction: "up" },
  { ticker: "TSLA", shares: 75, price: 227.75, direction: "up" },
  { ticker: "FB", shares: 90, price: 113.05, direction: "up" },
  { ticker: "NFLX", shares: 50, price: 98.36, direction: "down" },
  { ticker: "DIS", shares: 30, price: 97.22, direction: "up" },
];

export default function PortfolioStocksList() {
  return (
    <section className="panel rounded-card flex h-full min-h-[560px] min-w-0 flex-col overflow-hidden lg:h-[calc(100vh-3rem)]">
      <div className="border-b border-[var(--panel-divider)] p-3">
        <h2 className="text-[14px] font-medium tracking-[-0.01em] text-[var(--foreground)]">
          Your Stocks
        </h2>
      </div>

      <ul role="list" className="flex-1 overflow-x-hidden overflow-y-auto">
        {PORTFOLIO_STOCKS.map((row, i) => (
          <li key={row.ticker}>
            <StockItem index={i} {...row} />
          </li>
        ))}
      </ul>
    </section>
  );
}
