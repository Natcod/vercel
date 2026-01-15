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

export default function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<
    ISeriesApi<"Area"> | ISeriesApi<"Candlestick"> | null
  >(null);
  const { selectedStock, selectedTimeframe, chartType, isLoadingChart } =
    useStockStore();
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

  // Function to safely dispose chart
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

  // Function to create new chart
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
      const candlestickData = selectedStock.chartData[selectedTimeframe].map(
        (item) => ({
          time: item.time,
          open: item.open || item.value,
          high: item.high || item.value * 1.02,
          low: item.low || item.value * 0.98,
          close: item.close || item.value,
        })
      );

      candlestickSeries.setData(candlestickData);
      seriesRef.current = candlestickSeries;
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

      areaSeries.setData(selectedStock.chartData[selectedTimeframe]);
      seriesRef.current = areaSeries;
    }

    chartRef.current = chart;

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
  }, [selectedStock, selectedTimeframe, chartType, isLoadingChart]);

  // Reset saved zoom state when timeframe or stock changes (but not when chart type changes)
  useEffect(() => {
    savedZoomStateRef.current = { logicalRange: null, priceRange: null };
  }, [selectedTimeframe, selectedStock]);

  // Handle resize
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

  // Cleanup on unmount
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
