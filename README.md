# Vatikan iqtisodiyoti — taqdimot sayti

Iqtisodiyot fanidan PowerPoint o‘rniga ishlatiladigan veb-taqdimot. React + Vite + TypeScript + Tailwind CSS (shadcn tuzilmasi).

## Ishga tushirish

```bash
npm install      # birinchi marta
npm run dev      # http://localhost:5173 manzilini brauzerda oching
```

Taqdimot kuni: Chrome’da oching, **F** — to‘liq ekran, **→ / ←** (yoki pult) — keyingi / oldingi qadam, **?** — yordam oynasi.
Manzil satridagi `#bo‘lim` taqdimotchi bilan yuradi: sahifa yangilansa, o‘sha bo‘limga qaytadi.
Internet faqat shriftlar uchun kerak: suratlar, bayroqlar va xarita chegaralari loyiha ichida.

Oflayn zaxira:

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
  components/ui/            # promptlardan olingan komponentlar
    fountain-square.tsx     ← Hero: kursor «shamol», bosish — yangi favvora (Hero animate.md tarjimasi)
    parallax-scrolling.tsx  ← parallax.md (GSAP + Lenis): gumbaz va bog‘lar
    card-flip.tsx           ← flip-card.md: to‘rt daromad manbai
    coverflow.tsx           ← prompt.md (3D coverflow): Vatikan muzeylari
    flow-field.tsx          ← motion.md: favvora oqimlari
    aurora-background.tsx   ← prompt-background-light.md: hisoblangan parter naqshi
    scale-zoom.tsx          ← O‘zbekiston → Toshkent → Vatikan, bitta masshtabda
    text-roll.tsx           ← 2-prompt.md · splash-button.tsx ← button.md
  components/sections/      # 9 ta bo‘lim
  lib/data.ts               # matnlar, raqamlar, manbalar
  lib/geo.ts                # xarita geometriyasi (Natural Earth, OpenStreetMap)
  lib/scroll.ts             # Lenis, pinned-stage progress, klaviatura navigatsiyasi, URL hash
```

## Litsenziyalar

- Suratlar: Wikimedia Commons — har birining muallifi va litsenziyasi «Manbalar» slaydida va fayl ichida yozilgan.
- Bayroqlar: [circle-flags](https://github.com/HatScripts/circle-flags) (MIT) — `public/flags/LICENSE.md`.
- Xaritalar: Natural Earth (jamoat mulki); Vatikan chegarasi © OpenStreetMap hissadorlari (ODbL).
- Komponentlar: kokonutui (MIT), 21st.dev / Osmo / paper-design / motion-primitives promptlari asosida.
# Vatican-economy-website
