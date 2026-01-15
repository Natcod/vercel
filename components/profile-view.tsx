"use client"

import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileItem {
  title: string
  description: string[]
  href: string
}

const PROFILE_ITEMS: ProfileItem[] = [
  {
    title: "Account Summary",
    description: ["Status", "Balances"],
    href: "/profile/account-summary",
  },
  {
    title: "Transfers",
    description: ["Deposits", "Withdrawals"],
    href: "/profile/transfers",
  },
  {
    title: "History",
    description: ["Trades", "Dividends"],
    href: "/profile/history",
  },
  {
    title: "Watchlist",
    description: ["Favorites", "Alerts"],
    href: "/profile/watchlist",
  },
  {
    title: "Notifications",
    description: ["Price Alerts", "News", "Updates"],
    href: "/profile/notifications",
  },
  {
    title: "Settings",
    description: ["Security", "Account"],
    href: "/profile/settings",
  },
  {
    title: "Help",
    description: ["Support", "Guides"],
    href: "/profile/help",
  },
]

export default function ProfileView() {
  const router = useRouter()

  const handleItemClick = (href: string) => {
    router.push(href)
  }

  return (
    <main className="min-h-screen w-full p-4 pb-20 sm:p-6 sm:pb-6" style={{ background: "var(--bg)" }}>
      <div className="mx-auto w-full max-w-[1280px]">
        <section className="panel rounded-card w-full min-h-[560px] flex flex-col overflow-hidden">
          {/* Profile header */}
          <div className="border-b border-[var(--panel-divider)] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-black font-semibold text-lg">
                JD
              </div>
              <div>
                <div className="text-[16px] font-semibold text-[var(--foreground)]">John Doe</div>
                <div className="text-[12px] text-[var(--muted)]">john.doe@example.com</div>
              </div>
            </div>
          </div>

          {/* Profile items list */}
          <div className="flex-1">
            {PROFILE_ITEMS.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleItemClick(item.href)}
                className={[
                  "flex w-full items-center justify-between p-4 text-left transition-colors",
                  "hover:bg-[var(--panel-hover)]",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-inset",
                  index < PROFILE_ITEMS.length - 1 ? "border-b border-[var(--panel-divider)]" : "",
                ].join(" ")}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-[var(--foreground)] mb-1">{item.title}</div>
                  <div className="text-[12px] text-[var(--muted)]">{item.description.join(", ")}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-[var(--muted)] ml-3 flex-shrink-0" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
