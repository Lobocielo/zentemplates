"use client";

import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2"
              >
                <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Z</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  Zen<span className="text-red-500">templates</span>
                </span>
              </button>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400 text-sm">Admin</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/admin")}
                className="text-zinc-400 hover:text-white text-sm transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push("/admin/templates/new")}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-colors"
              >
                + Nueva
              </button>
              <button
                onClick={handleLogout}
                className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
