"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Template {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  fileUrl: string;
  fileName: string;
  downloads: number;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    try {
      const res = await fetch("/api/templates");
      if (res.ok) {
        setTemplates(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Eliminar esta plantilla?")) return;
    await fetch(`/api/templates/${id}`, { method: "DELETE" });
    setTemplates(templates.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {templates.length} plantilla{templates.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/templates/new")}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          + Nueva Plantilla
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-zinc-500">Cargando...</p>
        </div>
      ) : templates.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h3 className="text-white text-xl font-semibold mb-2">
            No hay plantillas
          </h3>
          <p className="text-zinc-500 mb-4">
            Crea tu primera plantilla para empezar
          </p>
          <button
            onClick={() => router.push("/admin/templates/new")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Crear Plantilla
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-400 text-xs font-medium uppercase tracking-wider px-6 py-3">
                    Plantilla
                  </th>
                  <th className="text-left text-zinc-400 text-xs font-medium uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                    Archivo
                  </th>
                  <th className="text-left text-zinc-400 text-xs font-medium uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                    Creada
                  </th>
                  <th className="text-right text-zinc-400 text-xs font-medium uppercase tracking-wider px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {templates.map((template) => (
                  <tr key={template.id} className="hover:bg-zinc-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={template.imageUrl}
                            alt={template.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">
                            {template.name}
                          </p>
                          <p className="text-zinc-500 text-xs truncate max-w-[200px]">
                            {template.description || "Sin descripcion"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-zinc-400 text-sm">{template.fileName}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-zinc-500 text-sm">
                        {new Date(template.createdAt).toLocaleDateString("es")}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={template.fileUrl}
                          target="_blank"
                          className="text-zinc-400 hover:text-white text-sm transition-colors p-1"
                          title="Ver archivo"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        <button
                          onClick={() => handleDelete(template.id)}
                          className="text-zinc-400 hover:text-red-400 text-sm transition-colors p-1"
                          title="Eliminar"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
