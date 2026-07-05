import { put } from "@vercel/blob";

export async function uploadImage(file: File): Promise<string> {
  const blob = await put(`templates/images/${Date.now()}-${file.name}`, file, {
    access: "private",
  });
  return blob.url;
}

export async function uploadFile(file: File): Promise<{ url: string; name: string }> {
  const blob = await put(`templates/files/${Date.now()}-${file.name}`, file, {
    access: "private",
  });
  return { url: blob.url, name: file.name };
}
