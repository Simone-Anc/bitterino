"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";



export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  return (
    <section id="about" aria-labelledby="about-heading" className="py-28 px-6 bg-cream-mid">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Text */}
          <motion.div
            initial={a ? { opacity: 0, x: -30 } : false}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans-alt text-[10px] tracking-[0.55em] uppercase text-terra-ui mb-5">
              Il Locale
            </p>
            <h2
              id="about-heading"
              className="font-display text-5xl md:text-6xl font-light text-brown-1 leading-tight mb-8"
            >
              Un luogo dove il
              <br />
              <span className="italic terra-gradient font-medium">tempo si ferma.</span>
            </h2>
            <p className="font-sans-alt text-sm text-brown-2 leading-relaxed font-light mb-5">
              Bitterino nasce dalla passione per la mixology e dalla convinzione che un grande
              cocktail sia molto più di una semplice bevanda. È un momento, un ricordo, un rito.
            </p>
            <p className="font-sans-alt text-sm text-brown-2 leading-relaxed font-light">
              Il nostro team seleziona con cura ogni ingrediente e studia ogni abbinamento
              per offrirti un'esperienza autentica e irripetibile.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={a ? { opacity: 0, x: 30 } : false}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden border border-cream-dark relative">
              <Image
                src="/photo/hero.jpg"
                alt="Interno del locale Bitterino: ambiente caldo e accogliente"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative corner frames */}
            <div className="absolute -bottom-3 -left-3 w-20 h-20 border-l-2 border-b-2 border-terra/40" aria-hidden="true" />
            <div className="absolute -top-3 -right-3 w-14 h-14 border-r-2 border-t-2 border-terra/30" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
