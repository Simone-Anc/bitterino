import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg text-cream py-16 px-6" aria-label="Pie di pagina">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-start mb-12">

        {/* Brand */}
        <div>
          <Image
            src="/photo/logo.png"
            alt="Bitterino"
            width={70}
            height={70}
            className="object-contain mb-3 opacity-90"
          />
          <p className="font-sans-alt text-[9px] tracking-[0.5em] uppercase text-cream/40">
            Cocktail Bar · Roma
          </p>
        </div>

        {/* Nav */}
        <nav aria-label="Link rapidi footer">
          <p className="font-sans-alt text-[9px] tracking-[0.45em] uppercase text-terra/70 mb-4">
            Naviga
          </p>
          <ul className="space-y-2 list-none p-0 m-0">
            {[
              { href: "#about",    label: "Il Locale" },
              { href: "#cocktails",label: "Cocktails" },
              { href: "#events",   label: "Eventi" },
              { href: "#contact",  label: "Contatti" },
            ].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-sans-alt text-xs text-cream/40 hover:text-cream/80 transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/menu"
                className="font-sans-alt text-xs text-cream/40 hover:text-cream/80 transition-colors duration-200"
              >
                Menu
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <address className="not-italic space-y-2">
          <p className="font-sans-alt text-[9px] tracking-[0.45em] uppercase text-terra/70 mb-4">
            Contatti
          </p>
          <p className="font-sans-alt text-xs text-cream/40">Largo Brindisi, 22 — Roma</p>
          <a
            href="tel:+390600000000"
            className="block font-sans-alt text-xs text-cream/40 hover:text-cream/80 transition-colors duration-200"
          >
            +39 06 000 0000
          </a>
          <a
            href="https://www.instagram.com/bitterinoroma"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bitterino su Instagram"
            className="block font-sans-alt text-xs text-cream/40 hover:text-terra transition-colors duration-200"
          >
            @bitterinoroma
          </a>
        </address>
      </div>

      <div className="divider-terra max-w-6xl mx-auto mb-8" aria-hidden="true" />

      <p className="text-center font-sans-alt text-[9px] tracking-widest text-cream/20 uppercase">
        © {year} Bitterino. Tutti i diritti riservati.
      </p>
    </footer>
  );
}
