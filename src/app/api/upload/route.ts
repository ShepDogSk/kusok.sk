import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// POST /api/upload — upload image (auth required)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: `Invalid file type: ${file.type}. Allowed: ${allowedTypes.join(", ")}` },
      { status: 400 }
    );
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 10MB" },
      { status: 400 }
    );
  }

  const ext = path.extname(file.name) || ".jpg";
  const filename = `${crypto.randomUUID()}${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  fs.writeFileSync(path.join(uploadsDir, filename), buffer);

  const filePath = `/uploads/${filename}`;

  return NextResponse.json({ path: filePath }, { status: 201 });
}
