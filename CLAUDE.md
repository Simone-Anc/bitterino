@AGENTS.md

# Regole di progetto — Bitterino

## Stile visivo — "Solare" (definitivo)

Il design system scelto è **Mockup A — Solare**: sfondo crema, accenti terracotta, caldo e italiano.

### Palette colori (con rapporti contrasto WCAG verificati)
| Variabile CSS | Hex | Uso |
|---|---|---|
| `--cream` | `#F5EDD6` | Sfondo principale |
| `--cream-mid` | `#EDE4C8` | Card, sezioni alternate |
| `--cream-dark` | `#D9CEAC` | Bordi, separatori |
| `--brown-1` | `#1A0A02` | Testo primario — 16.5:1 su cream ✓ |
| `--brown-2` | `#5A3520` | Testo secondario — 8.2:1 su cream ✓ |
| `--brown-3` | `#7A4E30` | Testo muted — 5.5:1 su cream ✓ |
| `--terra` | `#C4622A` | Solo testo grande (≥24px) e decorativo — 3.31:1 su cream |
| `--terra-ui` | `#8B3A18` | Testo piccolo terracotta, sfondo bottoni — 6:1 su cream ✓ |
| `--yellow` | `#F0C040` | Accento sparso, solo decorativo |

**Regola contrasto**: `--terra` (#C4622A) può essere usato SOLO per titoli grandi (≥24px) o elementi decorativi. Per testo piccolo in terracotta usare `--terra-ui` (#8B3A18).

### Tipografia
- **Display/titoli**: Cormorant Garamond, `font-display`, peso 300–600
- **Body/UI/label**: Jost, `font-sans-alt`, peso 200–500
- **Label uppercase**: Jost 10–11px, `tracking-[0.4em]`, colore `--terra-ui` o `--brown-3`

### Layout
- Hero: split 50/50 desktop (testo sx, immagine dx), stacked su mobile
- Sezioni alternate: `--cream` e `--cream-mid`
- Footer: dark brown (`#2E1508`) con testo cream

## Accessibilità (WCAG 2.1 AA — obbligatorio)

Ogni componente UI scritto o modificato deve rispettare le linee guida WCAG 2.1 livello AA:

- **Contrasto colori**: rapporto minimo 4.5:1 per testo normale, 3:1 per testo grande (≥18px bold o ≥24px) — verificare sempre con la palette terracotta/crema del brand
- **Testo alternativo**: ogni `<Image>` deve avere `alt` descrittivo; immagini decorative usano `alt=""`
- **Focus visibile**: tutti gli elementi interattivi devono avere outline visibile al focus (no `outline: none` senza sostituto)
- **Navigazione da tastiera**: tab order logico, nessun focus trap involontario
- **ARIA**: usare `aria-label`, `aria-expanded`, `role` dove il significato semantico non è chiaro dall'HTML nativo
- **Semantica HTML**: usare tag nativi (`<button>`, `<nav>`, `<main>`, `<section>`, `<header>`) al posto di `<div>` generici dove possibile
- **Motion**: rispettare `prefers-reduced-motion` per tutte le animazioni Framer Motion
- **Form**: ogni `<input>` e `<textarea>` deve avere `<label>` associata — il placeholder da solo non basta
