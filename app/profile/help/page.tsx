import AppBar from "@/components/app-bar"

export default function HelpPage() {
  return (
    <main className="min-h-screen w-full pb-20 sm:pb-6" style={{ background: "var(--bg)" }}>
      <AppBar title="Help" />

      <div className="p-4 sm:p-6">
        <div className="mx-auto w-full max-w-[1280px]">
          <section className="panel rounded-card flex h-full min-h-[560px] min-w-0 flex-col p-4">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-[24px] font-semibold text-[var(--foreground)] mb-2">Help</div>
                <div className="text-[var(--muted)]">Support and guides coming soon...</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
