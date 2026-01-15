export type StockData = {
  ticker: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  changePercent: number;
  direction: "up" | "down";
  chartData: {
    "1W": Array<{
      time: string;
      value: number;
      open?: number;
      high?: number;
      low?: number;
      close?: number;
    }>;
    "1M": Array<{
      time: string;
      value: number;
      open?: number;
      high?: number;
      low?: number;
      close?: number;
    }>;
    "6M": Array<{
      time: string;
      value: number;
      open?: number;
      high?: number;
      low?: number;
      close?: number;
    }>;
    "1Y": Array<{
      time: string;
      value: number;
      open?: number;
      high?: number;
      low?: number;
      close?: number;
    }>;
    ALL: Array<{
      time: string;
      value: number;
      open?: number;
      high?: number;
      low?: number;
      close?: number;
    }>;
  };
  stats: {
    open: string;
    high: string;
    low: string;
    weekHigh52: string;
    weekLow52: string;
    volume: string;
    avgVolume: string;
    marketCap: string;
  };
  about: string;
};

// Mock stock data with chart data for different timeframes
export const STOCK_DATA: Record<string, StockData> = {
  AAPL: {
    ticker: "AAPL",
    name: "Apple Inc. | Common Stock",
    shares: 120,
    price: 105.67,
    change: 2.34,
    changePercent: 2.27,
    direction: "up",
    chartData: {
      "1W": generateChartData("1W", 105.67, "up"),
      "1M": generateChartData("1M", 105.67, "up"),
      "6M": generateChartData("6M", 105.67, "up"),
      "1Y": generateChartData("1Y", 105.67, "up"),
      ALL: generateChartData("ALL", 105.67, "up"),
    },
    stats: {
      open: "103.45",
      high: "106.12",
      low: "102.89",
      weekHigh52: "199.62",
      weekLow52: "124.17",
      volume: "45.2M",
      avgVolume: "52.1M",
      marketCap: "1.62T",
    },
    about:
      "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets.",
  },
  FB: {
    ticker: "FB",
    name: "Meta Platforms Inc. | Common Stock",
    shares: 90,
    price: 113.05,
    change: 1.89,
    changePercent: 1.7,
    direction: "up",
    chartData: {
      "1W": generateChartData("1W", 113.05, "up"),
      "1M": generateChartData("1M", 113.05, "up"),
      "6M": generateChartData("6M", 113.05, "up"),
      "1Y": generateChartData("1Y", 113.05, "up"),
      ALL: generateChartData("ALL", 113.05, "up"),
    },
    stats: {
      open: "111.23",
      high: "114.67",
      low: "110.45",
      weekHigh52: "384.33",
      weekLow52: "88.09",
      volume: "28.4M",
      avgVolume: "31.2M",
      marketCap: "287.5B",
    },
    about:
      "Meta Platforms, Inc. engages in the development of products that enable people to connect and share with friends and family through mobile devices, personal computers, virtual reality headsets, and wearables worldwide.",
  },
  TWTR: {
    ticker: "TWTR",
    name: "Twitter Inc. | Common Stock",
    shares: 80,
    price: 15.91,
    change: -0.45,
    changePercent: -2.75,
    direction: "down",
    chartData: {
      "1W": generateChartData("1W", 15.91, "down"),
      "1M": generateChartData("1M", 15.91, "down"),
      "6M": generateChartData("6M", 15.91, "down"),
      "1Y": generateChartData("1Y", 15.91, "down"),
      ALL: generateChartData("ALL", 15.91, "down"),
    },
    stats: {
      open: "16.12",
      high: "16.34",
      low: "15.78",
      weekHigh52: "73.34",
      weekLow52: "31.30",
      volume: "12.8M",
      avgVolume: "15.6M",
      marketCap: "12.1B",
    },
    about:
      "Twitter, Inc. operates as a platform for public self-expression and conversation in real time. The company offers Twitter, a platform that allows users to consume, create, distribute, and discover content.",
  },
  TSLA: {
    ticker: "TSLA",
    name: "Tesla Motors, Inc. | Common Stock",
    shares: 75,
    price: 227.75,
    change: 1.37,
    changePercent: 0.23,
    direction: "up",
    chartData: {
      "1W": generateChartData("1W", 227.75, "up"),
      "1M": generateChartData("1M", 227.75, "up"),
      "6M": generateChartData("6M", 227.75, "up"),
      "1Y": generateChartData("1Y", 227.75, "up"),
      ALL: generateChartData("ALL", 227.75, "up"),
    },
    stats: {
      open: "225.77",
      high: "229.50",
      low: "224.12",
      weekHigh52: "414.50",
      weekLow52: "101.81",
      volume: "89.7M",
      avgVolume: "95.3M",
      marketCap: "724.5B",
    },
    about:
      "Tesla Motors, Inc. engages in the design, development, manufacture, and sale of electric vehicles and stationary energy storage systems. It operates through the Automotive and Energy Generation and Storage segments.",
  },
  NFLX: {
    ticker: "NFLX",
    name: "Netflix Inc. | Common Stock",
    shares: 50,
    price: 98.36,
    change: -2.14,
    changePercent: -2.13,
    direction: "down",
    chartData: {
      "1W": generateChartData("1W", 98.36, "down"),
      "1M": generateChartData("1M", 98.36, "down"),
      "6M": generateChartData("6M", 98.36, "down"),
      "1Y": generateChartData("1Y", 98.36, "down"),
      ALL: generateChartData("ALL", 98.36, "down"),
    },
    stats: {
      open: "100.12",
      high: "101.45",
      low: "97.89",
      weekHigh52: "700.99",
      weekLow52: "162.71",
      volume: "15.3M",
      avgVolume: "18.7M",
      marketCap: "437.2B",
    },
    about:
      "Netflix, Inc. operates as a streaming entertainment service company. The company offers TV series, documentaries and feature films across a wide variety of genres and languages to members in over 190 countries.",
  },
  F: {
    ticker: "F",
    name: "Ford Motor Company | Common Stock",
    shares: 20,
    price: 13.06,
    change: -0.28,
    changePercent: -2.1,
    direction: "down",
    chartData: {
      "1W": generateChartData("1W", 13.06, "down"),
      "1M": generateChartData("1M", 13.06, "down"),
      "6M": generateChartData("6M", 13.06, "down"),
      "1Y": generateChartData("1Y", 13.06, "down"),
      ALL: generateChartData("ALL", 13.06, "down"),
    },
    stats: {
      open: "13.25",
      high: "13.42",
      low: "12.98",
      weekHigh52: "25.87",
      weekLow52: "8.90",
      volume: "67.2M",
      avgVolume: "72.4M",
      marketCap: "52.3B",
    },
    about:
      "Ford Motor Company designs, manufactures, markets, and services a full line of Ford trucks, utility vehicles, and cars worldwide. The company operates through three segments: Automotive, Mobility, and Ford Credit.",
  },
  DIS: {
    ticker: "DIS",
    name: "The Walt Disney Company | Common Stock",
    shares: 30,
    price: 97.22,
    change: 1.45,
    changePercent: 1.51,
    direction: "up",
    chartData: {
      "1W": generateChartData("1W", 97.22, "up"),
      "1M": generateChartData("1M", 97.22, "up"),
      "6M": generateChartData("6M", 97.22, "up"),
      "1Y": generateChartData("1Y", 97.22, "up"),
      ALL: generateChartData("ALL", 97.22, "up"),
    },
    stats: {
      open: "95.89",
      high: "98.12",
      low: "95.34",
      weekHigh52: "123.74",
      weekLow52: "79.07",
      volume: "8.9M",
      avgVolume: "11.2M",
      marketCap: "177.4B",
    },
    about:
      "The Walt Disney Company operates as an entertainment company worldwide. It operates through two segments, Disney Media and Entertainment Distribution; and Disney Parks, Experiences and Products.",
  },
  GPRO: {
    ticker: "GPRO",
    name: "GoPro Inc. | Common Stock",
    shares: 18,
    price: 12.42,
    change: 0.34,
    changePercent: 2.82,
    direction: "up",
    chartData: {
      "1W": generateChartData("1W", 12.42, "up"),
      "1M": generateChartData("1M", 12.42, "up"),
      "6M": generateChartData("6M", 12.42, "up"),
      "1Y": generateChartData("1Y", 12.42, "up"),
      ALL: generateChartData("ALL", 12.42, "up"),
    },
    stats: {
      open: "12.15",
      high: "12.67",
      low: "12.08",
      weekHigh52: "17.42",
      weekLow52: "3.71",
      volume: "2.1M",
      avgVolume: "2.8M",
      marketCap: "1.9B",
    },
    about:
      "GoPro, Inc. develops and sells cameras, drones, and mountable and wearable accessories in the United States and internationally. The company offers cloud-connected HERO and MAX camera products.",
  },
  FIT: {
    ticker: "FIT",
    name: "Fitbit Inc. | Common Stock",
    shares: 14,
    price: 14.58,
    change: 0.22,
    changePercent: 1.53,
    direction: "up",
    chartData: {
      "1W": generateChartData("1W", 14.58, "up"),
      "1M": generateChartData("1M", 14.58, "up"),
      "6M": generateChartData("6M", 14.58, "up"),
      "1Y": generateChartData("1Y", 14.58, "up"),
      ALL: generateChartData("ALL", 14.58, "up"),
    },
    stats: {
      open: "14.42",
      high: "14.78",
      low: "14.35",
      weekHigh52: "16.84",
      weekLow52: "5.90",
      volume: "1.8M",
      avgVolume: "2.3M",
      marketCap: "3.5B",
    },
    about:
      "Fitbit, Inc. operates as a consumer electronics and fitness company. It provides connected health and fitness devices, software, and services that track data related to daily activity, exercise, food, weight, and sleep.",
  },
  BABA: {
    ticker: "BABA",
    name: "Alibaba Group Holding Limited | Common Stock",
    shares: 5,
    price: 75.86,
    change: -1.92,
    changePercent: -2.47,
    direction: "down",
    chartData: {
      "1W": generateChartData("1W", 75.86, "down"),
      "1M": generateChartData("1M", 75.86, "down"),
      "6M": generateChartData("6M", 75.86, "down"),
      "1Y": generateChartData("1Y", 75.86, "down"),
      ALL: generateChartData("ALL", 75.86, "down"),
    },
    stats: {
      open: "77.12",
      high: "78.45",
      low: "75.23",
      weekHigh52: "138.70",
      weekLow52: "58.01",
      volume: "19.4M",
      avgVolume: "22.1M",
      marketCap: "191.2B",
    },
    about:
      "Alibaba Group Holding Limited provides technology infrastructure and marketing reach to merchants, brands, retailers, and other businesses to engage with their users and customers in China and internationally.",
  },
};

function generateChartData(
  timeframe: string,
  currentPrice: number,
  trend: "up" | "down"
) {
  const data = [];
  let days: number;
  let startPrice: number;

  switch (timeframe) {
    case "1W":
      days = 7;
      startPrice = currentPrice * (trend === "up" ? 0.95 : 1.05);
      break;
    case "1M":
      days = 30;
      startPrice = currentPrice * (trend === "up" ? 0.85 : 1.15);
      break;
    case "6M":
      days = 180;
      startPrice = currentPrice * (trend === "up" ? 0.7 : 1.3);
      break;
    case "1Y":
      days = 365;
      startPrice = currentPrice * (trend === "up" ? 0.6 : 1.4);
      break;
    case "ALL":
      days = 1095; // 3 years
      startPrice = currentPrice * (trend === "up" ? 0.4 : 1.6);
      break;
    default:
      days = 30;
      startPrice = currentPrice * 0.85;
  }

  const start = new Date();
  start.setDate(start.getDate() - days);
  let price = startPrice;

  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    // Add some randomness with trend bias
    const trendBias = trend === "up" ? 0.002 : -0.002;
    const volatility =
      timeframe === "1W" ? 0.02 : timeframe === "1M" ? 0.03 : 0.04;
    const randomChange = (Math.random() - 0.5) * volatility + trendBias;
    price = price * (1 + randomChange);

    // Ensure we end up close to the current price
    if (i === days - 1) {
      price = currentPrice;
    }

    // Generate OHLC data for candlesticks
    const dayVolatility = 0.015;
    const open: number = i === 0 ? startPrice : data[i - 1].close;
    const close = Math.round(price * 100) / 100;
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
      value: close, // For area chart
      open: Math.round(open * 100) / 100,
      high,
      low,
      close,
    });
  }

  return data;
}
