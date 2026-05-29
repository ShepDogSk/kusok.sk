import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktujte kusok.sk — ručne šité kožené výrobky na objednávku.",
};

export default function KontaktPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-leather-900">Kontakt</h1>
          <p className="mt-3 text-leather-600">
            Máte otázku alebo záujem o výrobok? Neváhajte ma kontaktovať.
          </p>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <a
            href="mailto:info@kusok.sk"
            className="flex items-start gap-4 p-6 bg-white rounded-xl border border-leather-200 hover:border-leather-400 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-leather-100 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-leather-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-leather-900">Email</h2>
              <p className="text-sm text-leather-600 mt-1">info@kusok.sk</p>
            </div>
          </a>

          <a
            href="https://instagram.com/kusok.sk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-6 bg-white rounded-xl border border-leather-200 hover:border-leather-400 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-leather-100 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-leather-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-leather-900">Instagram</h2>
              <p className="text-sm text-leather-600 mt-1">@kusok.sk</p>
            </div>
          </a>
        </div>

        {/* Simple contact form */}
        <div className="bg-white rounded-xl border border-leather-200 p-6 sm:p-8">
          <h2 className="font-serif text-xl font-semibold text-leather-900 mb-6">Napíšte mi správu</h2>
          <form action="mailto:info@kusok.sk" method="POST" encType="text/plain" className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-leather-700 mb-1">Meno</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-leather-300 focus:border-leather-600 focus:ring-1 focus:ring-leather-600 outline-none transition-colors bg-leather-50/50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-leather-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-leather-300 focus:border-leather-600 focus:ring-1 focus:ring-leather-600 outline-none transition-colors bg-leather-50/50"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-leather-700 mb-1">Správa</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-leather-300 focus:border-leather-600 focus:ring-1 focus:ring-leather-600 outline-none transition-colors bg-leather-50/50 resize-y"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-leather-800 hover:bg-leather-700 text-white font-medium rounded-lg transition-colors"
            >
              Odoslať správu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
