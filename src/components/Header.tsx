export default function Header() {
  return (
    <header className="bg-[#ff6600] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-2 text-white hover:opacity-90">
              <div className="w-7 h-7 bg-white rounded flex items-center justify-center">
                <span className="text-[#ff6600] font-bold text-sm">P</span>
              </div>
              <span className="font-semibold text-sm hidden sm:block">Paonia Truth Feed</span>
            </a>
          </div>
          
          <nav className="flex items-center space-x-5 text-xs text-white">
            <a href="/" className="hover:opacity-80 transition-opacity">new</a>
            <a href="/" className="hover:opacity-80 transition-opacity">top</a>
            <a href="/ai-personas" className="hover:opacity-80 transition-opacity hidden sm:block">ai personas</a>
            <a href="/about" className="hover:opacity-80 transition-opacity">about</a>
          </nav>
        </div>
      </div>
    </header>
  )
}