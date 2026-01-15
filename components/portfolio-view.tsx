"use client";

export default function PortfolioView() {
  return (
    <main
      className="min-h-screen w-full p-4 pb-20 sm:p-6 sm:pb-6"
      style={{ background: "var(--bg)" }}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid min-w-0 gap-[var(--gap)] lg:grid-cols-[1fr_minmax(280px,320px)]">
          {/* Main chart section */}
          <div className="min-w-0">
            <section className="panel rounded-card flex h-full min-h-[560px] min-w-0 flex-col overflow-x-hidden overflow-y-auto p-4">
              <div className="flex items-start justify-between pb-4">
                <div>
                  <div className="text-foreground text-[42px] font-semibold leading-[1.1] tracking-tight">
                    $24,567.89
                  </div>
                  <div
                    className="mt-1 text-[12px]"
                    style={{ color: "var(--green)" }}
                  >
                    +$1,234.56 (+5.27%) TODAY
                  </div>
                  <div className="mt-1 text-[10px] text-[var(--muted)]">
                    PORTFOLIO VALUE
                  </div>
                </div>
              </div>
              <div className="border-b border-[var(--panel-divider)]" />
            </section>
          </div>

          {/* Portfolio stocks list */}
          <div className="min-w-0"></div>
        </div>
      </div>
    </main>
  );
}
