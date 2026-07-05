"use client";

export default function AdBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center ${className}`}>
      {/* Pega tu código de Google AdSense aquí */}
      {/* <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins> */}
      <p className="text-zinc-600 text-sm">Espacio publicitario</p>
    </div>
  );
}
