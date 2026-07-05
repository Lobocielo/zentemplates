import { notFound } from "next/navigation";
import Image from "next/image";
import AdBanner from "@/components/AdBanner";
import { getDb } from "@/db";
import { templates } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let template: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    fileUrl: string;
    fileName: string;
    downloads: number;
    createdAt: string;
  } | null = null;

  try {
    const db = getDb();
    const result = await db
      .select()
      .from(templates)
      .where(eq(templates.id, Number(id)))
      .limit(1);
    template = result[0] || null;
  } catch {
    notFound();
  }

  if (!template) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video bg-zinc-800 rounded-xl overflow-hidden">
            <Image
              src={template.imageUrl}
              alt={template.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-3">
              {template.name}
            </h1>
            <p className="text-zinc-400 text-lg">
              {template.description || "Sin descripcion disponible"}
            </p>
          </div>

          <AdBanner />

          <div className="flex gap-3">
            <a
              href={template.fileUrl}
              download={template.fileName}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Descargar ({template.fileName})
            </a>
          </div>

          <AdBanner />
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <AdBanner className="min-h-[300px]" />
            <AdBanner className="min-h-[250px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
