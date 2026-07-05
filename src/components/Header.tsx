import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-xl font-bold text-white">
              Zen<span className="text-red-500">templates</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Inicio
            </Link>
            <Link
              href="/admin"
              className="text-zinc-400 hover:text-white transition-colors text-sm"
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
