"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import menuData from "@/data/menu.json";

const ALL = "Tutti";
const categories = [ALL, ...menuData.map((c) => c.category)];

interface MenuItem {
  name: string;
  desc: string;
  price: number;
  tag: string | null;
}

export default function MenuPage() {
  const [active, setActive] = useState(ALL);

  const sections = active === ALL
    ? menuData
    : menuData.filter((c) => c.category === active);

  return (
    <div className="min-h-screen bg-cream flex flex-col">

      {/* Top bar */}
      <header className="flex items-center justify-between px-6 h-20 border-b border-cream-dark bg-cream sticky top-0 z-10">
        <Link
          href="/"
          aria-label="Torna alla home"
          className="font-sans-alt text-[9px] tracking-[0.4em] uppercase text-brown-3 hover:text-terra-ui transition-colors duration-200"
        >
          ← Home
        </Link>

        <Image
          src="/photo/logo.png"
          alt="Bitterino"
          width={48}
          height={48}
          className="object-contain"
        />

        <a
          href="/api/menu"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scarica il menu in PDF"
          className="font-sans-alt text-[9px] tracking-[0.3em] uppercase px-4 py-2 border border-terra-ui text-terra-ui hover:bg-terra-ui hover:text-cream transition-colors duration-200"
        >
          PDF ↗
        </a>
      </header>

      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">

        {/* Title */}
        <div className="text-center mb-12">
          <p className="font-sans-alt text-[10px] tracking-[0.55em] uppercase text-terra-ui mb-4">
            Bitterino · Roma
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-brown-1 mb-4">
            Il nostro <span className="italic font-medium terra-gradient">Menu</span>
          </h1>
          <div className="divider-terra max-w-xs mx-auto mt-6" aria-hidden="true" />
        </div>

        {/* Filter tabs */}
        <nav aria-label="Filtra per categoria" className="mb-12">
          <ul className="flex flex-wrap justify-center gap-2 list-none p-0 m-0">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActive(cat)}
                  aria-pressed={active === cat}
                  className={`font-sans-alt text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 border transition-colors duration-200 ${
                    active === cat
                      ? "bg-terra-ui text-cream border-terra-ui"
                      : "text-brown-3 border-cream-dark hover:border-terra-ui hover:text-terra-ui"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Menu sections */}
        <div className="space-y-16">
          {sections.map((section) => (
            <section key={section.category} aria-labelledby={`cat-${section.category}`}>
              <div className="flex items-center gap-4 mb-8">
                <h2
                  id={`cat-${section.category}`}
                  className="font-sans-alt text-[10px] tracking-[0.5em] uppercase text-terra-ui"
                >
                  {section.category}
                </h2>
                <div className="flex-1 h-px bg-cream-dark" aria-hidden="true" />
              </div>

              <ul className="divide-y divide-cream-dark list-none p-0 m-0">
                {(section.items as MenuItem[]).map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start justify-between gap-6 py-5 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-display text-xl text-brown-1 group-hover:text-terra transition-colors duration-200">
                          {item.name}
                        </h3>
                        {item.tag && (
                          <span className="font-sans-alt text-[8px] tracking-[0.3em] uppercase px-2 py-0.5 border border-terra-ui/50 text-terra-ui shrink-0">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="font-sans-alt text-xs text-brown-3 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <span
                      className="font-display text-2xl text-terra font-light shrink-0 pt-0.5"
                      aria-label={`${item.price} euro`}
                    >
                      €{item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center font-sans-alt text-[9px] tracking-[0.3em] uppercase text-brown-3/50 mt-16">
          I prezzi includono IVA · Per allergie chiedi al nostro staff
        </p>
      </main>

      <footer className="text-center py-4 border-t border-cream-dark bg-cream">
        <p className="font-sans-alt text-[9px] tracking-widest text-brown-3 uppercase">
          Largo Brindisi, 22 — Roma
        </p>
      </footer>
    </div>
  );
}
