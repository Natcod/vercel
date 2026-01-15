"use client"

import type React from "react"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import StockItem, { type StockRow } from "./stock-item"
import SearchHistory from "./search-history"
import SearchEmptyState from "./search-empty-state"
import SearchLoadingState from "./search-loading-state"
import SearchErrorState from "./search-error-state"
import { STOCK_DATA } from "@/lib/stock-data"
import { useSearchStore } from "@/lib/search-store"
import { useState, useMemo, useEffect, useRef } from "react"

const ALL_STOCKS: StockRow[] = Object.values(STOCK_DATA).map((stock) => ({
  ticker: stock.ticker,
  shares: stock.shares,
  price: stock.price,
  direction: stock.direction,
}))

export default function SearchView() {
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { searchHistory, searchState, isKeyboardActive, addToHistory, setSearchState, setKeyboardActive } =
    useSearchStore()

  const filteredStocks = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    return ALL_STOCKS.filter(
      (stock) =>
        stock.ticker.toLowerCase().includes(query) || STOCK_DATA[stock.ticker]?.name.toLowerCase().includes(query),
    )
  }, [searchQuery])

  // Simulate search with loading and error states
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchState("idle")
      return
    }

    setSearchState("loading")

    // Simulate API call delay
    const searchTimeout = setTimeout(() => {
      // Simulate occasional errors (5% chance)
      if (Math.random() < 0.05) {
        setSearchState("error")
        return
      }

      if (filteredStocks.length === 0) {
        setSearchState("empty")
      } else {
        setSearchState("success")
        addToHistory(searchQuery.trim())
      }
    }, 500)

    return () => clearTimeout(searchTimeout)
  }, [searchQuery, filteredStocks.length, setSearchState, addToHistory])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchFocus = () => {
    setKeyboardActive(true)
  }

  const handleSearchBlur = () => {
    // Longer delay to allow clicks on history items
    setTimeout(() => {
      setKeyboardActive(false)
    }, 200)
  }

  const handleHistorySelect = (query: string) => {
    setSearchQuery(query)
    setKeyboardActive(false) // Hide history after selection
    // Focus the input to show the populated query
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleRetrySearch = () => {
    if (searchQuery.trim()) {
      setSearchState("loading")
      // Trigger search again
      const event = new Event("input", { bubbles: true })
      if (inputRef.current) {
        inputRef.current.dispatchEvent(event)
      }
    }
  }

  const renderSearchContent = () => {
    // Show search history when input is focused and empty
    if (!searchQuery.trim() && isKeyboardActive && searchHistory.length > 0) {
      return <SearchHistory onSelect={handleHistorySelect} />
    }

    // Show empty state when input is not focused and empty
    if (!searchQuery.trim() && !isKeyboardActive) {
      return <SearchEmptyState />
    }

    // Show loading state
    if (searchState === "loading") {
      return <SearchLoadingState />
    }

    // Show error state
    if (searchState === "error") {
      return <SearchErrorState onRetry={handleRetrySearch} />
    }

    // Show empty results state
    if (searchState === "empty") {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-[16px] font-medium text-[var(--foreground)] mb-2">
              No stocks found for "{searchQuery}"
            </div>
            <div className="text-[14px] text-[var(--muted)]">
              Try searching with a different ticker symbol or company name
            </div>
          </div>
        </div>
      )
    }

    // Show search results
    if (searchState === "success" && filteredStocks.length > 0) {
      return (
        <ul role="list" className="flex-1 overflow-x-hidden overflow-y-auto">
          {filteredStocks.map((row, i) => (
            <li key={row.ticker}>
              <StockItem index={i} {...row} />
            </li>
          ))}
        </ul>
      )
    }

    return null
  }

  return (
    <main className="min-h-screen w-full pb-20 sm:p-6 sm:pb-6" style={{ background: "var(--bg)" }}>
      {/* Fixed search header */}
      <div className="sticky top-0 z-40 bg-[var(--bg)] border-b border-[var(--panel-divider)] p-4 sm:relative sm:border-0 sm:bg-transparent">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <Input
              ref={inputRef}
              aria-label="Search by stock or market name"
              placeholder="Search by stock or market name"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="h-12 w-full rounded-md border-[var(--panel-divider)] bg-[var(--panel)] pl-10 text-[14px] placeholder:text-[var(--muted)]"
            />
          </div>
        </div>
      </div>

      {/* Search content */}
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-0">
        <section className="panel rounded-card mt-4 flex min-h-[calc(100vh-140px)] min-w-0 flex-col overflow-hidden sm:mt-6">
          {renderSearchContent()}
        </section>
      </div>
    </main>
  )
}
