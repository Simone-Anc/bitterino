"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function InstagramCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  return (
    // bg terra-ui (#8B3A18), cream text — contrasto 6:1 ✓
    <section aria-label="Seguici su Instagram" className="bg-terra-ui py-20 px-6 overflow-hidden">
      <motion.div
        ref={ref}
        initial={a ? { opacity: 0, y: 16 } : false}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Instagram icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-cream/60 mx-auto mb-6"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>

        <p className="font-sans-alt text-[10px] tracking-[0.6em] uppercase text-cream/60 mb-4">
          Seguici
        </p>
        <h2 className="font-display text-5xl md:text-6xl font-light text-cream leading-none mb-3">
          @bitterinoroma
        </h2>
        <p className="font-sans-alt text-sm text-cream/70 font-light max-w-sm mx-auto mb-10 leading-relaxed">
          Cocktail del giorno, serate speciali e quei momenti che non si descrivono,
          si vivono. Ogni sera, in tempo reale.
        </p>
        <a
          href="https://instagram.com/bitterinoroma"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Apri il profilo Instagram di Bitterino"
          className="font-sans-alt text-[11px] tracking-[0.35em] uppercase px-10 py-4 border border-cream/50 text-cream hover:bg-cream hover:text-terra-ui transition-colors duration-300 inline-block"
        >
          Apri Instagram →
        </a>
      </motion.div>
    </section>
  );
}
