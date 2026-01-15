import { create } from "zustand";
import { STOCK_DATA, type StockData } from "./stock-data";

export type Timeframe = "1W" | "1M" | "6M" | "1Y" | "ALL";
export type ChartType = "area" | "candlestick";

interface StockStore {
  selectedTicker: string;
  selectedStock: StockData;
  selectedTimeframe: Timeframe;
  chartType: ChartType;
  isLoadingChart: boolean;
  setSelectedTicker: (ticker: string) => void;
  setSelectedTimeframe: (timeframe: Timeframe) => void;
  setChartType: (type: ChartType) => void;
  setIsLoadingChart: (loading: boolean) => void;
}

export const useStockStore = create<StockStore>((set, get) => ({
  selectedTicker: "TSLA",
  selectedStock: STOCK_DATA.TSLA,
  selectedTimeframe: "1M",
  chartType: "area",
  isLoadingChart: false,
  setSelectedTicker: (ticker: string) =>
    set({
      selectedTicker: ticker,
      selectedStock: STOCK_DATA[ticker],
    }),
  setSelectedTimeframe: (timeframe: Timeframe) => {
    set({ isLoadingChart: true });
    // Simulate loading delay for smooth transition
    setTimeout(() => {
      set({
        selectedTimeframe: timeframe,
        isLoadingChart: false,
      });
    }, 300);
  },
  setChartType: (type: ChartType) => {
    set({ isLoadingChart: true });
    // Simulate loading delay for smooth transition
    setTimeout(() => {
      set({
        chartType: type,
        isLoadingChart: false,
      });
    }, 200);
  },
  setIsLoadingChart: (loading: boolean) => set({ isLoadingChart: loading }),
}));
