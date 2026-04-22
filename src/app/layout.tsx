import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Bitterino — Cocktail Bar",
  description:
    "Bitterino è un cocktail bar d'autore. Atmosfera intima, cocktail artigianali e una selezione di spirits d'eccellenza.",
  keywords: ["cocktail bar", "bitterino", "aperitivo", "drink", "cocktail"],
  openGraph: {
    title: "Bitterino — Cocktail Bar",
    description: "Atmosfera intima, cocktail artigianali e spirits d'eccellenza.",
    type: "website",
    locale: "it_IT",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className={`${cormorant.variable} ${jost.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
