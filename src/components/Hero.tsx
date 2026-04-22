"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import OpenStatus from "./OpenStatus";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const a = !shouldReduceMotion;

  return (
    /*
     * Flex-row on desktop: section stretches to min-h-screen.
     * Children get height from flex stretch → Image fill resolves correctly.
     * Flex-col on mobile: image has explicit h-72.
     */
    <section
      aria-label="Presentazione Bitterino"
      className="flex flex-col md:flex-row min-h-screen"
    >
      {/* ── Left: text (bottom on mobile, left on desktop) ── */}
      <div className="order-2 md:order-1 md:w-1/2 flex flex-col justify-center
                      px-8 md:px-16 lg:px-24 py-24 bg-cream">

        <motion.div
          initial={a ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <OpenStatus />
        </motion.div>

        <motion.p
          initial={a ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-sans-alt text-[10px] tracking-[0.65em] uppercase text-terra-ui mt-8 mb-4"
          aria-hidden="true"
        >
          Cocktail Bar · Roma
        </motion.p>

        <motion.h1
          initial={a ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="font-display text-[clamp(4rem,8vw,7rem)] font-light text-brown-1 leading-none mb-6"
        >
          Bitter
          <span className="terra-gradient font-semibold italic">ino</span>
        </motion.h1>

        <div className="divider-terra w-28 mb-6" aria-hidden="true" />

        <motion.p
          initial={a ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="font-display text-xl font-light text-brown-2 italic leading-relaxed max-w-sm mb-10"
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
                       border border-cream-dark text-brown-3
                       hover:border-terra-ui hover:text-terra-ui transition-colors duration-200"
          >
            Il Locale
          </a>
        </motion.div>
      </div>

      {/* ── Right: image (top on mobile, right on desktop) ── */}
      {/*
       * h-72 gives 288px on mobile (explicit height → fill works).
       * md:flex-1 lets flexbox stretch it to the full section height (100vh+).
       */}
      <div className="order-1 md:order-2 relative h-72 md:h-auto md:flex-1 overflow-hidden">
        <Image
          src="/photo/hero.jpg"
          alt="Interno di Bitterino: divano giallo, tavolo bianco, cocktail al tramonto"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient left-to-right to blend with text panel on desktop */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-cream/60 via-transparent to-transparent
                     hidden md:block"
          aria-hidden="true"
        />
        {/* Gradient top for mobile readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/40
                     md:hidden"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
