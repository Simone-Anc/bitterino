import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import Stats       from "@/components/Stats";
import About       from "@/components/About";
import Philosophy  from "@/components/Philosophy";
import Gallery     from "@/components/Gallery";
import Cocktails   from "@/components/Cocktails";
import Events      from "@/components/Events";
import InstagramCTA from "@/components/InstagramCTA";
import Contact     from "@/components/Contact";
import Footer      from "@/components/Footer";
import BackToTop   from "@/components/BackToTop";
import { fetchInstagramPosts } from "@/lib/instagram";

export default async function Home() {
  const instagramPosts = await fetchInstagramPosts(6);

  return (
    <>
      {/* Skip to main content — WCAG 2.1 criterion 2.4.1 */}
      <a href="#main-content" className="skip-link">
        Vai al contenuto principale
      </a>

      <Navbar />

      <main id="main-content">
        {/* 1 — Prima impressione */}
        <Hero />

        {/* 2 — Numeri rapidi, break visivo scuro */}
        <Stats />

        {/* 3 — Storia e valori del locale */}
        <About />

        {/* 4 — Filosofia / manifesto */}
        <Philosophy />

        {/* 5 — Galleria fotografica (ultimi 6 post Instagram) */}
        <Gallery posts={instagramPosts} />

        {/* 6 — Cocktail signature */}
        <Cocktails />

        {/* 7 — Serate ed eventi */}
        <Events />

        {/* 8 — Instagram CTA */}
        <InstagramCTA />

        {/* 9 — Contatti, orari, mappa */}
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
