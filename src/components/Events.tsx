"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import events from "@/data/events.json";

export default function Events() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  function go(next: number) {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  }

  function prev() { go(current === 0 ? events.length - 1 : current - 1); }
  function next() { go(current === events.length - 1 ? 0 : current + 1); }

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const event = events[current];

  return (
    <section id="events" aria-labelledby="events-heading" className="py-16 px-6 bg-cream">
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={a ? { opacity: 0, y: 16 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-sans-alt text-[10px] tracking-[0.55em] uppercase text-terra-ui mb-4">
            Calendario
          </p>
          <h2
            id="events-heading"
            className="font-display text-5xl md:text-6xl font-light text-brown-1"
          >
            Serate <span className="italic font-medium terra-gradient">Speciali</span>
          </h2>
          <div className="divider-terra max-w-xs mx-auto mt-8" aria-hidden="true" />
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={a ? { opacity: 0, y: 16 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: a ? 0.15 : 0 }}
        >
          {/* Card — reel style */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "3/5", maxHeight: "750px" }}
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={a ? variants : {}}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                {/* Background image */}
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />

                {/* Gradient overlay — bottom */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  {event.active && (
                    <span className="font-sans-alt text-[9px] tracking-[0.4em] uppercase px-3 py-1.5 border border-cream/40 text-cream/80 self-start mb-4">
                      Stasera
                    </span>
                  )}
                  <p className="font-sans-alt text-[10px] tracking-[0.45em] uppercase text-cream/60 mb-3">
                    {event.when} · {event.time}
                  </p>
                  <h3 className="font-display text-4xl md:text-5xl font-light text-cream leading-tight mb-4">
                    {event.title}
                  </h3>
                  <p className="font-sans-alt text-sm text-cream/70 font-light leading-relaxed max-w-md">
                    {event.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next buttons */}
            <button
              onClick={prev}
              aria-label="Evento precedente"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-cream/30 bg-black/20 text-cream hover:bg-black/40 transition-colors duration-200 backdrop-blur-sm"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Evento successivo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-cream/30 bg-black/20 text-cream hover:bg-black/40 transition-colors duration-200 backdrop-blur-sm"
            >
              →
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Naviga eventi">
            {events.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Evento ${i + 1}`}
                onClick={() => go(i)}
                className={`h-px transition-all duration-300 ${
                  i === current ? "w-8 bg-terra-ui" : "w-4 bg-cream-dark"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
