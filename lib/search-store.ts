import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SearchState = "idle" | "loading" | "success" | "error" | "empty"

interface SearchStore {
  searchHistory: string[]
  searchState: SearchState
  isKeyboardActive: boolean
  addToHistory: (query: string) => void
  removeFromHistory: (query: string) => void
  clearHistory: () => void
  setSearchState: (state: SearchState) => void
  setKeyboardActive: (active: boolean) => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      searchHistory: [],
      searchState: "idle",
      isKeyboardActive: false,
      addToHistory: (query: string) => {
        const trimmedQuery = query.trim()
        if (!trimmedQuery) return

        const { searchHistory } = get()
        const newHistory = [trimmedQuery, ...searchHistory.filter((item) => item !== trimmedQuery)].slice(0, 10) // Keep only last 10 searches

        set({ searchHistory: newHistory })
      },
      removeFromHistory: (query: string) => {
        const { searchHistory } = get()
        set({
          searchHistory: searchHistory.filter((item) => item !== query),
        })
      },
      clearHistory: () => set({ searchHistory: [] }),
      setSearchState: (state: SearchState) => set({ searchState: state }),
      setKeyboardActive: (active: boolean) => set({ isKeyboardActive: active }),
    }),
    {
      name: "search-store",
      partialize: (state) => ({ searchHistory: state.searchHistory }),
    },
  ),
)
