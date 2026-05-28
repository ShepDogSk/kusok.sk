import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { requireAuth } from "@/lib/auth";

type RouteParams = { params: Promise<{ slug: string }> };

// GET /api/products/[slug] — product detail (public)
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;

  const result = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (result.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}

// PUT /api/products/[slug] — update product (auth required)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { slug } = await params;
  const body = await request.json();

  const existing = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (existing.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const updateData: Record<string, unknown> = {};
  const allowedFields = [
    "name",
    "description",
    "price",
    "currency",
    "category",
    "images",
    "contactInfo",
    "isPublished",
    "sortOrder",
    "slug",
  ];

  for (const field of allowedFields) {
    if (field in body) {
      updateData[field] = body[field];
    }
  }
  updateData.updatedAt = new Date().toISOString();

  const result = await db
    .update(products)
    .set(updateData)
    .where(eq(products.slug, slug))
    .returning();

  return NextResponse.json(result[0]);
}

// DELETE /api/products/[slug] — delete product (auth required)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { slug } = await params;

  const existing = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (existing.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  await db.delete(products).where(eq(products.slug, slug));

  return NextResponse.json({ deleted: true });
}
