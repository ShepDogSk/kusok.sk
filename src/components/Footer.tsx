import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-leather-950 text-leather-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-lg text-leather-100 mb-3">kusok.sk</h3>
            <p className="text-sm leading-relaxed">
              Kúsok kože, kus duše. Ručne šité kožené výrobky s láskou a precíznosťou.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-leather-100 mb-3">Navigácia</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Domov</Link></li>
              <li><Link href="/produkty" className="hover:text-white transition-colors">Produkty</Link></li>
              <li><Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg text-leather-100 mb-3">Kontakt</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@kusok.sk" className="hover:text-white transition-colors">
                  info@kusok.sk
                </a>
              </li>
              <li>
                <a href="https://instagram.com/kusok.sk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram @kusok.sk
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-leather-800 text-center text-xs text-leather-500">
          &copy; {new Date().getFullYear()} kusok.sk. Všetky práva vyhradené.
        </div>
      </div>
    </footer>
  );
}
