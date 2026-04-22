"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";

/*
 * Sostituire con foto reali del locale:
 * src: percorso in /public  (es. "/photo/gallery-1.jpg")
 * alt: descrizione accessibile obbligatoria
 * pos: object-position CSS per ritaglio
 */
const photos = [
  { src: "/photo/cibo.jpg", alt: "Tavolo con cocktail al tramonto nel locale Bitterino",  pos: "center top"    },
  { src: "/photo/cocktail.jpg", alt: "Divano giallo e atmosfera calda del bar",                pos: "left center"   },
  { src: "/photo/shaker.jpg", alt: "Dettaglio del bancone con bicchieri e spirits",          pos: "right center"  },
  { src: "/photo/hero.jpg", alt: "Cocktail rosso servito sul tavolo bianco",               pos: "center 30%"    },
  { src: "/photo/hero.jpg", alt: "Vista della vetrina con la città sullo sfondo",          pos: "center bottom" },
  { src: "/photo/hero.jpg", alt: "Interno del locale con luci calde serali",               pos: "40% center"    },
];

/* Height of each grid row in px */
const ROW_H = 240;

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  return (
    <section aria-labelledby="gallery-heading" className="py-28 px-6 bg-cream-mid">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={a ? { opacity: 0, y: 16 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-sans-alt text-[10px] tracking-[0.55em] uppercase text-terra-ui mb-4">
            Il locale
          </p>
          <h2
            id="gallery-heading"
            className="font-display text-5xl md:text-6xl font-light text-brown-1"
          >
            Atmosfera <span className="italic terra-gradient font-medium">Bitterino</span>
          </h2>
          <div className="divider-terra max-w-xs mx-auto mt-8" aria-hidden="true" />
        </motion.div>

        {/*
         * gridAutoRows garantisce che TUTTE le righe abbiano 240px espliciti,
         * anche su mobile con 2 colonne (3 righe totali vs 2 su desktop).
         * Questo è fondamentale per Next.js Image con fill.
         */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
          style={{ gridAutoRows: `${ROW_H}px` }}
          role="list"
          aria-label="Galleria fotografica Bitterino"
        >
          {photos.map((photo, i) => {
            // Prima foto: occupa 2 righe su desktop per creare il mosaico asimmetrico
            const isTall = i === 0;

            return (
              <motion.div
                key={i}
                role="listitem"
                initial={a ? { opacity: 0, scale: 0.97 } : false}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: a ? i * 0.07 : 0 }}
                className={`relative overflow-hidden group${isTall ? " md:row-span-2" : ""}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: photo.pos }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0 bg-terra/0 group-hover:bg-terra/15 transition-colors duration-500"
                  aria-hidden="true"
                />
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={a ? { opacity: 0 } : false}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: a ? 0.5 : 0 }}
          className="text-center mt-8 font-sans-alt text-[10px] tracking-[0.4em] uppercase text-brown-3"
        >
          Seguici su{" "}
          <a
            href="https://www.instagram.com/bitterinoroma"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Segui Bitterino su Instagram"
            className="text-terra-ui hover:text-terra transition-colors underline underline-offset-4"
          >
            @bitterinoroma
          </a>{" "}
          per le foto più recenti
        </motion.p>
      </div>
    </section>
  );
}
