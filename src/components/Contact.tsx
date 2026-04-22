"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const HOURS_TABLE = [
  { days: "Lunedì — Giovedì", time: "18:00 — 02:00" },
  { days: "Venerdì — Sabato", time: "18:00 — 03:00" },
  { days: "Domenica",         time: "18:00 — 01:00" },
];

/*
 * Per aggiungere la mappa Google:
 * 1. Vai su google.com/maps → cerca il locale → Condividi → Incorpora mappa
 * 2. Copia l'URL dell'iframe e incollalo in GOOGLE_MAPS_EMBED_URL
 * Esempio: "https://www.google.com/maps/embed?pb=!1m18!..."
 */
const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.330649754334!2d12.5115634!3d41.8857456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f610281ae39d3%3A0x1e6b89ec7c5bbf60!2sBitterino!5e0!3m2!1sit!2sit!4v1776864191438!5m2!1sit!2sit";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-28 px-6 bg-cream-mid">
      <div ref={ref} className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={a ? { opacity: 0, y: 16 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-sans-alt text-[10px] tracking-[0.55em] uppercase text-terra-ui mb-4">
            Dove siamo:
          </p>
          <h2
            id="contact-heading"
            className="font-display text-5xl md:text-6xl font-light text-brown-1"
          >
            Vieni a <span className="italic font-medium terra-gradient">trovarci</span>
          </h2>
          <div className="divider-terra max-w-xs mx-auto mt-8" aria-hidden="true" />
        </motion.div>

        {/* Info + Form */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">

          {/* Info */}
          <motion.div
            initial={a ? { opacity: 0, x: -16 } : false}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: a ? 0.1 : 0 }}
            className="space-y-10"
          >
            <address className="not-italic space-y-10">
              <div>
                <p className="font-sans-alt text-[9px] tracking-[0.5em] uppercase text-terra-ui mb-2">
                  Indirizzo
                </p>
                <p className="font-display text-xl text-brown-1">Via Roma 42</p>
                <p className="font-display text-xl text-brown-2">20100 Milano, MI</p>
              </div>

              <div>
                <p className="font-sans-alt text-[9px] tracking-[0.5em] uppercase text-terra-ui mb-4">
                  Orari
                </p>
                <dl className="space-y-3">
                  {HOURS_TABLE.map((row) => (
                    <div
                      key={row.days}
                      className="flex justify-between items-center py-2 border-b border-cream-dark"
                    >
                      <dt className="font-sans-alt text-xs text-brown-3">{row.days}</dt>
                      <dd className="font-sans-alt text-xs text-brown-2 font-medium">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-wrap gap-6">
                <a
                  href="https://instagram.com/bitterinoroma"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Seguici su Instagram"
                  className="font-sans-alt text-[9px] tracking-[0.4em] uppercase text-brown-3 hover:text-terra-ui transition-colors"
                >
                  Instagram ↗
                </a>
                <a
                  href="tel:+390200000000"
                  aria-label="Chiamaci al +39 02 0000000"
                  className="font-sans-alt text-[9px] tracking-[0.4em] uppercase text-brown-3 hover:text-terra-ui transition-colors"
                >
                  +39 02 000 0000
                </a>
                <a
                  href="mailto:info@bitterino.it"
                  aria-label="Scrivici una email"
                  className="font-sans-alt text-[9px] tracking-[0.4em] uppercase text-brown-3 hover:text-terra-ui transition-colors"
                >
                  info@bitterino.it
                </a>
              </div>
            </address>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={a ? { opacity: 0, x: 16 } : false}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: a ? 0.2 : 0 }}
          >
            <form onSubmit={handleSubmit} noValidate aria-label="Modulo di contatto" className="space-y-5">
              <p className="font-sans-alt text-[9px] tracking-[0.5em] uppercase text-terra-ui mb-2">
                Scrivi un messaggio
              </p>

              <div>
                <label
                  htmlFor="contact-name"
                  className="font-sans-alt text-[9px] tracking-[0.3em] uppercase text-brown-3 block mb-1.5"
                >
                  Nome <span aria-hidden="true" className="text-terra">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-cream border border-cream-dark px-4 py-3 font-sans-alt text-sm text-brown-1 placeholder:text-brown-3/50 focus:outline-none focus:border-terra-ui transition-colors"
                  placeholder="Il tuo nome"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="font-sans-alt text-[9px] tracking-[0.3em] uppercase text-brown-3 block mb-1.5"
                >
                  Email <span aria-hidden="true" className="text-terra">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-cream border border-cream-dark px-4 py-3 font-sans-alt text-sm text-brown-1 placeholder:text-brown-3/50 focus:outline-none focus:border-terra-ui transition-colors"
                  placeholder="la@tua.email"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-sans-alt text-[9px] tracking-[0.3em] uppercase text-brown-3 block mb-1.5"
                >
                  Messaggio <span aria-hidden="true" className="text-terra">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full bg-cream border border-cream-dark px-4 py-3 font-sans-alt text-sm text-brown-1 placeholder:text-brown-3/50 focus:outline-none focus:border-terra-ui transition-colors resize-none"
                  placeholder="Come possiamo aiutarti?"
                />
              </div>

              <p className="font-sans-alt text-[9px] text-brown-3">
                <span aria-hidden="true" className="text-terra">* </span>Campi obbligatori
              </p>

              <button
                type="submit"
                disabled={status === "loading"}
                aria-busy={status === "loading"}
                className="w-full font-sans-alt text-[11px] tracking-[0.3em] uppercase py-4 bg-terra-ui text-cream hover:bg-terra transition-colors duration-200 disabled:opacity-50"
              >
                {status === "loading" ? "Invio in corso…" : "Invia messaggio"}
              </button>

              {status === "ok" && (
                <p role="alert" className="font-sans-alt text-xs text-emerald-700">
                  Messaggio inviato. Ti risponderemo presto.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="font-sans-alt text-xs text-red-700">
                  Errore nell&apos;invio. Riprova o chiamaci direttamente.
                </p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={a ? { opacity: 0, y: 16 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: a ? 0.3 : 0 }}
        >
          {GOOGLE_MAPS_EMBED_URL ? (
            <div className="w-full h-72 border border-cream-dark overflow-hidden">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Posizione di Bitterino su Google Maps"
                aria-label="Mappa della posizione di Bitterino, Via Roma 42 Milano"
              />
            </div>
          ) : (
            // Placeholder visivo fino a che non viene inserito l'URL della mappa
            <div className="w-full h-48 border border-dashed border-cream-dark bg-cream flex items-center justify-center">
              <p className="font-sans-alt text-xs text-brown-3 tracking-wide text-center px-6">
                Mappa Google Maps — incolla{" "}
                <code className="text-terra-ui bg-cream-mid px-1">GOOGLE_MAPS_EMBED_URL</code>{" "}
                in <code className="text-terra-ui bg-cream-mid px-1">Contact.tsx</code>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
