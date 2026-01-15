"use client"

import { useState } from "react"
import TradeModal from "./trade-modal"

export default function ActionButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"buy" | "sell">("buy")

  const handleBuyClick = () => {
    setModalType("buy")
    setIsModalOpen(true)
  }

  const handleSellClick = () => {
    setModalType("sell")
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleSellClick}
          aria-label="Sell"
          className="rounded-md border border-[var(--accent)] bg-transparent px-4 py-2 text-[13px] font-medium text-[var(--accent)] hover:bg-[var(--panel-hover)]"
        >
          Sell
        </button>
        <button
          onClick={handleBuyClick}
          aria-label="Buy"
          className="rounded-md px-5 py-2 text-[13px] font-medium text-black"
          style={{ background: "var(--accent)" }}
        >
          Buy
        </button>
      </div>

      <TradeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type={modalType} />
    </>
  )
}
