"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const stats = [
  { value: "2024", label: "Anno di apertura",    suffix: ""   },
  { value: "60",   label: "Cocktail in carta",   suffix: "+"  },
  { value: "5",    label: "Serate ed aperitivi", suffix: "/7" },
  { value: "7",    label: "Sere alla settimana", suffix: "/7" },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  return (
    <section ref={ref} aria-label="I nostri numeri" className="bg-footer-bg py-16 px-0 overflow-hidden">

      {/* Mobile: horizontal scroll — Desktop: 4-column grid */}
      <ul
        className="
          flex md:grid md:grid-cols-4
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory md:snap-none
          scrollbar-none
          max-w-5xl md:mx-auto
          list-none p-0 m-0
          divide-x divide-cream/10
        "
        aria-label="Statistiche Bitterino"
      >
        {stats.map((s, i) => (
          <motion.li
            key={s.label}
            initial={a ? { opacity: 0, y: 16 } : false}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: a ? i * 0.1 : 0 }}
            className="
              flex-none w-[70vw] sm:w-[45vw] md:w-auto
              snap-center
              flex flex-col items-center justify-center
              px-8 py-12 text-center
            "
          >
            <p
              className="font-display text-6xl md:text-7xl font-light text-cream leading-none mb-3"
              aria-hidden="true"
            >
              {s.value}
              <span className="text-terra text-4xl md:text-5xl">{s.suffix}</span>
            </p>
            <p className="font-sans-alt text-[10px] tracking-[0.4em] uppercase text-cream/50">
              <span className="sr-only">{s.value}{s.suffix} </span>
              {s.label}
            </p>
          </motion.li>
        ))}
      </ul>

      {/* Mobile scroll indicator */}
      <div className="flex justify-center gap-1.5 mt-6 md:hidden" aria-hidden="true">
        {stats.map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-cream/20" />
        ))}
      </div>
    </section>
  );
}
