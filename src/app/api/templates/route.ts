import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { templates } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const allTemplates = await db
      .select()
      .from(templates)
      .orderBy(templates.createdAt);
    return NextResponse.json(allTemplates);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;
    const file = formData.get("file") as File;

    if (!name || !image || !file) {
      return NextResponse.json({ error: "Name, image and file are required" }, { status: 400 });
    }

    const { uploadImage, uploadFile } = await import("@/lib/blob");
    const imageUrl = await uploadImage(image);
    const { url: fileUrl, name: fileName } = await uploadFile(file);

    const db = getDb();
    const newTemplate = await db.insert(templates).values({
      name,
      description: description || "",
      imageUrl,
      fileUrl,
      fileName,
    }).returning();

    return NextResponse.json(newTemplate[0], { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Failed to create template", details: message }, { status: 500 });
  }
}
