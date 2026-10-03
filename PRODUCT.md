# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite + TypeScript + Tailwind CSS + shadcn project structure (`src/components/ui`, `src/lib/utils.ts`). Chosen by the user because the supplied animation prompts (`~/Desktop/Prompt/*.md`) are React/shadcn components. Runs locally with `npm run dev` on the presenter's MacBook.

## Users

- **Presenter:** a university/college student giving a 10–15 minute spoken presentation on the economy of Vatican City (the Holy See and the City State) for an economics class, replacing a PowerPoint deck with this website. Drives the page live from their own MacBook with keys or a clicker.
- **Audience:** classmates and the economics teacher in Uzbekistan watching a projected screen from a distance. They read headlines and numbers, not paragraphs.

## Product Purpose

A scroll-driven presentation about how the world's smallest state (0,49 km², ~880 residents, no taxes, no currency of its own) funds a global institution: history, revenue sources (donations, Vatican Museums, IOR bank, APSA real estate), deficits and scandals, a dedicated Uzbekistan ↔ Vatican comparison, and the outlook. Success = the presenter can speak through the topic in order, every key number is readable from the back of the room, and the Uzbekistan comparison is the memorable moment.

## Operating Context

- Projected on a classroom screen/TV, likely 1280–1920px wide, sometimes with washed-out contrast.
- Presenter advances with arrow keys / PageDown / Space (what presentation clickers send).
- Requires internet during the talk only for web fonts; photos, flags and map geometry are local.

## Capabilities and Constraints

- Language: **Uzbek (Latin script)** for all copy. Latin (Civitas Vaticana, Gratias) may appear as accents only.
- Integrates animation prompts from `~/Desktop/Prompt` mapped to sections (see the surface brief).
- Numbers come from public sources (Holy See Secretariat for the Economy, APSA, IOR, Peter's Pence reports, Vatican Museums, Uzbekistan Statistics Committee, Ministry of Economy and Finance, Tourism Committee, UNESCO) and are labelled with year; rounded/approximate values are marked with "~".
- Tone: neutral economic analysis — no religious promotion or judgement.
- The Uzbekistan comparison lives only in its own section (user decision).

## Brand Commitments

None beyond the topic itself (Vatican City). No presenter name supplied — `PRESENTER` in `src/lib/data.ts` stays an editable blank.

## Evidence on Hand

- Photos: Wikimedia Commons (CC0 / CC BY / CC BY-SA / public domain), credited on the sources slide and embedded in each file.
- Maps: Natural Earth (public domain), OpenStreetMap relation 36989 (ODbL).
- Absent: presenter name, group, university name. Do not fabricate.

## Product Principles

1. The speaker leads; the page supports. One idea per screen, big numbers, short sentences the presenter can expand on aloud.
2. Every figure is sourced and dated; approximations are labelled.
3. The comparison with Uzbekistan is the climax — same scale, honest ratios, no false equivalence (the Vatican has no GDP).
4. It must run reliably on a MacBook during a live talk: nothing blocks scrolling, heavy effects pause off-screen.

## Accessibility & Inclusion

Projection readability: high contrast, large type, `prefers-reduced-motion` respected, every chart has a table view.
