"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import events from "@/data/events.json";


export default function Events() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  return (
    <section id="events" aria-labelledby="events-heading" className="py-28 px-6 bg-cream-mid">
      <div ref={ref} className="max-w-5xl mx-auto">
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

        <ul className="space-y-px list-none p-0 m-0" aria-label="Elenco serate speciali">
          {events.map((event, i) => (
            <motion.li
              key={event.title}
              initial={a ? { opacity: 0, x: -16 } : false}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: a ? i * 0.12 : 0 }}
              className="grid md:grid-cols-[160px_1fr_auto] gap-5 items-start md:items-center p-7 border border-cream-dark bg-cream hover:border-terra/40 transition-colors duration-300"
            >
              <div>
                <p className="font-sans-alt text-[9px] tracking-[0.45em] uppercase text-brown-3 mb-1">Quando</p>
                <p className="font-display text-lg text-brown-1 capitalize">{event.when}</p>
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium text-brown-1 mb-1">{event.title}</h3>
                <p className="font-sans-alt text-xs text-brown-3 font-light leading-relaxed">{event.desc}</p>
              </div>
              <div className="md:text-right">
                <p className="font-sans-alt text-[9px] tracking-[0.3em] uppercase text-brown-3 mb-1">Orario</p>
                <p className="font-sans-alt text-xs text-brown-2">{event.time}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={a ? { opacity: 0 } : false}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: a ? 0.45 : 0 }}
          className="mt-10 p-8 border border-terra/20 bg-terra/5 text-center"
        >
          <p className="font-display text-xl text-brown-2 italic mb-4">
            Vuoi organizzare un evento privato o una serata con il tuo gruppo?
          </p>
          <a
            href="#contact"
            className="font-sans-alt text-[11px] tracking-[0.3em] uppercase text-terra-ui hover:text-terra transition-colors"
          >
            Contattaci →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
