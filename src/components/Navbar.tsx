"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "#about",    label: "Il Locale" },
  { href: "#cocktails",label: "Cocktails" },
  { href: "#events",   label: "Eventi" },
  { href: "#contact",  label: "Contatti" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const animate = !shouldReduceMotion;

  return (
    <>
      <motion.header
        initial={animate ? { y: -80, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md border-b border-cream-dark shadow-sm"
            : "bg-cream"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Bitterino — torna alla home">
            <Image
              src="/photo/logo.png"
              alt="Bitterino"
              width={68}
              height={68}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigazione principale">
            <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans-alt text-[11px] tracking-[0.25em] uppercase text-brown-3 hover:text-terra-ui transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/api/menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans-alt text-[11px] tracking-[0.25em] uppercase px-5 py-2.5 bg-terra-ui text-cream hover:bg-terra transition-colors duration-200"
                >
                  Menu
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: animate ? 0.2 : 0 }}
              className="block w-6 h-px bg-brown-1"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: animate ? 0.15 : 0 }}
              className="block w-6 h-px bg-brown-1"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: animate ? 0.2 : 0 }}
              className="block w-6 h-px bg-brown-1"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animate ? 0.2 : 0 }}
            className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-10"
          >
            <nav aria-label="Menu mobile">
              <ul className="flex flex-col items-center gap-8 list-none m-0 p-0">
                {links.map((link, i) => (
                  <li key={link.href}>
                    <motion.a
                      href={link.href}
                      initial={animate ? { y: 20, opacity: 0 } : false}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ delay: animate ? i * 0.06 : 0 }}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-4xl font-light text-brown-1 hover:text-terra transition-colors"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
                <li>
                  <motion.a
                    href="/api/menu"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={animate ? { y: 20, opacity: 0 } : false}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: animate ? links.length * 0.06 : 0 }}
                    onClick={() => setMenuOpen(false)}
                    className="font-sans-alt text-[11px] tracking-[0.3em] uppercase px-8 py-3 bg-terra-ui text-cream hover:bg-terra transition-colors duration-200 inline-block"
                  >
                    Sfoglia il Menu
                  </motion.a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
