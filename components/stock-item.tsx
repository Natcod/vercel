"use client";

import { cn } from "@/lib/utils";
import Sparkline from "./sparkline";
import { useRouter } from "next/navigation";

export type StockRow = {
  ticker: string;
  shares: number;
  price: number;
  direction: "up" | "down";
  selected?: boolean;
  index?: number;
};

function seriesForTicker(
  ticker: string,
  direction: "up" | "down",
  points = 24
) {
  let seed = 0;
  for (let i = 0; i < ticker.length; i++)
    seed = (seed * 31 + ticker.charCodeAt(i)) >>> 0;
  const rand = () => {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };
  const data: number[] = [];
  let v = direction === "up" ? 50 : 60;
  for (let i = 0; i < points; i++) {
    const bias = direction === "up" ? 0.25 : -0.25;
    const delta = (rand() - 0.5 + bias) * 3;
    v = Math.max(0, Math.min(100, v + delta));
    data.push(v);
  }
  return data;
}

export default function StockItem({
  ticker = "TICK",
  shares = 10,
  price = 100.0,
  direction = "up",
  selected = false,
}: StockRow) {
  const router = useRouter();

  const pillBg =
    direction === "up" ? "var(--green-pill-bg)" : "var(--red-pill-bg)";
  const data = seriesForTicker(ticker, direction);
  const stroke = direction === "up" ? "var(--accent)" : "var(--red)";

  const handleClick = () => {
    router.push(`/stock/${ticker}`);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex h-[56px] w-full items-center justify-between px-3 text-left",
        selected
          ? "bg-[color:var(--panel-hover)]"
          : "hover:bg-[color:var(--panel-hover)]",
        "border-b border-[var(--panel-divider)] transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-inset"
      )}
      aria-pressed={selected}
      aria-label={`View ${ticker} stock details`}
    >
      <div className="flex items-center gap-3">
        <span
          className="hidden sm:block"
          style={{
            width: 3,
            height: 20,
            background: selected ? "var(--accent)" : "transparent",
            borderRadius: 2,
          }}
          aria-hidden="true"
        />
        <div>
          <div className="text-[14px] font-medium leading-4 tracking-[-0.01em] text-[var(--foreground)]">
            {ticker}
          </div>
          <div className="mt-1 text-[12px] leading-3 text-[var(--muted)]">
            {shares} shares
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Sparkline
          data={data}
          width={80}
          height={24}
          stroke={stroke}
          className="opacity-90"
        />
        <span
          className="rounded-full px-2 py-[6px] text-[12px] font-bold leading-none border border-[color:rgba(255,255,255,0.06)]"
          style={{ background: pillBg, color: "var(--pill-foreground)" }}
        >
          ${price.toFixed(2)}
        </span>
      </div>
    </button>
  );
}
