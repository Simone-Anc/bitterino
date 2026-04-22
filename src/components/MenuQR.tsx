"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import QRCode from "react-qr-code";

const MENU_URL = process.env.NEXT_PUBLIC_MENU_PDF_URL ?? "/menu";

export default function MenuQR() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const a = !reduce;

  return (
    <section aria-labelledby="menu-qr-heading" className="py-28 px-6 bg-cream">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="divider-terra mb-20" aria-hidden="true" />
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={a ? { opacity: 0, y: 16 } : false}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans-alt text-[10px] tracking-[0.55em] uppercase text-terra-ui mb-5">
              Il Menu
            </p>
            <h2
              id="menu-qr-heading"
              className="font-display text-5xl font-light text-brown-1 leading-tight mb-6"
            >
              Sfoglia il
              <br />
              <span className="italic terra-gradient font-medium">Menu Completo</span>
            </h2>
            <p className="font-sans-alt text-sm text-brown-2 font-light leading-relaxed mb-8">
              Inquadra il QR code con il tuo smartphone per accedere al menu completo,
              oppure clicca sul pulsante qui sotto. Aggiornato stagionalmente.
            </p>
            <a
              href="/menu"
              className="font-sans-alt text-[11px] tracking-[0.3em] uppercase px-10 py-4 bg-terra-ui text-cream hover:bg-terra transition-colors duration-200 inline-block"
            >
              Apri il Menu
            </a>
          </motion.div>

          {/* QR */}
          <motion.div
            initial={a ? { opacity: 0, scale: 0.92 } : false}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: a ? 0.15 : 0 }}
            className="flex flex-col items-center gap-5"
          >
            <div
              className="p-5 bg-cream border-2 border-cream-dark shadow-lg"
              aria-label="QR code per accedere al menu di Bitterino"
            >
              <QRCode
                value={MENU_URL}
                size={190}
                bgColor="#F5EDD6"
                fgColor="#1A0A02"
                level="H"
              />
            </div>
            <p className="font-sans-alt text-[10px] tracking-[0.3em] uppercase text-brown-3 text-center">
              Punta la fotocamera per aprire il menu
            </p>
          </motion.div>
        </div>
        <div className="divider-terra mt-20" aria-hidden="true" />
      </div>
    </section>
  );
}
