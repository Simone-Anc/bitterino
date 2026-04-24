"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const HOURS_TABLE = [
  { days: "Domenica — Giovedì", time: "18:00 — 00:00" },
  { days: "Venerdì — Sabato", time: "18:00 — 02:00" },
];


const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.330649754334!2d12.5115634!3d41.8857456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f610281ae39d3%3A0x1e6b89ec7c5bbf60!2sBitterino!5e0!3m2!1sit!2sit!4v1776864191438!5m2!1sit!2sit";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-16 px-6 bg-cream-mid">
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={a ? { opacity: 0, y: 16 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-sans-alt text-[10px] tracking-[0.55em] uppercase text-terra-ui mb-4">
            Dove siamo
          </p>
          <h2
            id="contact-heading"
            className="font-display text-5xl md:text-6xl font-light text-brown-1"
          >
            Vieni a <span className="italic font-medium terra-gradient">trovarci</span>
          </h2>
          <div className="divider-terra max-w-xs mx-auto mt-8" aria-hidden="true" />
        </motion.div>

        {/* Info + Map — side by side on desktop */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Info card */}
          <motion.div
            initial={a ? { opacity: 0, x: -16 } : false}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: a ? 0.1 : 0 }}
            className="flex flex-col gap-8 bg-cream border border-cream-dark p-8 lg:p-10"
          >
            {/* Address */}
            <address className="not-italic">
              <p className="font-sans-alt text-[9px] tracking-[0.5em] uppercase text-terra-ui mb-3">
                Indirizzo
              </p>
              <p className="font-display text-2xl text-brown-1 leading-snug">
                Largo Brindisi, 22
              </p>
              <p className="font-display text-xl text-brown-2">
                00182 Roma RM
              </p>
            </address>

            {/* Hours */}
            <div>
              <p className="font-sans-alt text-[9px] tracking-[0.5em] uppercase text-terra-ui mb-4">
                Orari
              </p>
              <dl className="space-y-3">
                {HOURS_TABLE.map((row) => (
                  <div
                    key={row.days}
                    className="flex justify-between items-center py-2 border-b border-cream-dark last:border-0"
                  >
                    <dt className="font-sans-alt text-xs text-brown-3">{row.days}</dt>
                    <dd className="font-sans-alt text-xs text-brown-2 font-medium">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6 pt-2 border-t border-cream-dark">
              <a
                href="https://instagram.com/bitterinoroma"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguici su Instagram"
                className="font-sans-alt text-[9px] tracking-[0.4em] uppercase text-brown-3 hover:text-terra-ui transition-colors duration-200"
              >
                Instagram ↗
              </a>
              <a
                href="tel:+390600000000"
                aria-label="Chiamaci"
                className="font-sans-alt text-[9px] tracking-[0.4em] uppercase text-brown-3 hover:text-terra-ui transition-colors duration-200"
              >
                +39 NUMERO TELEFONO
              </a>
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={a ? { opacity: 0, x: 16 } : false}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: a ? 0.2 : 0 }}
            className="min-h-80 lg:min-h-0 border border-cream-dark overflow-hidden"
          >
            <iframe
              src={GOOGLE_MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Posizione di Bitterino su Google Maps"
              aria-label="Mappa della posizione di Bitterino, Largo Brindisi 22, Roma"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
