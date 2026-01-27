import { notFound } from "next/navigation"
import { STOCK_DATA } from "@/lib/stock-data"
import StockDetailView from "@/components/stock-detail-view"

interface StockPageProps {
  params: {
    ticker: string
  }
}

export default function StockPage({ params }: StockPageProps) {
  const ticker = params.ticker?.toUpperCase()

  if (!STOCK_DATA[ticker]) {
    notFound()
  }

  return <StockDetailView ticker={ticker} />
}
