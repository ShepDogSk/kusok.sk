import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/db/schema";

export default function ProductCard({ product }: { product: Product }) {
  const mainImage = product.images?.[0];

  return (
    <Link
      href={`/produkt/${product.slug}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-leather-100"
    >
      <div className="aspect-[4/3] relative bg-leather-100 overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-leather-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-leather-900 group-hover:text-leather-700 transition-colors">
          {product.name}
        </h3>
        {product.category && (
          <p className="text-xs text-leather-500 uppercase tracking-wider mt-1">{product.category}</p>
        )}
        {product.price != null && (
          <p className="mt-2 text-lg font-semibold text-leather-700">
            {product.price.toFixed(2)} {product.currency ?? "EUR"}
          </p>
        )}
      </div>
    </Link>
  );
}
