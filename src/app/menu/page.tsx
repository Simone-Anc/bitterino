import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Menu — Bitterino Cocktail Bar",
  description: "Scopri il menu completo di Bitterino: cocktail signature, classici, analcolici e molto altro.",
};

const MENU_PDF_URL =
  process.env.NEXT_PUBLIC_MENU_PDF_URL ?? "";

export default function MenuPage() {
  if (MENU_PDF_URL) {
    // Redirect immediato — apre il PDF in questa stessa tab (o nuova se l'utente preferisce)
    // La logica di redirect è gestita lato client tramite meta refresh + JS
  }

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

        <span aria-hidden="true" className="w-24" />
      </header>

      <main id="main-content" className="flex-1 flex flex-col items-center justify-center gap-8 px-6 py-20 text-center">
        <div className="p-12 border border-cream-dark bg-cream-mid max-w-lg w-full flex flex-col items-center gap-6">
          {/* PDF icon */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-terra-ui mx-auto"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>

          <div>
            <p className="font-display text-2xl text-brown-1 italic mb-2">Menu Bitterino</p>
            <p className="font-sans-alt text-xs text-brown-3 font-light leading-relaxed">
              Il menu si apre in una nuova scheda come PDF.
            </p>
          </div>

          {MENU_PDF_URL ? (
            <a
              href={MENU_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apri il menu in PDF in una nuova scheda"
              className="font-sans-alt text-[11px] tracking-[0.3em] uppercase px-8 py-4 bg-terra-ui text-cream hover:bg-terra transition-colors duration-200"
            >
              Apri il Menu ↗
            </a>
          ) : (
            <p className="font-sans-alt text-xs text-brown-3 italic">Menu in arrivo.</p>
          )}
        </div>
      </main>

      <footer className="text-center py-4 border-t border-cream-dark bg-cream">
        <p className="font-sans-alt text-[9px] tracking-widest text-brown-3 uppercase">
          Per allergie o intolleranze chiedi al nostro staff
        </p>
      </footer>
    </div>
  );
}
