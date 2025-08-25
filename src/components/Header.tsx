export default function Header() {
  return (
    <header className="bg-[#ff6600] shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="h-10 w-10 grid place-items-center rounded-xl bg-white text-[#ff6600] font-serif font-bold text-lg shadow-sm">
              PTF
            </div>
            <span className="text-white text-xl font-serif font-semibold">
              Paonia Truth Feed
            </span>
          </a>
          
          {/* Empty nav for now - can add items later if needed */}
        </div>
      </div>
    </header>
  )
}