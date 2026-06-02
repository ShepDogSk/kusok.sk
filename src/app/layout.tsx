import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://kusok.sk"),
  title: {
    default: "Kúsok kože, kus duše | kusok.sk",
    template: "%s | kusok.sk",
  },
  description: "Ručne šité kožené výrobky — peňaženky, opasky, puzdrá. Každý kus je originál.",
  openGraph: {
    siteName: "kusok.sk",
    locale: "sk_SK",
    type: "website",
    url: "https://kusok.sk",
    title: "Kúsok kože, kus duše | kusok.sk",
    description: "Ručne šité kožené výrobky — peňaženky, opasky, puzdrá. Každý kus je originál.",
    // Place a 1200×630 social sharing image at /public/og-image.jpg
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "kusok.sk — ručne šité kožené výrobky",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kúsok kože, kus duše | kusok.sk",
    description: "Ručne šité kožené výrobky — peňaženky, opasky, puzdrá. Každý kus je originál.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://kusok.sk",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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

