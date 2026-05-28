import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { requireAuth } from "@/lib/auth";
import slugify from "slugify";

// GET /api/products — list products (public)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const isPublished = searchParams.get("is_published");

  const conditions = [];
  if (category) {
    conditions.push(eq(products.category, category));
  }
  if (isPublished !== null && isPublished !== undefined && isPublished !== "") {
    conditions.push(
      eq(products.isPublished, isPublished === "true" || isPublished === "1")
    );
  }

  const result =
    conditions.length > 0
      ? await db
          .select()
          .from(products)
          .where(and(...conditions))
          .orderBy(products.sortOrder)
      : await db.select().from(products).orderBy(products.sortOrder);

  return NextResponse.json(result);
}

// POST /api/products — create product (auth required)
export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const body = await request.json();
  const { name, description, price, currency, category, images, contactInfo, isPublished, sortOrder } = body;

  if (!name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const slug =
    body.slug ||
    slugify(name, { lower: true, strict: true, locale: "sk" });

  // Check slug uniqueness
  const existing = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json(
      { error: `Product with slug '${slug}' already exists` },
      { status: 409 }
    );
  }

  const result = await db
    .insert(products)
    .values({
      slug,
      name,
      description: description ?? null,
      price: price ?? null,
      currency: currency ?? "EUR",
      category: category ?? null,
      images: images ?? [],
      contactInfo: contactInfo ?? null,
      isPublished: isPublished ?? false,
      sortOrder: sortOrder ?? 0,
    })
    .returning();

  return NextResponse.json(result[0], { status: 201 });
}
