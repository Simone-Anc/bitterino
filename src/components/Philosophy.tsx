"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  return (
    <section aria-labelledby="philosophy-heading" className="py-28 px-6 bg-cream">
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* Pull quote */}
        <motion.blockquote
          initial={a ? { opacity: 0, y: 20 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-24 max-w-3xl mx-auto"
          cite="Bitterino"
        >
          <div
            className="font-display text-7xl text-terra/20 leading-none mb-2 select-none"
            aria-hidden="true"
          >
            "
          </div>
          <p className="font-display text-3xl md:text-4xl font-light text-brown-1 leading-snug italic">
            Un cocktail fatto bene non ha bisogno di spiegazioni.
            <br />
            <span className="text-brown-3 text-2xl not-italic font-light">Lo capisci al primo sorso.</span>
          </p>
          <footer className="mt-6">
            <cite className="font-sans-alt text-[10px] tracking-[0.5em] uppercase text-terra-ui not-italic">
              — Bitterino
            </cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
