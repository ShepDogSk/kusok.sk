import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "kusok.sk",
  url: "https://kusok.sk",
  description: "Ručne šité kožené výrobky — peňaženky, opasky, puzdrá. Každý kus je originál.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@kusok.sk",
    contactType: "customer service",
  },
  sameAs: ["https://instagram.com/kusok.sk"],
};

export default async function Home() {
  const featuredProducts = await db
    .select()
    .from(products)
    .where(eq(products.isPublished, true))
    .orderBy(products.sortOrder)
    .limit(3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-leather-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-leather-950 via-leather-900 to-leather-800 opacity-90" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Kúsok kože, kus duše
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-leather-300 max-w-2xl mx-auto leading-relaxed">
            Ručne šité kožené výrobky z prvotriednych materiálov.
            Každý kus je originál — vyrobený s láskou a precíznosťou.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/produkty"
              className="inline-flex items-center justify-center px-8 py-3 bg-leather-600 hover:bg-leather-500 text-white font-medium rounded-lg transition-colors"
            >
              Pozrieť produkty
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-3 border border-leather-500 hover:bg-leather-800 text-leather-200 font-medium rounded-lg transition-colors"
            >
              Kontaktujte ma
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-leather-900">Vybrané produkty</h2>
            <p className="mt-3 text-leather-600">Objavte naše najobľúbenejšie kúsky</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/produkty"
              className="inline-flex items-center gap-2 text-leather-700 hover:text-leather-900 font-medium transition-colors"
            >
              Zobraziť všetky produkty
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* Brand story */}
      <section className="bg-leather-900 text-leather-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold mb-6">Príbeh značky</h2>
            <p className="text-lg leading-relaxed text-leather-300">
              Za každým výrobkom stojí ručná práca, kvalitné materiály a vášeň pre remeslo.
              Používame prvotriednu taliansku a českú kožu, sedlársky steh a tradičné postupy.
              Výsledkom sú produkty, ktoré s časom nezostarnú — naopak, získavajú charakter a patinu.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-leather-300">
              Každý kúsok je šitý na objednávku, s možnosťou prispôsobenia podľa vašich predstáv.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

