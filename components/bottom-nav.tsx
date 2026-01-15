"use client";

import { TrendingUp, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV_ITEMS = [
  {
    href: "/",
    icon: TrendingUp,
    label: "Portfolio",
  },
  {
    href: "/search",
    icon: Search,
    label: "Search",
  },
  {
    href: "/profile",
    icon: User,
    label: "Profile",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--panel)] border-t border-[var(--panel-divider)] px-4 py-2 sm:hidden">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-colors text-[var(--muted)] hover:text-[var(--foreground)]",
                { "text-[var(--accent)]": isActive }
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
