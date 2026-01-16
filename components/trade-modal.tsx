"use client"

import type React from "react"
// import { toast } from "sonner"
import { useState } from "react"
import { X } from "lucide-react"
import { useStockStore } from "@/lib/store"

interface TradeModalProps {
  isOpen: boolean
  onClose: () => void
  type: "buy" | "sell"
}

export default function TradeModal({ isOpen, onClose, type }: TradeModalProps) {
  const { selectedStock } = useStockStore()
  const [quantity, setQuantity] = useState("")
  const [orderType, setOrderType] = useState("market")
  const [limitPrice, setLimitPrice] = useState("")

  if (!isOpen || !selectedStock) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock order submission
    console.log(`${type.toUpperCase()} Order:`, {
      ticker: selectedStock.ticker,
      quantity: Number.parseInt(quantity),
      orderType,
      limitPrice: orderType === "limit" ? Number.parseFloat(limitPrice) : null,
    })

    // Reset form and close modal
    setQuantity("")
    setOrderType("market")
    setLimitPrice("")
    onClose()

    // Show success message
    // toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} order placed successfully!`, {
    //   description: `${quantity} shares of ${selectedStock.ticker} at $${selectedStock.price.toFixed(2)}`,
    // })
  }

  const totalValue = quantity ? (Number.parseFloat(quantity) * selectedStock.price).toFixed(2) : "0.00"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-[var(--panel)] p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">
            {type.charAt(0).toUpperCase() + type.slice(1)} {selectedStock.ticker}
          </h2>
          <button onClick={onClose} className="text-[var(--muted)] hover:text-white" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Stock Info */}
        <div className="mb-6 rounded-md bg-[var(--bg)] p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted)]">{selectedStock.name}</p>
              <p className="font-medium text-white">{selectedStock.ticker}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-white">${selectedStock.price.toFixed(2)}</p>
              <p className={`text-sm ${selectedStock.change >= 0 ? "text-[var(--green)]" : "text-[var(--red)]"}`}>
                {selectedStock.change >= 0 ? "+" : ""}${selectedStock.change.toFixed(2)} (
                {selectedStock.changePercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-white mb-2">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-md border border-[var(--muted)]/20 bg-[var(--bg)] px-3 py-2 text-white placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
              placeholder="Enter number of shares"
              required
            />
          </div>

          {/* Order Type */}
          <div>
            <label htmlFor="orderType" className="block text-sm font-medium text-white mb-2">
              Order Type
            </label>
            <select
              id="orderType"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full rounded-md border border-[var(--muted)]/20 bg-[var(--bg)] px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
            >
              <option value="market">Market Order</option>
              <option value="limit">Limit Order</option>
            </select>
          </div>

          {/* Limit Price (only for limit orders) */}
          {orderType === "limit" && (
            <div>
              <label htmlFor="limitPrice" className="block text-sm font-medium text-white mb-2">
                Limit Price
              </label>
              <input
                id="limitPrice"
                type="number"
                min="0"
                step="0.01"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="w-full rounded-md border border-[var(--muted)]/20 bg-[var(--bg)] px-3 py-2 text-white placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                placeholder="Enter limit price"
                required
              />
            </div>
          )}

          {/* Total Value */}
          <div className="rounded-md bg-[var(--bg)] p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[var(--muted)]">Estimated Total:</span>
              <span className="font-semibold text-white">{quantity ? `$${totalValue}` : "—"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-[var(--muted)]/20 bg-transparent px-4 py-2 text-sm font-medium text-[var(--muted)] hover:bg-[var(--panel-hover)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium text-black ${
                type === "buy"
                  ? "bg-[var(--accent)] hover:bg-[var(--accent)]/90"
                  : "bg-[var(--red)] hover:bg-[var(--red)]/90"
              }`}
            >
              {type === "buy" ? "Place Buy Order" : "Place Sell Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
