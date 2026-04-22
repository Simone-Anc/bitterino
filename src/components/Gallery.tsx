"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { IGPost } from "@/lib/instagram";

const FALLBACK_PHOTOS = [
  { src: "/photo/hero.jpg", alt: "Interno del locale Bitterino con atmosfera calda", pos: "center top" },
  { src: "/photo/hero.jpg", alt: "Cocktail servito al tavolo da Bitterino",          pos: "left center" },
  { src: "/photo/hero.jpg", alt: "Dettaglio del bancone di Bitterino",               pos: "right center" },
  { src: "/photo/hero.jpg", alt: "Divano giallo e luci calde di Bitterino",          pos: "center 30%" },
  { src: "/photo/hero.jpg", alt: "Vista della sala di Bitterino la sera",            pos: "center bottom" },
  { src: "/photo/hero.jpg", alt: "Aperitivo e cocktail signature da Bitterino",      pos: "40% center" },
];

const ROW_H = 240;

interface Props {
  posts?: IGPost[];
}

export default function Gallery({ posts }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  const hasRealPosts = posts && posts.length > 0;
  const items = hasRealPosts
    ? posts.slice(0, 6).map((p) => ({
        src: p.thumbnail_url ?? p.media_url,
        alt: p.caption ? p.caption.slice(0, 100) : "Post Instagram di Bitterino",
        href: p.permalink,
        pos: "center center",
      }))
    : FALLBACK_PHOTOS.map((p) => ({ ...p, href: "https://www.instagram.com/bitterinoroma" }));

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
         */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
          style={{ gridAutoRows: `${ROW_H}px` }}
          role="list"
          aria-label="Galleria fotografica Bitterino"
        >
          {items.map((item, i) => {
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
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.alt}
                  className="block w-full h-full"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: item.pos }}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-terra/0 group-hover:bg-terra/15 transition-colors duration-500 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans-alt text-[9px] tracking-[0.4em] uppercase text-cream">
                      Instagram ↗
                    </span>
                  </div>
                </a>
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
