"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    icon: "◈",
    title: "Cocktail Artigianali",
    desc: "Ogni drink è studiato nei minimi dettagli, con ingredienti freschi e tecniche d'autore.",
  },
  {
    icon: "◇",
    title: "Selezione Premium",
    desc: "Una cantina di spirits rari e distillati d'eccellenza da ogni angolo del mondo.",
  },
  {
    icon: "◉",
    title: "Atmosfera Intima",
    desc: "Un rifugio dall'ordinario: luce calda, musica curata, conversazioni che restano.",
  },
];

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

        {/* Feature cards */}
        <ul className="grid md:grid-cols-3 gap-6 list-none p-0 m-0" aria-label="Caratteristiche del locale">
          {features.map((f, i) => (
            <motion.li
              key={f.title}
              initial={a ? { opacity: 0, y: 24 } : false}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.12 }}
              className="p-8 border border-cream-dark bg-cream hover:border-terra/40 transition-colors duration-300"
            >
              <span className="text-terra text-2xl mb-5 block" aria-hidden="true">{f.icon}</span>
              <h3 className="font-display text-xl font-medium text-brown-1 mb-3">{f.title}</h3>
              <p className="font-sans-alt text-xs text-brown-3 leading-relaxed font-light">{f.desc}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
