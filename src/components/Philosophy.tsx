"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const pillars = [
  {
    num: "01",
    title: "Ingredienti vivi",
    desc: "Niente sciroppi industriali. Solo frutta di stagione, erbe fresche, miele artigianale e distillati selezionati con ossessione.",
  },
  {
    num: "02",
    title: "Tecnica al servizio",
    desc: "Shaker, miscelazione, infusioni, clarificazioni: ogni tecnica ha uno scopo. Non facciamo effetti speciali, facciamo gusto.",
  },
  {
    num: "03",
    title: "Ospitalità vera",
    desc: "Ricordare il tuo drink preferito, capire il tuo umore, farti sentire a casa. Questo è il nostro lavoro, non solo versare liquori.",
  },
];

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

        {/* Pillars */}
        <div className="mb-16 text-center">
          <p className="font-sans-alt text-[10px] tracking-[0.55em] uppercase text-terra-ui mb-4">
            La nostra filosofia
          </p>
          <h2
            id="philosophy-heading"
            className="font-display text-5xl md:text-6xl font-light text-brown-1"
          >
            Cosa ci <span className="italic terra-gradient font-medium">guida.</span>
          </h2>
          <div className="divider-terra max-w-xs mx-auto mt-8" aria-hidden="true" />
        </div>

        <ol className="grid md:grid-cols-3 gap-px bg-cream-dark list-none p-0 m-0">
          {pillars.map((p, i) => (
            <motion.li
              key={p.num}
              initial={a ? { opacity: 0, y: 24 } : false}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: a ? 0.15 + i * 0.12 : 0 }}
              className="bg-cream p-10 group"
            >
              <span
                className="font-display text-6xl font-light text-cream-dark group-hover:text-terra/20 transition-colors duration-500 block mb-6 leading-none select-none"
                aria-hidden="true"
              >
                {p.num}
              </span>
              <h3 className="font-display text-2xl font-medium text-brown-1 mb-4 group-hover:text-terra transition-colors duration-200">
                {p.title}
              </h3>
              <p className="font-sans-alt text-sm text-brown-3 leading-relaxed font-light">
                {p.desc}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
