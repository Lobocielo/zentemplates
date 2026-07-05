import Link from "next/link";
import Image from "next/image";

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

export default function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
      <div className="relative aspect-video bg-zinc-800 overflow-hidden">
        <Image
          src={template.imageUrl}
          alt={template.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="text-white font-semibold text-lg mb-1">{template.name}</h3>
        <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
          {template.description || "Sin descripcion"}
        </p>
        <div className="flex gap-2">
          <Link
            href={`/template/${template.id}`}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            Ver
          </Link>
          <a
            href={template.fileUrl}
            download={template.fileName}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            Descargar
          </a>
        </div>
      </div>
    </div>
  );
}
