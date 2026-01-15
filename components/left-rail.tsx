import { Feather, Home, ShoppingBag, Clock, LineChart, Settings, History } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function LeftRail() {
  const items = [
    { key: "My stocks", icon: Home, active: true },
    { key: "Buy stocks", icon: ShoppingBag },
    { key: "Pending orders", icon: Clock },
    { key: "Insights", icon: LineChart },
    { key: "Settings", icon: Settings },
    { key: "History", icon: History },
  ]

  return (
    <aside
      className="panel rounded-card flex h-[calc(100vh-3rem)] flex-col items-center justify-between py-4"
      aria-label="Primary navigation rail"
    >
      <div className="flex flex-col items-center gap-6">
        <div
          className="mt-1 flex h-10 w-10 items-center justify-center rounded-md"
          style={{ background: "var(--accent)" }}
          aria-label="App logo"
          role="img"
        >
          <Feather aria-hidden className="h-5 w-5 text-black" />
        </div>

        <nav className="mt-2 flex flex-col items-center gap-2">
          {items.map(({ key, icon: Icon, active }) => (
            <button
              key={key}
              aria-label={key}
              aria-current={active ? "page" : undefined}
              className={[
                "group relative flex h-10 w-10 items-center justify-center rounded-md text-[var(--muted)]",
                active ? "bg-[var(--panel-hover)] text-[var(--foreground)]" : "hover:bg-[var(--panel-hover)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
              ].join(" ")}
              title={key}
            >
              {active && (
                <span
                  className="absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-r-sm"
                  style={{ width: 3, background: "var(--accent)" }}
                  aria-hidden="true"
                />
              )}
              <Icon className="h-5 w-5" aria-hidden />
              <span className="sr-only">{key}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mb-1 flex flex-col items-center gap-2">
        <Avatar className="h-10 w-10 border border-[var(--panel-divider)]">
          <AvatarFallback className="bg-[var(--panel-elev)] text-[var(--foreground)]">JD</AvatarFallback>
        </Avatar>
      </div>
    </aside>
  )
}
