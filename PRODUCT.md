# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite + TypeScript + Tailwind CSS + shadcn project structure (`src/components/ui`, `src/lib/utils.ts`). Chosen by the user because the supplied animation prompts (`~/Desktop/Prompt/*.md`) are React/shadcn components. Runs locally with `npm run dev` on the presenter's MacBook.

## Users

- **Presenter:** a university/college student giving a 10–15 minute spoken presentation on the Japanese economy for an economics class, replacing a PowerPoint deck with this website. Drives the page live from their own MacBook, scrolling or pressing keys while speaking.
- **Audience:** classmates and the economics teacher watching a projected screen from a distance. They read headlines and numbers, not paragraphs.

## Product Purpose

A scroll-driven presentation website about Japan's economy: post-war history, key figures, industry, robotics and its economic importance, current problems, and the outlook. Success = the presenter can speak through the whole topic in order, every key number is readable from the back of the room, and the robotics section stands out as the memorable moment.

## Operating Context

- Projected on a classroom screen/TV, likely 1280–1920px wide, sometimes with washed-out contrast.
- Presenter advances with trackpad scroll or keyboard (arrow keys / PageDown / Space — also what presentation clickers send).
- Requires internet during the talk for the Spline 3D robot scene and web fonts.

## Capabilities and Constraints

- Language: **Uzbek (Latin script)** for all copy. Japanese words (日本, ロボット, ものづくり) may appear as accents only.
- Must integrate the user's supplied components: Spline 3D robot + Spotlight + Card (robot.md, required), plus the animation prompts in `~/Desktop/Prompt` mapped to sections.
- Numbers must come from public sources (IMF, World Bank, IFR World Robotics, Statistics Bureau of Japan, Cabinet Office, JNTO, Ministry of Finance) and be labelled with year; rounded/approximate values are marked with "~".

## Brand Commitments

None beyond the topic itself (Japan). No presenter name supplied yet — leave a clearly editable placeholder rather than inventing one.

## Evidence on Hand

- No images or brand assets supplied. The Spline scene URL from robot.md is the only external visual asset.
- Absent: presenter name, group, university name. Do not fabricate.

## Product Principles

1. The speaker leads; the page supports. One idea per screen, big numbers, short sentences the presenter can expand on aloud.
2. Every figure is sourced and dated; approximations are labelled.
3. Robotics is the climax — tie it explicitly to economics (labour shortage, productivity, exports), not just "cool tech".
4. It must run reliably on a MacBook during a live talk: nothing blocks scrolling, heavy effects pause off-screen.

## Accessibility & Inclusion

Projection readability: high contrast, large type, `prefers-reduced-motion` respected.
