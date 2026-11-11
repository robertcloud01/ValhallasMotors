# Valhallas Motors — Design Agent Instructions

## Project
This is a Next.js 16, React 19, TypeScript, Tailwind 4 automotive portfolio showroom with a Firebase/Cloudinary-backed inventory and admin. Preserve working inventory, authentication, uploads and admin code.

## Design direction
**Automotive editorial luxury.** The visual product is the vehicle itself. Use full-bleed real car photography, distinctive oversized typography, asymmetrical yet aligned grids, warm ivory and near-black grounds, one restrained metallic accent. Avoid repetitive glass cards, neon gradients, glow, generative-looking photographs, giant generic feature cards or gratuitous 3D.

## Taste Skill
Use the design taste skill: https://www.tasteskill.dev/ and https://github.com/Leonxlnx/taste-skill.
Install in your coding-agent environment when supported:
```sh
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```
Read its SKILL.md and relevant copy/system/layout/sections references before redesign. Run its browser inspection/finish gate when Node 22+ and Chromium are available. Respect its distinction between an automotive product site and a software application: real imagery over decorative shaders.

The skill is an **agent development aid** and is not a runtime Next.js package. Do not claim it ran unless it actually did.

## React Bits
Use individual official components from https://reactbits.dev/ where their interactions materially improve the experience. An official adapted AnimatedContent is checked into src/components/react-bits/AnimatedContent.tsx. Keep components lightweight, accessible, and respectful of prefers-reduced-motion; no effect gallery.

## Authenticity
This is an original **concept project** until backed by real inventory/client data. Do not present sample vehicle prices, seller contacts, personal reviews, brand partnerships, awards or physical business address as verified information. Clearly identify demo inventory or mock data. No misleading testimonial carousel.

## Review checklist
- Different composition for every major section; genuine automotive photography as centerpiece.
- 1440, 1024, 768, 390 pixel checks, including overflow/legibility.
- Every nav item, CTA, form, inventory filter and detail link works.
- Preserve SEO, keyboard access, focus-visible states, reduced-motion.
- Benchmark LCP/CLS/INP and inspect network/video payloads before deployment.
- No claim of testing or Lighthouse scores without actual browser evidence.
