export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">Z</span>
            </div>
            <span className="text-sm text-zinc-500">
              Zen<span className="text-red-500">templates</span> &copy; {new Date().getFullYear()}
            </span>
          </div>
          <p className="text-zinc-600 text-xs">
            Plantillas premium para tu próximo proyecto
          </p>
        </div>
      </div>
    </footer>
  );
}
