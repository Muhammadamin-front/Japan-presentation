# Yaponiya iqtisodiyoti — taqdimot sayti

Iqtisodiyot fanidan PowerPoint o‘rniga ishlatiladigan veb-taqdimot. React + Vite + TypeScript + Tailwind CSS (shadcn tuzilmasi).

## Ishga tushirish

```bash
npm install      # birinchi marta
npm run dev      # http://localhost:5173 manzilini brauzerda oching
```

Taqdimot kuni: Chrome’da oching, **F** — to‘liq ekran, **→ / ←** (yoki pult) — keyingi / oldingi qadam, **?** — yordam oynasi.
Internet kerak: Spline 3D robot va shriftlar tarmoqdan yuklanadi (Fuji surati va bayroqlar loyiha ichida).

Oflayn zaxira sifatida build ham qilib qo‘yish mumkin:

```bash
npm run build && npm run preview   # http://localhost:4173
```

## Tahrirlash

- **Ismingiz / guruhingiz:** `src/lib/data.ts` → `PRESENTER`. Bo‘sh qoldirilsa, ko‘rsatilmaydi.
- **Barcha matn va raqamlar:** `src/lib/data.ts` (manbalar ro‘yxati ham shu yerda).
- **Nutq matni:** `NUTQ.md` — har bir bo‘lim uchun gapiriladigan matn va qachon → bosish kerakligi.

## Tuzilma

```
src/
  components/ui/         # shadcn-uslubidagi komponentlar (promptlardan)
    splite.tsx, spotlight.tsx, card.tsx   ← robot.md (Spline 3D robot)
    ink-basin.tsx        ← Hero: WebGL siyoh havzasi (Hero animate.md tarjimasi)
    parallax-scrolling.tsx ← parallax.md (GSAP + Lenis), Fuji surati
    neon-mesh.tsx        ← kinetic.md
    sonar-grid.tsx       ← sonar-grid-effect.md
    flow-field.tsx       ← motion.md
    aurora-background.tsx← prompt-background-light.md
    card-flip.tsx        ← flip-card.md
    text-roll.tsx        ← 2-prompt.md
    splash-button.tsx    ← button.md
  components/sections/   # 10 ta bo‘lim
  lib/data.ts            # matnlar, raqamlar, manbalar
  lib/scroll.ts          # Lenis, pinned-stage progress, klaviatura navigatsiyasi
```

`/components/ui` papkasi shadcn CLI’ning standart joyi — `npx shadcn@latest add ...` bilan qo‘shiladigan komponentlar ham shu yerga tushadi va `@/components/ui/...` importlari ishlaydi.

## Litsenziyalar

- Fuji surati: Unsplash (Unsplash License).
- Bayroqlar: [circle-flags](https://github.com/HatScripts/circle-flags) (MIT) — `public/flags/LICENSE.md`.
- Komponentlar: kokonutui (MIT), 21st.dev / Aceternity / ibelick / motion-primitives promptlari asosida.
# Japan-presentation
