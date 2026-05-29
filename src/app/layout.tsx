import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Kúsok kože, kus duše | kusok.sk",
    template: "%s | kusok.sk",
  },
  description: "Ručne šité kožené výrobky — peňaženky, opasky, puzdrá. Každý kus je originál.",
  openGraph: {
    siteName: "kusok.sk",
    locale: "sk_SK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
