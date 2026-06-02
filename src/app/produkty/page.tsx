import type { Metadata } from "next";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ kategoria?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  // Category filter pages (?kategoria=X) are not unique content — canonical back to /produkty
  return {
    title: "Produkty — ručne šité kožené výrobky",
    description:
      "Prehliadnite si náš katalóg ručne šitých kožených výrobkov — peňaženky, opasky, puzdrá a ďalšie. Každý kúsok je originál.",
    alternates: {
      canonical: "https://kusok.sk/produkty",
    },
    ...(params.kategoria && {
      robots: { index: false, follow: true },
    }),
  };
}

export default async function ProduktyPage({
  searchParams,
}: {
  searchParams: Promise<{ kategoria?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.kategoria ?? null;

  // Get all published products
  const allProducts = await db
    .select()
    .from(products)
    .where(eq(products.isPublished, true))
    .orderBy(products.sortOrder);

  // Extract unique categories
  const categories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))] as string[];

  // Filter by category if selected
  const filteredProducts = activeCategory
    ? allProducts.filter((p) => p.category === activeCategory)
    : allProducts;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-leather-900">Naše produkty</h1>
        <p className="mt-3 text-leather-600">Každý kus je ručne šitý z prvotriednej kože</p>
      </div>

      {/* Category filter */}
      {categories.length > 1 && (
        <nav className="flex flex-wrap justify-center gap-2 mb-10" aria-label="Filtrovanie kategórií">
          <Link
            href="/produkty"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory
                ? "bg-leather-800 text-white"
                : "bg-leather-100 text-leather-700 hover:bg-leather-200"
            }`}
          >
            Všetky
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/produkty?kategoria=${encodeURIComponent(cat)}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                activeCategory === cat
                  ? "bg-leather-800 text-white"
                  : "bg-leather-100 text-leather-700 hover:bg-leather-200"
              }`}
            >
              {cat}
            </Link>
          ))}
        </nav>
      )}

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-leather-500">
          <p className="text-lg">V tejto kategórii zatiaľ nemáme žiadne produkty.</p>
          <Link href="/produkty" className="mt-4 inline-block text-leather-700 hover:text-leather-900 underline">
            Zobraziť všetky produkty
          </Link>
        </div>
      )}
    </div>
  );
}