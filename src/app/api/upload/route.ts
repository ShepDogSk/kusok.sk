import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

// Magic byte signatures for image validation
const MAGIC_BYTES: { mime: string; offset: number; bytes: number[] }[] = [
  { mime: "image/jpeg", offset: 0, bytes: [0xff, 0xd8, 0xff] },
  { mime: "image/png", offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: "image/gif", offset: 0, bytes: [0x47, 0x49, 0x46, 0x38] },
  // WebP: starts with RIFF....WEBP
  { mime: "image/webp", offset: 0, bytes: [0x52, 0x49, 0x46, 0x46] },
];

function validateMagicBytes(buffer: Buffer, claimedMime: string): boolean {
  const sig = MAGIC_BYTES.find((s) => s.mime === claimedMime);
  if (!sig) return false;

  if (buffer.length < sig.offset + sig.bytes.length) return false;

  for (let i = 0; i < sig.bytes.length; i++) {
    if (buffer[sig.offset + i] !== sig.bytes[i]) return false;
  }

  // Additional check for WebP: bytes 8-11 must be "WEBP"
  if (claimedMime === "image/webp") {
    if (buffer.length < 12) return false;
    const webpTag = buffer.slice(8, 12).toString("ascii");
    if (webpTag !== "WEBP") return false;
  }

  return true;
}

// POST /api/upload — upload image (auth required)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = Object.keys(MIME_TO_EXT);
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      {
        error: `Invalid file type: ${file.type}. Allowed: ${allowedTypes.join(", ")}`,
      },
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

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Validate magic bytes match the claimed MIME type
  if (!validateMagicBytes(buffer, file.type)) {
    return NextResponse.json(
      { error: "File content does not match the declared file type" },
      { status: 400 }
    );
  }

  // Derive extension from MIME type, not from client-provided filename
  const ext = MIME_TO_EXT[file.type];
  const filename = `${crypto.randomUUID()}${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  fs.writeFileSync(path.join(uploadsDir, filename), buffer);

  const filePath = `/api/uploads/${filename}`;

  return NextResponse.json({ path: filePath }, { status: 201 });
}
