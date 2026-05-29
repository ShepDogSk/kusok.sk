import type { Metadata } from "next";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1)
    .then((r) => r[0]);

  if (!product) return { title: "Produkt nenájdený" };

  return {
    title: product.name,
    description: product.description ?? `${product.name} — ručne šitý kožený výrobok od kusok.sk`,
    openGraph: {
      title: product.name,
      description: product.description ?? undefined,
      type: "website",
      url: `https://kusok.sk/produkt/${slug}`,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description ?? `${product.name} — ručne šitý kožený výrobok od kusok.sk`,
      images: product.images?.[0] ? [product.images[0]] : undefined,
    },
    alternates: {
      canonical: `/produkt/${slug}`,
    },
  };
}

export default async function ProduktPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1)
    .then((r) => r[0]);

  if (!product || !product.isPublished) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: product.images ?? [],
    url: `https://kusok.sk/produkt/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "kusok.sk",
    },
    ...(product.price != null && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: product.currency ?? "EUR",
        availability: "https://schema.org/InStock",
        url: `https://kusok.sk/produkt/${product.slug}`,
        seller: {
          "@type": "Organization",
          name: "kusok.sk",
          url: "https://kusok.sk",
        },
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-leather-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-leather-800 transition-colors">Domov</Link></li>
            <li>/</li>
            <li><Link href="/produkty" className="hover:text-leather-800 transition-colors">Produkty</Link></li>
            <li>/</li>
            <li className="text-leather-800 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Image gallery */}
          <ImageGallery images={product.images ?? []} alt={product.name} />

          {/* Product info */}
          <div className="space-y-6">
            {product.category && (
              <Link
                href={`/produkty?kategoria=${encodeURIComponent(product.category)}`}
                className="inline-block text-xs uppercase tracking-wider text-leather-500 hover:text-leather-700 transition-colors"
              >
                {product.category}
              </Link>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-leather-900">
              {product.name}
            </h1>

            {product.price != null && (
              <p className="text-2xl font-semibold text-leather-700">
                {product.price.toFixed(2)} {product.currency ?? "EUR"}
              </p>
            )}

            {product.description && (
              <div className="prose prose-leather max-w-none">
                <p className="text-leather-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-leather-100 border border-leather-200 rounded-xl p-6 space-y-4">
              <h2 className="font-serif text-lg font-semibold text-leather-900">
                Máte záujem? Kontaktujte ma
              </h2>
              <p className="text-sm text-leather-600">
                Každý výrobok je šitý na objednávku. Rád zodpoviem vaše otázky a prispôsobím produkt vašim potrebám.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:info@kusok.sk"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-leather-800 hover:bg-leather-700 text-white font-medium rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Napísať email
                </a>
                <a
                  href="https://instagram.com/kusok.sk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-leather-300 hover:bg-leather-200 text-leather-800 font-medium rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

