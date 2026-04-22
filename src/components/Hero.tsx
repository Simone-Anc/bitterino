"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const a = !shouldReduceMotion;

  return (
    <section aria-label="Presentazione Bitterino" className="relative flex md:flex-row min-h-screen">

      {/* ── IMAGE: fullscreen on mobile (absolute), right half on desktop ── */}
      <div className="absolute inset-0 md:relative md:inset-auto md:order-2 md:flex-1 overflow-hidden">
        <Image
          src="/photo/hero.jpg"
          alt="Interno di Bitterino: divano giallo, tavolo bianco, cocktail al tramonto"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Mobile: dark gradient bottom-to-top so text is readable over image */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 md:hidden"
          aria-hidden="true"
        />
        {/* Desktop: gradient left-to-right to blend with text panel */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-cream/70 via-transparent to-transparent hidden md:block"
          aria-hidden="true"
        />
      </div>

      {/* ── TEXT: over image on mobile (z-10), left panel on desktop ── */}
      <div
        className="relative z-10 md:z-auto md:order-1 md:w-1/2 md:bg-cream
                   flex flex-col justify-center
                   px-8 md:px-16 lg:px-24
                   pt-40 pb-16 md:py-24"
      >
        <motion.p
          initial={a ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-sans-alt text-[10px] tracking-[0.65em] uppercase mt-8 mb-4
                     text-cream/70 md:text-terra-ui"
          aria-hidden="true"
        >
          Cocktail Bar · Roma
        </motion.p>

        <motion.h1
          initial={a ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="font-display text-[clamp(4.5rem,12vw,7rem)] font-light leading-none mb-6
                     text-cream md:text-brown-1"
        >
          Bitter
          <span className="terra-gradient font-semibold italic">ino</span>
        </motion.h1>

        <div className="divider-terra w-28 mb-6" aria-hidden="true" />

        <motion.p
          initial={a ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="font-display text-xl font-light italic leading-relaxed max-w-sm mb-10
                     text-cream/80 md:text-brown-2"
        >
          Popolare ma non troppo.
          <br />
          Aperti tutti i giorni.
        </motion.p>

        <motion.div
          initial={a ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="/api/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans-alt text-[11px] tracking-[0.3em] uppercase px-9 py-4
                       bg-terra-ui text-cream hover:bg-terra transition-colors duration-200"
          >
            Scopri il Menu
          </a>
          <a
            href="#about"
            className="font-sans-alt text-[11px] tracking-[0.3em] uppercase px-9 py-4
                       border text-cream border-cream/40 hover:border-cream hover:text-cream
                       md:border-cream-dark md:text-brown-3 md:hover:border-terra-ui md:hover:text-terra-ui
                       transition-colors duration-200"
          >
            Il Locale
          </a>
        </motion.div>
      </div>
    </section>
  );
}
