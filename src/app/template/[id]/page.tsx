import { notFound } from "next/navigation";
import Image from "next/image";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-dynamic";

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

async function getTemplate(id: string): Promise<Template | null> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/templates/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = await getTemplate(id);

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
