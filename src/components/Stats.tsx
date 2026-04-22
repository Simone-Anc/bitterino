"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const stats = [
  { value: "2024",  label: "Anno di apertura",       suffix: "" },
  { value: "60",    label: "Cocktail in carta",       suffix: "+" },
  { value: "200",   label: "Etichette in cantina",    suffix: "+" },
  { value: "7",     label: "Sere alla settimana",     suffix: "/7" },
];

export default function Stats() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  return (
    // Dark terracotta strip — cream on #2E1508 = high contrast ✓
    <section aria-label="I nostri numeri" className="bg-footer-bg py-16 px-6">
      <ul
        ref={ref}
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/10 list-none p-0 m-0"
        aria-label="Statistiche Bitterino"
      >
        {stats.map((s, i) => (
          <motion.li
            key={s.label}
            initial={a ? { opacity: 0, y: 16 } : false}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: a ? i * 0.1 : 0 }}
            className="bg-footer-bg px-8 py-10 text-center"
          >
            <p
              className="font-display text-5xl md:text-6xl font-light text-cream leading-none mb-3"
              aria-hidden="true"
            >
              {s.value}
              <span className="text-terra text-4xl">{s.suffix}</span>
            </p>
            <p className="font-sans-alt text-[10px] tracking-[0.4em] uppercase text-cream/50">
              {/* Screen reader gets the full value+suffix */}
              <span className="sr-only">{s.value}{s.suffix} </span>
              {s.label}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
