import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kúsok kože, kus duše | kusok.sk",
  description: "Ručne šité kožené výrobky",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body className="antialiased">{children}</body>
    </html>
  );
}
