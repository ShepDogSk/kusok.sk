"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-leather-100 rounded-xl flex items-center justify-center text-leather-400">
        <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="block w-full aspect-square relative bg-leather-100 rounded-xl overflow-hidden cursor-zoom-in"
        >
          <Image
            src={images[activeIndex]}
            alt={`${alt} — obrázok ${activeIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </button>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                  i === activeIndex ? "border-leather-700" : "border-transparent hover:border-leather-400"
                }`}
              >
                <Image src={img} alt={`${alt} — náhľad ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setLightboxOpen(false)}
            aria-label="Zavrieť"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
                onClick={(e) => { e.stopPropagation(); setActiveIndex((activeIndex - 1 + images.length) % images.length); }}
                aria-label="Predchádzajúci"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
                onClick={(e) => { e.stopPropagation(); setActiveIndex((activeIndex + 1) % images.length); }}
                aria-label="Nasledujúci"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className="relative max-w-4xl max-h-[85vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[activeIndex]}
              alt={`${alt} — obrázok ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
