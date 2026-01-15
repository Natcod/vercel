"use client";

import { useEffect, useRef, useState } from "react";
import {
  AreaSeries,
  CandlestickSeries,
  createChart,
  ColorType,
  type IChartApi,
  type ISeriesApi,
  type LogicalRange,
} from "lightweight-charts";
import { useStockStore } from "@/lib/store";
import { Loader2 } from "lucide-react";

interface SavedZoomState {
  logicalRange: LogicalRange | null;
  priceRange: { from: number; to: number } | null;
}

// Mock portfolio data
const PORTFOLIO_DATA = {
  "1W": generatePortfolioData("1W", 24567.89),
  "1M": generatePortfolioData("1M", 24567.89),
  "6M": generatePortfolioData("6M", 24567.89),
  "1Y": generatePortfolioData("1Y", 24567.89),
  ALL: generatePortfolioData("ALL", 24567.89),
};

function generatePortfolioData(timeframe: string, currentValue: number) {
  const data = [];
  let days: number;
  let startValue: number;

  switch (timeframe) {
    case "1W":
      days = 7;
      startValue = currentValue * 0.95;
      break;
    case "1M":
      days = 30;
      startValue = currentValue * 0.85;
      break;
    case "6M":
      days = 180;
      startValue = currentValue * 0.7;
      break;
    case "1Y":
      days = 365;
      startValue = currentValue * 0.6;
      break;
    case "ALL":
      days = 1095; // 3 years
      startValue = currentValue * 0.4;
      break;
    default:
      days = 30;
      startValue = currentValue * 0.85;
  }

  const start = new Date();
  start.setDate(start.getDate() - days);
  let value = startValue;

  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    // Portfolio generally trends upward
    const trendBias = 0.003;
    const volatility =
      timeframe === "1W" ? 0.015 : timeframe === "1M" ? 0.025 : 0.035;
    const randomChange = (Math.random() - 0.5) * volatility + trendBias;
    value = value * (1 + randomChange);

    if (i === days - 1) {
      value = currentValue;
    }

    // Generate OHLC data for candlesticks
    const dayVolatility = 0.01;
    const open: number = i === 0 ? startValue : data[i - 1].close;
    const close = Math.round(value * 100) / 100;
    const high =
      Math.round(
        Math.max(open, close) * (1 + Math.random() * dayVolatility) * 100
      ) / 100;
    const low =
      Math.round(
        Math.min(open, close) * (1 - Math.random() * dayVolatility) * 100
      ) / 100;

    data.push({
      time: date.toISOString().split("T")[0],
      value: close,
      open: Math.round(open * 100) / 100,
      high,
      low,
      close,
    });
  }

  return data;
}

export default function PortfolioChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<
    ISeriesApi<"Area"> | ISeriesApi<"Candlestick"> | null
  >(null);
  const { selectedTimeframe, chartType, isLoadingChart } = useStockStore();
  const [chartOpacity, setChartOpacity] = useState(1);
  const savedZoomStateRef = useRef<SavedZoomState>({
    logicalRange: null,
    priceRange: null,
  });

  // Save both horizontal and vertical zoom ranges
  const saveCurrentZoomState = () => {
    if (chartRef.current) {
      try {
        const timeScale = chartRef.current.timeScale();
        const priceScale = chartRef.current.priceScale("right");

        savedZoomStateRef.current = {
          logicalRange: timeScale.getVisibleLogicalRange(),
          priceRange: priceScale.getVisibleRange(),
        };
      } catch (error) {
        console.log("Could not save zoom state");
      }
    }
  };

  const disposeChart = () => {
    if (chartRef.current) {
      try {
        chartRef.current.remove();
      } catch (error) {
        console.log("Chart already disposed");
      }
      chartRef.current = null;
      seriesRef.current = null;
    }
  };

  const createNewChart = () => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;
    const containerWidth = container.clientWidth || 800;
    const containerHeight = 280;

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#7b8794",
        fontSize: 12,
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: "rgba(123, 135, 148, 0.1)" },
        horzLines: { color: "rgba(123, 135, 148, 0.1)" },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: "#2dd4bf",
          width: 1,
          style: 2,
        },
        horzLine: {
          color: "#2dd4bf",
          width: 1,
          style: 2,
        },
      },
      rightPriceScale: {
        borderColor: "rgba(123, 135, 148, 0.2)",
        textColor: "#7b8794",
      },
      timeScale: {
        borderColor: "rgba(123, 135, 148, 0.2)",
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
      width: containerWidth,
      height: containerHeight,
    });

    let series: ISeriesApi<"Area"> | ISeriesApi<"Candlestick"> | null = null;

    if (chartType === "candlestick") {
      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: "#2dd4bf",
        downColor: "#ff6b6b",
        borderUpColor: "#2dd4bf",
        borderDownColor: "#ff6b6b",
        wickUpColor: "#2dd4bf",
        wickDownColor: "#ff6b6b",
        priceFormat: {
          type: "price",
          precision: 2,
          minMove: 0.01,
        },
      });

      // Convert data for candlestick chart
      const candlestickData = PORTFOLIO_DATA[selectedTimeframe].map((item) => ({
        time: item.time,
        open: item.open || item.value,
        high: item.high || item.value * 1.01,
        low: item.low || item.value * 0.99,
        close: item.close || item.value,
      }));

      candlestickSeries.setData(candlestickData);
      series = candlestickSeries;
    } else {
      const areaSeries = chart.addSeries(AreaSeries, {
        lineColor: "#2dd4bf",
        topColor: "rgba(45, 212, 191, 0.4)",
        bottomColor: "rgba(45, 212, 191, 0.0)",
        lineWidth: 2,
        priceFormat: {
          type: "price",
          precision: 2,
          minMove: 0.01,
        },
      });

      areaSeries.setData(PORTFOLIO_DATA[selectedTimeframe]);
      series = areaSeries;
    }

    chartRef.current = chart;
    seriesRef.current = series;

    // Restore both horizontal and vertical zoom after the chart is fully created
    if (
      savedZoomStateRef.current.logicalRange ||
      savedZoomStateRef.current.priceRange
    ) {
      // Use a small delay to ensure the chart is fully rendered
      setTimeout(() => {
        try {
          if (chartRef.current) {
            // Restore horizontal zoom
            if (savedZoomStateRef.current.logicalRange) {
              chartRef.current
                .timeScale()
                .setVisibleLogicalRange(savedZoomStateRef.current.logicalRange);
            }

            // Restore vertical zoom
            if (savedZoomStateRef.current.priceRange) {
              chartRef.current
                .priceScale("right")
                .setVisibleRange(savedZoomStateRef.current.priceRange);
            }
          }
        } catch (error) {
          console.log("Could not restore zoom state");
        }
      }, 50);
    }

    return chart;
  };

  // Save zoom state when chart type is about to change
  useEffect(() => {
    if (isLoadingChart) {
      saveCurrentZoomState();
      setChartOpacity(0);
      return;
    }

    const updateTimeout = setTimeout(() => {
      disposeChart();
      createNewChart();
      setChartOpacity(1);
    }, 100);

    return () => {
      clearTimeout(updateTimeout);
    };
  }, [selectedTimeframe, chartType, isLoadingChart]);

  // Reset saved zoom state when timeframe changes (but not when chart type changes)
  useEffect(() => {
    savedZoomStateRef.current = { logicalRange: null, priceRange: null };
  }, [selectedTimeframe]);

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        const { clientWidth } = chartContainerRef.current;
        try {
          chartRef.current.applyOptions({
            width: clientWidth > 0 ? clientWidth : 800,
            height: 280,
          });
        } catch (error) {
          console.log("Chart disposed during resize");
        }
      }
    };

    const resizeTimeout = setTimeout(handleResize, 100);
    const resizeObserver = new ResizeObserver(handleResize);

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      disposeChart();
    };
  }, []);

  return (
    <div className="relative mt-4 h-[280px] w-full min-w-0 overflow-hidden rounded-md border border-[var(--panel-divider)]">
      {isLoadingChart && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--panel)]/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading chart...</span>
          </div>
        </div>
      )}

      <div
        ref={chartContainerRef}
        className="h-full w-full transition-opacity duration-300 ease-in-out"
        style={{
          background: "var(--panel)",
          opacity: chartOpacity,
        }}
      />
    </div>
  );
}
