import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Menu — Bitterino Cocktail Bar",
  description: "Scopri il menu completo di Bitterino: cocktail signature, classici, analcolici e molto altro.",
};

const MENU_PDF_URL =
  process.env.NEXT_PUBLIC_MENU_PDF_URL ?? "";

const DOWNLOAD_URL = MENU_PDF_URL.includes("drive.google.com")
  ? MENU_PDF_URL.replace("/preview", "/view")
  : MENU_PDF_URL;

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-cream-dark bg-cream sticky top-0 z-10">
        <Link
          href="/"
          className="font-sans-alt text-[9px] tracking-[0.4em] uppercase text-brown-3 hover:text-terra-ui transition-colors"
        >
          ← Torna al sito
        </Link>

        <div className="flex flex-col items-center">
          <Image src="/photo/logo.png" alt="Bitterino" width={48} height={48} className="object-contain" />
        </div>

        {DOWNLOAD_URL ? (
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scarica il menu in PDF"
            className="font-sans-alt text-[9px] tracking-[0.3em] uppercase px-4 py-2 border border-terra-ui text-terra-ui hover:bg-terra-ui hover:text-cream transition-colors duration-200"
          >
            Scarica PDF
          </a>
        ) : (
          <span aria-hidden="true" className="w-24" />
        )}
      </header>

      {/* PDF viewer o placeholder */}
      <main id="main-content" className="flex-1 flex flex-col">
        {MENU_PDF_URL ? (
          <iframe
            src={MENU_PDF_URL}
            className="flex-1 w-full border-0 min-h-[80vh]"
            title="Menu completo di Bitterino"
            aria-label="Menu di Bitterino in formato PDF"
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-20 text-center">
            <div className="p-12 border border-cream-dark bg-cream-mid max-w-lg w-full">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-terra/50 mx-auto mb-5"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <p className="font-display text-2xl text-brown-2 italic mb-3">Menu in arrivo</p>
              <p className="font-sans-alt text-xs text-brown-3 font-light leading-relaxed">
                Imposta <code className="text-terra-ui bg-cream-dark px-1">NEXT_PUBLIC_MENU_PDF_URL</code> nel
                pannello Vercel con il link Google Drive per mostrare il menu qui.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-4 border-t border-cream-dark bg-cream">
        <p className="font-sans-alt text-[9px] tracking-widest text-brown-3 uppercase">
          Per allergie o intolleranze chiedi al nostro staff
        </p>
      </footer>
    </div>
  );
}
