# sanchez0523.github.io

Personal blog — **sanchez() · Engineer's Lab Notebook**.

Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Quick start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # output to dist/
npm run preview
```

## Writing a post

Create `src/content/posts/{NNNN-slug}.md`:

```md
---
serial: 4
title: Post title here
description: 한 문장 요약
date: 2026-04-20
category: build-log    # build-log | deep-dive | decision
tags: [go, mqtt]
---

Content here.
```

Reading time is computed automatically.

## Design system

- Font: Inter + JetBrains Mono + Pretendard (Korean fallback)
- Palette: 5 neutrals + single amber accent
- Light mode default with dark toggle (localStorage persist)

Signature:

- Logomark: `sanchez()`
- Motif: amber `●` dot
- Tagline: *build small. ship slow.*
- Serial: `#0001` monospace counter
- Signoff: `— / #num / seoul / sanchez() / ●`