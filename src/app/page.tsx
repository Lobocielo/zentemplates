import TemplateCard from "@/components/TemplateCard";
import AdBanner from "@/components/AdBanner";
import { getDb } from "@/db";
import { templates } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let templateList: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    fileUrl: string;
    fileName: string;
    downloads: number;
    createdAt: string;
  }[] = [];

  try {
    const db = getDb();
    templateList = await db.select().from(templates).orderBy(templates.createdAt);
  } catch {
    // DB not configured yet
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Plantillas <span className="text-red-500">Premium</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Descarga plantillas profesionales y modernas para tu proximo proyecto
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateList.map((template, index) => (
          <div key={template.id}>
            <TemplateCard template={template} />
            {(index + 1) % 6 === 0 && (
              <div className="mt-6">
                <AdBanner />
              </div>
            )}
          </div>
        ))}
      </div>

      {templateList.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-white text-xl font-semibold mb-2">No hay plantillas aun</h3>
          <p className="text-zinc-500">Sube tu primera plantilla desde el panel de admin</p>
        </div>
      )}
    </div>
  );
}
