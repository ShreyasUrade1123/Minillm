export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F2E4] text-neutral-900 border-b border-neutral-300/50">
      <div className="mx-auto flex max-w-[1400px] h-16 items-center justify-between px-4 sm:px-8 font-mono">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="rotate-45">
              <rect width="14" height="14" />
            </svg>
            <span className="text-xl font-bold tracking-widest">MINILLM</span>
          </div>
          <svg width="48" height="18" viewBox="0 0 48 18" fill="currentColor" className="opacity-70">
            <rect x="0" y="0" width="1.5" height="18" />
            <rect x="3" y="0" width="1" height="18" />
            <rect x="6" y="0" width="2" height="18" />
            <rect x="10" y="0" width="1" height="18" />
            <rect x="13" y="0" width="3" height="18" />
            <rect x="18" y="0" width="1" height="18" />
            <rect x="21" y="0" width="1.5" height="18" />
            <rect x="24" y="0" width="2" height="18" />
            <rect x="28" y="0" width="1" height="18" />
            <rect x="31" y="0" width="3" height="18" />
            <rect x="36" y="0" width="1" height="18" />
            <rect x="39" y="0" width="2" height="18" />
            <rect x="43" y="0" width="1" height="18" />
            <rect x="46" y="0" width="2" height="18" />
          </svg>
        </div>
        <div className="text-sm font-medium opacity-80">
          v0.1.0 / 2026.04
        </div>
      </div>
    </header>
  )
}
