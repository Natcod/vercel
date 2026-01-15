"use client";

import { BarChart3 } from "lucide-react";
import { useStockStore, type Timeframe } from "@/lib/store";

const TIMEFRAMES: { key: Timeframe; label: string }[] = [
  { key: "1W", label: "1 WEEK" },
  { key: "1M", label: "1 MONTH" },
  { key: "6M", label: "6 MONTHS" },
  { key: "1Y", label: "1 YEAR" },
  { key: "ALL", label: "ALL" },
];

export default function TimeframeSelector() {
  const {
    selectedTimeframe,
    chartType,
    setSelectedTimeframe,
    setChartType,
    isLoadingChart,
  } = useStockStore();

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] sm:gap-5">
      {/* Timeframe buttons */}
      {TIMEFRAMES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setSelectedTimeframe(key)}
          disabled={isLoadingChart}
          className={[
            "whitespace-nowrap rounded px-2 py-1 text-xs sm:text-[12px] transition-all duration-200",
            selectedTimeframe === key
              ? "bg-[var(--accent)] text-black"
              : "text-[var(--muted)] hover:text-[var(--foreground)]",
            isLoadingChart && selectedTimeframe !== key
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105",
          ].join(" ")}
        >
          {label}
        </button>
      ))}

      {/* Separator */}
      <div className="h-4 w-px bg-[var(--panel-divider)] mx-1" />

      {/* Chart type toggle */}
      <button
        onClick={() =>
          setChartType(chartType === "area" ? "candlestick" : "area")
        }
        disabled={isLoadingChart}
        className={[
          "flex items-center gap-1 rounded px-2 py-1 text-xs sm:text-[12px] transition-all duration-200",
          chartType === "candlestick"
            ? "bg-[var(--accent)] text-black"
            : "text-[var(--muted)] hover:text-[var(--foreground)]",
          isLoadingChart ? "opacity-50 cursor-not-allowed" : "hover:scale-105",
        ].join(" ")}
        title={
          chartType === "area"
            ? "Switch to candlestick chart"
            : "Switch to line chart"
        }
      >
        <BarChart3 className="h-3 w-3" />
        <span className="hidden sm:inline">CANDLESTICK</span>
      </button>
    </div>
  );
}
