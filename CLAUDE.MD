# Lab Projects Page — Claude Code Specification

## Overview

A static GitHub Pages site that lists research lab projects.
Each project is authored as a Markdown file with YAML frontmatter.
A Node.js build script reads those files and generates `index.html`.
GitHub Actions auto-builds and deploys on every push to `main`.

---

## Directory Structure

```
.
├── CLAUDE.md
├── package.json
├── build.js                  # build script: reads projects/ → writes index.html
├── template.html             # HTML shell (header, footer, card scaffold)
├── projects/                 # one .md file per project
│   ├── ghost-fwl.md
│   ├── pulsar-net.md
│   ├── split-cim.md
│   └── fwl-transformer.md
├── assets/
│   ├── css/
│   │   └── style.css
│   └── images/
│       ├── ghost-fwl-teaser.png      # replace with actual teaser
│       ├── pulsar-net-teaser.png
│       ├── split-cim-teaser.png
│       └── fwl-transformer-teaser.png
├── .github/
│   └── workflows/
│       └── deploy.yml
└── index.html                # generated — do not edit manually
```

---

## Project Markdown Format

Each file in `projects/` uses YAML frontmatter followed by a short description body.

### Frontmatter Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✓ | Full paper title |
| `short_title` | string | | Abbreviated title for card header (falls back to `title`) |
| `venue` | string | ✓ | Conference/journal abbreviation, e.g. `CVPR`, `VLSI`, `ICRA` |
| `year` | integer | ✓ | Publication year |
| `status` | string | ✓ | One of: `published`, `accepted`, `under-review`, `preprint` |
| `teaser` | string | ✓ | Path to teaser image relative to repo root, e.g. `assets/images/ghost-fwl-teaser.png` |
| `authors` | list | ✓ | List of `{name: string, me: bool}`. Set `me: true` for lab members to bold. |
| `tags` | list | | Short keyword tags shown as pills, e.g. `[LiDAR, Security, Dataset]` |
| `links` | map | | Any subset of: `paper`, `arxiv`, `code`, `project`, `slides`, `poster`, `video` |
| `order` | integer | | Manual sort order (lower = shown first). Defaults to `year` descending. |

### Example: `projects/ghost-fwl.md`

```markdown
---
title: "Ghost-FWL: A Large-Scale Full-Waveform LiDAR Dataset for Ghost Detection in Autonomous Driving"
short_title: "Ghost-FWL"
venue: CVPR
year: 2026
status: accepted
teaser: assets/images/ghost-fwl-teaser.png
authors:
  - name: "Taro Yamada"
    me: true
  - name: "Hanako Suzuki"
    me: true
  - name: "Collaborator Name"
tags:
  - LiDAR
  - Security
  - Dataset
links:
  arxiv: https://arxiv.org/abs/XXXX.XXXXX
  code: https://github.com/yourlab/ghost-fwl
  paper: https://openaccess.thecvf.com/...
---

A large-scale annotated full-waveform LiDAR dataset for ghost artifact detection,
with 100× more peak-level labels than prior work.
Includes FWL-MAE pretraining and benchmark baselines.
---
```

### Example: `projects/split-cim.md`

```markdown
---
title: "Split-CIM: Breaking the Analog Noise Wall via Dynamic Column Reconfiguration for Vision Transformer Inference"
short_title: "Split-CIM"
venue: VLSI
year: 2026
status: accepted
teaser: assets/images/split-cim-teaser.png
authors:
  - name: "Taro Yamada"
    me: true
  - name: "Hanako Suzuki"
    me: true
tags:
  - CIM
  - Hardware
  - Edge AI
links:
  paper: https://ieeexplore.ieee.org/...
  slides: assets/slides/split-cim-vlsi2026.pdf
---

An analog compute-in-memory architecture achieving 479–567 TOPS/W
by dynamically reconfiguring column groupings to suppress noise,
enabling ImageNet-level Vision Transformer inference on-chip.
---
```

---

## Build Script (`build.js`)

Use the following npm packages (add to `package.json`):
- `gray-matter` — parse YAML frontmatter
- `marked` — render Markdown body to HTML
- `glob` — enumerate `projects/*.md`
- `fs` — read/write files (Node built-in)

### Build Logic

1. Read all `projects/*.md` with `glob`.
2. For each file, parse frontmatter with `gray-matter`. The `content` field is the description.
3. Sort projects: first by `order` (ascending, if set), then by `year` descending.
4. For each project, render the description body with `marked` (strip wrapping `<p>` for inline use).
5. Read `template.html`.
6. Replace the placeholder `<!--CARDS-->` in `template.html` with the generated card HTML.
7. Write the result to `index.html`.

### Card HTML Structure

Each card should use this structure (classes defined in `style.css`):

```html
<article class="project-card">
  <div class="card-teaser">
    <img src="{teaser}" alt="{title} teaser" loading="lazy" />
  </div>
  <div class="card-body">
    <div class="card-meta">
      <span class="badge badge-venue badge-{venue_lower}">{venue} {year}</span>
      <span class="badge badge-status badge-{status}">{status_label}</span>
    </div>
    <h2 class="card-title">{short_title or title}</h2>
    <p class="card-authors">{authors_html}</p>
    <p class="card-description">{description_html}</p>
    <div class="card-tags">
      <!-- for each tag -->
      <span class="tag">{tag}</span>
    </div>
    <div class="card-links">
      <!-- for each link, render a shields.io-style two-part badge -->
      <a href="{url}" class="link-badge link-{type}" target="_blank" rel="noopener">
        <span class="badge-left">{icon_svg}</span>
        <span class="badge-right">{label}</span>
      </a>
    </div>
  </div>
</article>
```

Author HTML: bold authors where `me: true` with `<strong>`.
Status labels: `published` → "Published", `accepted` → "Accepted", `under-review` → "Under Review", `preprint` → "Preprint".
Venue badge color: use a CSS class per venue string lowercased (e.g. `badge-cvpr`, `badge-vlsi`, `badge-icra`, `badge-ndss`, `badge-neurips`).

### Link Badges (shields.io style)

Render each link as a two-part pill badge — a colored left lozenge with an icon, and a right lozenge with the label — matching the shields.io visual language. Use inline SVG icons from Simple Icons (embed the SVG path directly, no external dependency).

Structure per badge:

```html
<a href="{url}" class="link-badge link-{type}" target="_blank" rel="noopener" aria-label="{label}">
  <span class="badge-icon">{inline_svg}</span>
  <span class="badge-label">{label}</span>
</a>
```

Badge definitions:

| key | label | left color | icon (Simple Icons name) |
|---|---|---|---|
| `paper` | Paper | `#b31b1b` | PDF file icon (custom: document with "PDF" text) |
| `arxiv` | arXiv | `#b31b1b` | arxiv |
| `code` | Code | `#181717` | github |
| `project` | Project Page | `#4A90D9` | globe / link icon |
| `slides` | Slides | `#FF6B35` | custom slide icon |
| `poster` | Poster | `#6B46C1` | custom poster icon |
| `video` | Video | `#FF0000` | youtube |

SVG icon sources — embed these paths inline in `build.js` as a constant map:
- GitHub: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`
- arXiv: use a simple "ar" text SVG or the arXiv logomark path
- Globe/link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
- PDF: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8.5 15.5h-1v-4h1.3c.8 0 1.2.5 1.2 1.1 0 .7-.5 1.1-1.3 1.1H8.5v1.8zm0-2.6h.2c.3 0 .5-.1.5-.4 0-.3-.2-.4-.5-.4H8.5v.8zm3.5 2.6h-1v-4h1c1.1 0 1.8.7 1.8 2s-.7 2-1.8 2zm0-3.2h-.1v2.4h.1c.5 0 .9-.3.9-1.2 0-.9-.4-1.2-.9-1.2zm3.5 3.2h-1v-4h2.3v.8H15v.9h1.2v.7H15v1.6z"/></svg>`
- Slides: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 3a1 1 0 0 0 0 2h1v11a2 2 0 0 0 2 2h4l-1 2H7a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2h-1l-1-2h4a2 2 0 0 0 2-2V5h1a1 1 0 1 0 0-2H2zm3 2h14v11H5V5z"/></svg>`

---

## `template.html`

A complete HTML document shell with:
- `<link rel="stylesheet" href="assets/css/style.css">` in `<head>`
- A `<header>` section with lab name and a one-line description (hardcode placeholder text, easy to edit)
- A filter bar with buttons for each tag (All, LiDAR, CIM, Security, Hardware, …) — implemented with vanilla JS in a `<script>` block at the bottom; clicking a filter shows/hides cards by matching `data-tags` attribute on each `<article>`
- A `<main class="project-grid">` containing `<!--CARDS-->`
- A `<footer>` with lab name and GitHub repo link

Add `data-tags="{comma-separated tags}"` attribute to each `<article class="project-card">` for the JS filter to work.

---

## `assets/css/style.css`

Design requirements:
- Clean, academic aesthetic. White background, dark text.
- Max content width: 1100px, centered.
- Project grid: CSS Grid, `repeat(auto-fill, minmax(320px, 1fr))`, gap 2rem.
- Card: white background, 1px solid border (`#e0e0e0`), border-radius 10px, subtle box-shadow on hover.
- Teaser image: 16:9 aspect ratio, `object-fit: cover`, full card width, border-radius top corners.
- Venue badges: distinct background colors per venue. Suggested palette:
  - CVPR/ICCV/ECCV: blue (`#1a56db` bg, white text)
  - NeurIPS/ICML/ICLR: purple (`#7e3af2` bg, white text)
  - VLSI/ISSCC/CICC: teal (`#0694a2` bg, white text)
  - ICRA/IROS: green (`#057a55` bg, white text)
  - NDSS/S&P/CCS: red (`#c81e1e` bg, white text)
  - default/other: gray
- Status badge (under-review, preprint): muted orange outlined pill.
- Tag pills: light gray background, small font.
- Link badges: shields.io-style two-part pill. `.badge-icon` has the type-specific background color, `.badge-label` has a slightly lighter shade of the same color. Both parts use `display: inline-flex; align-items: center`. The whole `<a>` is `display: inline-flex; border-radius: 4px; overflow: hidden; text-decoration: none; font-size: 12px; font-weight: 600; line-height: 1`. Icon part width ~28px, padding 0 6px; label part padding 0 8px. All text white. Hover: 10% darker via `filter: brightness(0.9)`. SVG icons are 14×14px, fill white.
- Filter bar: row of pill buttons above the grid; active filter highlighted.
- Responsive: single column on mobile (< 640px).
- No external fonts or icon libraries (keep it dependency-free for offline use).

---

## `package.json`

```json
{
  "name": "lab-projects-page",
  "version": "1.0.0",
  "scripts": {
    "build": "node build.js",
    "dev": "node build.js && npx serve ."
  },
  "dependencies": {
    "glob": "^10.0.0",
    "gray-matter": "^4.0.3",
    "marked": "^12.0.0"
  }
}
```

---

## GitHub Actions (`.github/workflows/deploy.yml`)

Trigger: push to `main`.

Steps:
1. Checkout
2. Setup Node.js 20
3. `npm ci`
4. `npm run build`
5. Deploy the repo root (including generated `index.html` and `assets/`) to GitHub Pages using `actions/deploy-pages` or `peaceiris/actions-gh-pages`.

The generated `index.html` and `assets/` should be the deployment artifact.
Add `index.html` to `.gitignore` so it is never committed manually.

---

## Sample Projects to Populate

Create the following four starter files in `projects/`:

1. `ghost-fwl.md` — Ghost-FWL, CVPR 2026, tags: LiDAR / Security / Dataset
2. `pulsar-net.md` — PULSAR-Net (LiDAR jamming defense via full-waveform sensing), CVPR 2026, tags: LiDAR / Security
3. `split-cim.md` — Split-CIM (Dynamic Column Reconfiguration for ViT inference), VLSI 2026, tags: CIM / Hardware / Edge AI
4. `fwl-transformer.md` — FWL Transformer efficiency (FWL-ToPM token pruning/merging + FWLAug), NeurIPS 2025 (status: under-review), tags: LiDAR / Transformer / Efficiency

Use placeholder `assets/images/*-teaser.png` paths. For teaser images, generate simple colored SVG placeholders (800×450px, solid color with project short title as text) so the page renders correctly before real images are added.

---

## Implementation Order

1. `package.json` + `npm install`
2. `projects/*.md` — four sample files
3. `assets/css/style.css`
4. `template.html`
5. `build.js`
6. Run `npm run build`, verify `index.html` renders correctly in browser
7. Generate SVG teaser placeholders in `assets/images/`
8. `.github/workflows/deploy.yml`
9. `.gitignore` (add `index.html`, `node_modules/`)

---

## Notes

- Never edit `index.html` directly — it is fully generated.
- To add a project: create a new `.md` file in `projects/`, run `npm run build`.
- To change layout or style: edit `style.css` or `template.html`, rebuild.
- teaser images should be 1200×675px (16:9) for best display.
- The filter JS must be inline in `template.html` (no separate JS file needed for now).

---

## Local Build Workaround (Windows + Google Drive)

**Problem:** This repo lives under `G:\マイドライブ\...` (Google Drive). Google Drive sync corrupts `node_modules` by zeroing out files (e.g. `gray-matter/package.json` becomes 0 bytes), making `node build.js` fail with `ERR_INVALID_PACKAGE_CONFIG`.

**Workaround:** Build in a temp directory outside Google Drive, then copy `index.html` back.

```powershell
$tmp = "C:\Users\kyosh\AppData\Local\Temp\labproject-build"
New-Item -ItemType Directory -Force $tmp | Out-Null
Copy-Item "G:\マイドライブ\010_Codes\LabProject\build.js"      "$tmp\build.js"
Copy-Item "G:\マイドライブ\010_Codes\LabProject\package.json"   "$tmp\package.json"
Copy-Item "G:\マイドライブ\010_Codes\LabProject\template.html"  "$tmp\template.html"
Copy-Item -Recurse -Force "G:\マイドライブ\010_Codes\LabProject\projects" "$tmp\projects"
Copy-Item -Recurse -Force "G:\マイドライブ\010_Codes\LabProject\assets"   "$tmp\assets"
Set-Location $tmp
npm install
node build.js
Copy-Item "$tmp\index.html" "G:\マイドライブ\010_Codes\LabProject\index.html" -Force
```

Then commit and push `index.html` so GitHub Pages picks it up.