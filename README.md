# Tina's 24th Birthday - Invitation Website

A static, single-page invitation website (HTML, CSS and JavaScript only).
No build step and no dependencies to install.

## Project structure

```
tina-birthday-site/
├── index.html            Page structure and all text content
├── README.md             This file
└── assets/
    ├── css/
    │   └── style.css     All styles (layout, colors, animations, responsive rules)
    ├── js/
    │   └── main.js       All behavior (countdown, hero animations, confetti, navigation)
    └── img/
        └── favicon.svg   Browser tab icon
```

## Sections

1. **Hero** - invitation headline, animated "24" balloons, floating balloons and spheres, bunting.
2. **Countdown** - live countdown to the party.
3. **When and Where** - ticket-style card with date, arrival time and dress code.
4. **Party Theme** - outfit idea generator (cycles through the themes in order).
5. **A Murder Mystery Awaits** - case file, suspect cards and how the game works.

Extra features: loader, floating navigation with scroll tracking, scroll progress bar,
scroll reveal animations, 3D tilt on the ticket, magnetic buttons, custom cursor,
optional sound toggle (soft chimes), confetti.

## Run locally

Open `index.html` in any modern browser. An internet connection is needed once
to load the web fonts from Google Fonts (Fredoka, Quicksand, Pacifico, Courgette,
Playfair Display). Without it the site falls back to system fonts.

## Customize

- **Party date and time:** `assets/js/main.js`, the `CFG` line near the top of the
  script section (`date: new Date('2026-10-22T18:00:00')`).
- **Texts:** `index.html`.
- **Outfit ideas:** `IDEAS` list in `assets/js/main.js`.
- **Colors and sizes:** `assets/css/style.css`.
- **Personal greeting:** add `?guest=Name` to the page address, for example
  `index.html?guest=Sara` shows "Hi Sara!" at the top.

## Deploy

Upload the whole `tina-birthday-site` folder to any static hosting
(Netlify, Vercel, GitHub Pages, or a regular web server). `index.html` must stay
in the root of the published folder.

## Accessibility and performance notes

- Animations are turned off for visitors who enable "reduce motion" in their system settings.
- Decorative elements are hidden from screen readers.
- The custom cursor appears only on devices with a mouse.

## Browser support

Current versions of Chrome, Edge, Safari and Firefox.
