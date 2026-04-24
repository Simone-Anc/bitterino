"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import signatures from "@/data/cocktails.json";

export default function Cocktails() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  return (
    <section id="cocktails" aria-labelledby="cocktails-heading" className="py-10 px-6 bg-cream">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={a ? { opacity: 0, y: 16 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-sans-alt text-[10px] tracking-[0.55em] uppercase text-terra-ui mb-4">
            Le nostre creazioni
          </p>
          <h2
            id="cocktails-heading"
            className="font-display text-5xl md:text-6xl font-light text-brown-1 mb-5"
          >
            Cocktail <span className="italic font-medium terra-gradient">Signature</span>
          </h2>
          <p className="font-sans-alt text-sm text-brown-3 font-light max-w-md mx-auto">
            Una selezione dei nostri drink più amati. Il menu si arricchisce ogni stagione
            di nuove creazioni.
          </p>
          <div className="divider-terra max-w-xs mx-auto mt-8" aria-hidden="true" />
        </motion.div>

        <ul
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream-dark list-none p-0 m-0"
          aria-label="Cocktail signature"
        >
          {signatures.map((cocktail, i) => (
            <motion.li
              key={cocktail.name}
              initial={a ? { opacity: 0 } : false}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.45, delay: a ? i * 0.07 : 0 }}
              className="bg-cream p-8 hover:bg-cream-mid transition-colors duration-300 group relative"
            >
              {cocktail.tag && (
                <span className="absolute top-5 right-5 font-sans-alt text-[8px] tracking-[0.3em] uppercase px-2.5 py-1 border border-terra-ui/50 text-terra-ui">
                  {cocktail.tag}
                </span>
              )}
              <p className="font-sans-alt text-[9px] tracking-[0.45em] uppercase text-brown-3 mb-3">
                {cocktail.category}
              </p>
              <h3 className="font-display text-2xl font-medium text-brown-1 mb-3 group-hover:text-terra transition-colors duration-200">
                {cocktail.name}
              </h3>
              <p className="font-sans-alt text-xs text-brown-3 leading-relaxed font-light mb-6">
                {cocktail.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl text-terra font-light" aria-label={`Prezzo: ${cocktail.price} euro`}>
                  €{cocktail.price}
                </span>
                <div className="w-8 h-px bg-cream-dark group-hover:w-12 transition-all duration-300" aria-hidden="true" />
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={a ? { opacity: 0 } : false}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: a ? 0.55 : 0 }}
          className="text-center mt-12"
        >
          <a
            href="/menu"
            className="font-sans-alt text-[11px] tracking-[0.3em] uppercase px-10 py-4 border border-terra-ui text-terra-ui hover:bg-terra-ui hover:text-cream transition-colors duration-200 inline-block"
          >
            Menu Completo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
