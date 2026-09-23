---
phase: 01
name: Website Revamp
type: plan
status: planned
created: 2026-08-25
granularity: standard
mode: tracer-first
context_refs:
  - .planning/PROJECT.md
  - .planning/ROADMAP.md
  - .planning/phase-01-website-revamp/CONTEXT.md
requirements: [R1, R2, R3, R4, R5, R6, R7]
files_modified:
  - package.json
  - astro.config.mjs
  - .github/workflows/*
  - src/**
  - public/**
  - staticwebapp.config.json
  - sitemap.xml
---

# Phase 1 Plan — Website Revamp

## Objective

Migrate `innovaitionedge.com` from a single static HTML page to a 6-page Astro site deployed via Azure SWA + GitHub Actions, with a Power Automate-backed contact form, Microsoft Bookings integration, and Lighthouse ≥ 95 / WCAG 2.1 AA compliance — at zero incremental cost.

## Approach — Tracer-First

The **tracer slice (Wave 1)** delivers a working end-to-end pipeline: `git push` → Astro build → GitHub Actions → SWA staging URL renders a real Home page component. Nothing else expands until that slice is green. This surfaces integration risk (Astro + SWA config compatibility, GitHub Actions build) before it can compound with content work.

After the tracer proves green, waves expand:
- Wave 2: design system + Home page content
- Wave 3: services (overview + 4 detail pages)
- Wave 4: About + Contact + Power Automate flow + Bookings embed
- Wave 5: SEO + analytics + perf/a11y pass + production cutover

## Wave Structure

| Wave | Tasks | Parallelizable | Ships |
|---|---|---|---|
| 1 (tracer) | T1, T2, T3 | sequential | Working staging URL with a real Home stub |
| 2 (foundation) | T4, T5, T6 | T5+T6 parallel after T4 | Design system + finished Home page |
| 3 (services) | T7, T8 | T8 subtasks parallel | Services overview + 4 service pages |
| 4 (contact) | T9, T10, T11 | T9+T10 parallel; T11 after both | Working contact form + Bookings embed |
| 5 (cutover) | T12, T13, T14 | T12+T13 parallel; T14 last | SEO/analytics/perf done; production live |

---

## Wave 1 — Tracer Slice (integration risk first)

### T1 — Astro project scaffold *(auto)*

**Action:** Initialize Astro in the current repo root, preserving `staticwebapp.config.json`, `robots.txt`, `sitemap.xml`, and `assets/img/*` (favicons + logo).

**Steps:**
1. `npm create astro@latest -- --template minimal --typescript strict --no-install .` (into current dir; overwrite conflicts manually)
2. Move current `assets/img/logo.png`, `assets/img/favicon.png`, `assets/img/favicon-large.png` to `public/`
3. Delete the current `index.html`, `assets/css/styles.css`, `assets/js/script.js` (superseded)
4. Preserve `staticwebapp.config.json` at repo root (SWA picks it up from the build output dir; also copy to `public/` so it's included in `dist/`)
5. Preserve `robots.txt` and `sitemap.xml` in `public/`
6. `npm install`
7. Add `.gitignore` entries for `node_modules/`, `dist/`, `.astro/`
8. Commit: `chore: scaffold Astro project`

**Verifies:** `npm run dev` serves the default Astro page at `http://localhost:4321`; `npm run build` produces `dist/` with `index.html`.

**needs:** none
**creates:** `package.json`, `astro.config.mjs`, `src/pages/index.astro`, `public/*`, `tsconfig.json`

---

### T2 — GitHub Actions → SWA deploy for Astro *(auto)*

**Action:** Adapt the existing GitHub Actions workflow so pushes to `main` build the Astro site and deploy `dist/` to Azure SWA.

**Steps:**
1. Read existing `.github/workflows/*.yml` — identify the SWA deploy action and API token secret name
2. Modify the SWA deploy step: set `app_location: "/"`, `output_location: "dist"`, `app_build_command: "npm run build"`
3. Ensure Node 20+ setup step is present before the SWA action
4. Push branch → verify GitHub Action runs green and deploys to the SWA preview URL (per-PR preview environment)
5. Commit: `ci: adapt SWA workflow for Astro build`

**Verifies:** PR triggers a preview build; preview URL loads the default Astro page.

**needs:** T1
**creates:** updated `.github/workflows/*.yml`

---

### T3 — Home page stub renders on staging *(checkpoint:human-verify)*

**Action:** Replace default Astro template with a minimal but real `src/pages/index.astro` that imports the brand logo, uses Inter font, and displays the tagline. Ship it to a staging PR to prove the pipeline delivers real content end-to-end.

**Steps:**
1. Create `src/layouts/BaseLayout.astro` — HTML shell, `<head>` with Inter font preconnect + Google Fonts link, viewport meta
2. Create `src/pages/index.astro` using `BaseLayout` — H1 "Pioneering the Future of Work with Microsoft 365 and AI", tagline paragraph, brand logo `<img>` from `/logo.png`
3. Open PR → verify SWA preview URL renders the stub correctly on mobile + desktop
4. Merge to `main` after human verification

**Checkpoint prompt:** "Open the preview URL on both mobile and desktop. Confirm: logo displays, Inter font loads, H1 is readable, page has no console errors. Type 'approved' or describe issues."

**Verifies:** Preview URL renders correctly; user confirms visually.

**needs:** T2
**creates:** `src/layouts/BaseLayout.astro`, updated `src/pages/index.astro`

---

## Wave 2 — Design System + Home

### T4 — Design tokens + global styles *(auto)*

**Action:** Establish design tokens (color, type, spacing, radii, shadows) and global stylesheet. Fixes WCAG contrast issues by demoting orange to accent-only and using charcoal for headings.

**Steps:**
1. Create `src/styles/tokens.css` with CSS custom properties:
   - `--color-primary: #F48027` (orange — accent only)
   - `--color-primary-600: #E35F00`
   - `--color-ink: #0F172A` (charcoal — headings, primary text)
   - `--color-body: #334155` (slate-700 — body text)
   - `--color-muted: #64748B` (slate-500 — captions)
   - `--color-border: #E5E7EB`
   - `--color-surface: #FFFFFF`
   - `--color-surface-alt: #F8FAFC`
   - `--font-body: 'Inter', system-ui, sans-serif`
   - `--font-display: 'Space Grotesk', 'Inter', sans-serif` (final choice can flip to Manrope in T5)
   - Spacing scale, radii, shadow tokens
2. Create `src/styles/global.css` — reset, base typography, focus styles (visible ring for a11y), scroll-margin for anchor links
3. Import both into `BaseLayout.astro`
4. Update `BaseLayout` to preconnect + load display font from Google Fonts
5. Commit: `feat(design): add design tokens and global styles`

**Verifies:** Rendered pages use charcoal headings; orange only appears on accent elements. axe-core dev extension shows no contrast violations on any current page.

**needs:** T3
**creates:** `src/styles/tokens.css`, `src/styles/global.css`, updated `src/layouts/BaseLayout.astro`

---

### T5 — Reusable component library *(auto)*

**Action:** Build the reusable Astro components used across all 6 pages: `SiteHeader`, `SiteFooter`, `Button`, `Card`, `Section`, `Tag`, `CtaBanner`.

**Steps:**
1. `src/components/SiteHeader.astro` — sticky header, brand logo left, nav right (Home / Services / About / Contact), mobile hamburger with slide-down menu, CTA "Book a call" button
2. `src/components/SiteFooter.astro` — 3 columns (About one-liner + logo, Services links, Contact block), copyright with dynamic year
3. `src/components/Button.astro` — variants: `primary` (solid orange), `secondary` (outline charcoal), `ghost` (text-only). Props: `variant`, `href`, `size`. **Fixes current broken `.btn-ghost`.**
4. `src/components/Card.astro` — icon slot + heading + body + optional CTA link; hover state (shadow lift)
5. `src/components/Section.astro` — layout wrapper with consistent padding, optional `variant="alt"` for alternating surface color
6. `src/components/Tag.astro` — small pill for tech-stack tags
7. `src/components/CtaBanner.astro` — full-width banner ("Ready to modernize your Microsoft 365 workplace?" + Book a call button)
8. Refactor `src/pages/index.astro` to consume `SiteHeader` + `SiteFooter`
9. Commit: `feat(design): reusable component library`

**Verifies:** Components render on the Home stub; keyboard tab order works; mobile menu opens/closes; all buttons have visible focus rings.

**needs:** T4
**creates:** 7 components in `src/components/`, updated `src/pages/index.astro`

---

### T6 — Home page content + hero *(auto, checkpoint at end)*

**Action:** Build the full Home page — hero, value proposition, "What We Do" 4-card grid, "How We Work" methodology (Discover → Prototype → Ship → Enable), CTA banner. Replace 2.2 MB `cloud.png` with SVG or optimized WebP hero.

**Steps:**
1. Replace `public/cloud.png` with either an SVG hero illustration (M365 ecosystem abstract) OR an Astro `<Image>` optimized WebP under 100 KB
2. Build `src/pages/index.astro` sections:
   - Hero: H1, subheading, primary CTA "Book a call" + secondary "Explore services", tech tag row
   - What We Do: 4-card grid linking to service pages
   - How We Work: 4-step methodology with icons
   - Featured outcomes: 3 sample engagement patterns (not case studies — patterns)
   - CTA banner
3. Add JSON-LD Organization schema block (port from current site, keep current data)
4. Wire all internal links to `/services/*` (placeholder pages exist as empty stubs from T7 or use `#` for now)
5. **Checkpoint:** user reviews Home page on staging URL

**Checkpoint prompt:** "Review the Home page on staging. Confirm: hero renders in <1.5s, all 4 methodology steps display, contact CTA is prominent, no visual bugs on mobile/tablet/desktop. Type 'approved' or describe issues."

**Verifies:** Lighthouse mobile ≥ 95 on Home; visual inspection passes; JSON-LD validates in Google Rich Results Test.

**needs:** T5
**creates:** completed `src/pages/index.astro`, `public/hero.svg` (or `hero.webp`)

---

## Wave 3 — Service Pages

### T7 — Services overview page *(auto)*

**Action:** Build `/services` — the hub page linking to the 4 detail pages. Introduces the M365 ecosystem framing and routes to each service.

**Steps:**
1. Create `src/pages/services/index.astro`
2. Sections: intro H1 + lead paragraph, 4-card grid (each card = one service, linking to detail page), "How we engage" (repeats methodology CTA), CTA banner
3. Add breadcrumb component (`Home > Services`) — inline in this page, extract to component if reused
4. Add page meta (title, description) and JSON-LD Service schema
5. Commit: `feat(services): overview page`

**Verifies:** `/services` loads; all 4 cards link to correct routes; meta shows in view-source.

**needs:** T6
**creates:** `src/pages/services/index.astro`

---

### T8 — 4 service detail pages *(auto — can run as 4 parallel subtasks)*

**Action:** Build the 4 service detail pages. Each follows the same template: H1, 60-word summary, "The problem we solve", "How we approach it" (4-step process specific to the service), "Tech we use" (real M365 primitives), "Sample engagement pattern", CTA to book a call.

**Subtasks (parallelizable):**

**T8.1 — Microsoft 365 Modernization** → `src/pages/services/microsoft-365-modernization.astro`
- Tech to name: Copilot for Microsoft 365, Copilot Studio, Purview, SharePoint Premium, Microsoft Graph, adoption tooling
- Sample pattern: "4-week Copilot pilot for a 200-person org: governance model, prompt library, adoption playbook, exec dashboard"

**T8.2 — SharePoint & Teams Apps** → `src/pages/services/sharepoint-teams-apps.astro`
- Tech to name: SPFx (SharePoint Framework), Teams Toolkit, Adaptive Cards, Microsoft Graph, Teams Meeting Apps, Fluent UI React
- Sample pattern: "Custom Teams app for a 500-person operations team: workflow embedded in the tab, SharePoint list backend, deployed org-wide"

**T8.3 — Power Platform Automation** → `src/pages/services/power-platform-automation.astro`
- Tech to name: Power Automate, Power Apps, Dataverse, AI Builder, Copilot Studio, Power Fx
- Sample pattern: "Approval automation across 12 departments: Power Automate flows + Power Apps forms + Dataverse; replaced 40+ SharePoint list workflows"

**T8.4 — Azure AI & Agents** → `src/pages/services/azure-ai-agents.astro`
- Tech to name: Azure AI Foundry, Azure OpenAI, Azure AI Search (RAG), Semantic Kernel, Copilot Studio agents, Azure Functions, Azure Container Apps
- Sample pattern: "AI knowledge agent over 20 GB of internal SharePoint docs: RAG via Azure AI Search, chat interface in Teams, guardrails via Azure AI Content Safety"

**Common steps for each subtask:**
1. Create page file with `BaseLayout`
2. Fill all 5 sections with content
3. Add page meta + JSON-LD Service schema
4. Add "Related services" links at bottom (link to the other 3)
5. Commit: `feat(services): {service-name} detail page`

**Verifies:** All 4 pages load; nav highlights active section; internal cross-links work; each mentions real M365 primitives (proof of practitioner depth).

**needs:** T7
**creates:** 4 files under `src/pages/services/`

---

## Wave 4 — About + Contact + Backend

### T9 — About / Approach page *(auto)*

**Action:** Build `/about` — no team section (per locked decision). Focuses on founder-led origin story, methodology deep-dive, and Coimbatore roots.

**Steps:**
1. Create `src/pages/about.astro`
2. Sections:
   - Hero: "About InnovAItion Edge" + one-sentence positioning
   - Origin story: 2–3 paragraphs, founder voice, why start in the M365 space, what problem we keep seeing
   - How we work: expand "Discover → Prototype → Ship → Enable" methodology with concrete deliverables under each step
   - Where we work: "Rooted in Coimbatore, building for the world" — 1 short paragraph
   - CTA banner
3. Page meta + JSON-LD Organization schema (extend home's)
4. Commit: `feat(about): about page`

**Verifies:** `/about` loads; content reads as founder-led (first-person plural), not corporate boilerplate.

**needs:** T6
**creates:** `src/pages/about.astro`

---

### T10 — Power Automate flow for contact form *(checkpoint:human-action — flow creation, then auto)*

**Action:** Build the Power Automate flow that receives form submissions and emails them to `contact@innovaitionedge.com`. This runs in the user's M365 tenant.

**Steps (human-action portion):**
1. User signs in to `make.powerautomate.com` with `naveenprasath.s@innovaitionedge.com`
2. Create new automated cloud flow → trigger: **"When an HTTP request is received"**
3. Define request body JSON schema:
   ```json
   {
     "type": "object",
     "properties": {
       "name": {"type": "string"},
       "email": {"type": "string"},
       "company": {"type": "string"},
       "message": {"type": "string"}
     },
     "required": ["name", "email", "message"]
   }
   ```
4. Add action: **Office 365 Outlook → Send an email (V2)**
   - To: `contact@innovaitionedge.com`
   - Subject: `New website enquiry from @{triggerBody()?['name']}`
   - Body: HTML template with name, email, company, message, timestamp
   - Reply-To: `@{triggerBody()?['email']}`
5. Save flow → copy the generated HTTP POST URL
6. Store the URL as a repository secret in GitHub: `POWER_AUTOMATE_CONTACT_URL` (Settings → Secrets → Actions)
7. Test with a `curl` POST from local machine → verify email arrives at `contact@innovaitionedge.com`

**Checkpoint prompt:** "Confirm: (1) flow is created and saved, (2) HTTP URL is copied to GitHub secret `POWER_AUTOMATE_CONTACT_URL`, (3) test curl POST delivered an email to your inbox. Type 'done' to continue."

**needs:** none (parallel with T9)
**creates:** Power Automate flow (external), `POWER_AUTOMATE_CONTACT_URL` GitHub secret

---

### T11 — Contact page + form + Bookings embed *(auto, checkpoint at end)*

**Action:** Build `/contact` — the working contact form (submits to Power Automate URL) plus Microsoft Bookings embed for direct scheduling.

**Steps:**
1. **Prerequisite:** user creates a Microsoft Bookings page for discovery calls (30-min slot, availability Mon–Fri) at `outlook.office.com/bookwithme/…`. Note the public URL.
2. Because the Power Automate URL is a secret, it can't ship in client-side JS directly. Two options — pick one:
   - **Option A (recommended):** Add a tiny Azure SWA API function (`api/contact.ts`) that reads the URL from env and proxies the POST. SWA's `api/` folder is auto-deployed as an Azure Function.
   - **Option B:** Inject the URL at build time via a public build-time env var (accepts that the URL is visible in page source; Power Automate URL is unauthenticated anyway, so exposure risk is spam only)
3. Create `api/contact.ts`:
   ```typescript
   export async function onRequestPost({ request, env }) {
     const body = await request.json();
     if (!body.name || !body.email || !body.message) {
       return new Response("Missing fields", { status: 400 });
     }
     const r = await fetch(env.POWER_AUTOMATE_CONTACT_URL, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(body),
     });
     return new Response(r.ok ? "ok" : "error", { status: r.ok ? 200 : 502 });
   }
   ```
4. Wire the env var `POWER_AUTOMATE_CONTACT_URL` in SWA config (Azure Portal → SWA → Configuration)
5. Create `src/pages/contact.astro`:
   - Hero: "Let's talk"
   - Two-column layout: form on left, "Prefer to book directly?" card on right with Bookings embed (iframe or link-out)
   - Form fields: Name, Email, Company (optional), Message
   - Client-side JS in Astro `<script>` block: intercept submit, POST JSON to `/api/contact`, show success/error inline (no `alert()`)
   - Success state replaces form with "Thanks — we'll respond within 1 business day"
6. Add page meta + JSON-LD ContactPoint schema
7. **Checkpoint:** end-to-end test — submit form on staging, confirm email received

**Checkpoint prompt:** "Submit the contact form on staging with real inputs. Confirm: (1) success message appears, (2) email arrives at contact@innovaitionedge.com within 30 seconds, (3) Bookings link opens the scheduling flow. Type 'approved' or describe issues."

**needs:** T5 (components), T10 (Power Automate URL secret)
**creates:** `api/contact.ts`, `src/pages/contact.astro`, SWA env var configured

---

## Wave 5 — SEO, Analytics, Perf, Cutover

### T12 — SEO + JSON-LD + sitemap *(auto)*

**Action:** Per-page meta tags, structured data, expanded sitemap, robots.txt review.

**Steps:**
1. Install `@astrojs/sitemap` integration → configure in `astro.config.mjs` with site URL `https://innovaitionedge.com`
2. For each of the 7 routes, verify:
   - Unique `<title>` (≤ 60 chars)
   - Unique `<meta name="description">` (140–160 chars)
   - Canonical link tag
   - OG tags (og:title, og:description, og:image, og:url, og:type)
   - Twitter card tags
3. Add JSON-LD schemas:
   - Organization (Home + About) — already exists, keep/extend
   - Service (each of 4 service pages) — with `serviceType`, `provider`, `areaServed`
   - ContactPoint (Contact page)
   - BreadcrumbList (Services detail pages)
4. Update `public/robots.txt` — ensure sitemap URL is referenced
5. Verify sitemap auto-generates with all 7 URLs at build time
6. Test each page in Google Rich Results Test → zero errors
7. Commit: `feat(seo): per-page meta and structured data`

**Verifies:** Rich Results Test passes on all 7 URLs; sitemap.xml lists 7 URLs; view-source on each page shows unique title/description.

**needs:** T11
**creates:** `astro.config.mjs` updated, JSON-LD blocks in pages, generated sitemap

---

### T13 — Analytics + tracking *(auto)*

**Action:** Wire Microsoft Clarity (free heatmaps + session recording) and Plausible or GA4 (traffic).

**Steps:**
1. **Microsoft Clarity:** create project at clarity.microsoft.com → get tracking script → add to `BaseLayout.astro` `<head>`. Free, unlimited.
2. **Plausible (recommended, $9/mo)** OR **GA4 (free)** — user decides at this point.
   - Plausible: add tracking script to `<head>` with `data-domain="innovaitionedge.com"`
   - GA4: add gtag.js snippet with GA measurement ID
3. Set up conversion events:
   - Contact form submitted
   - "Book a call" button clicked
   - Bookings iframe interacted with (if measurable)
4. Add a `<meta>` for view-source verification that scripts loaded
5. Commit: `feat(analytics): wire clarity and plausible/ga4`

**needs:** T11
**creates:** analytics scripts in `BaseLayout.astro`, external Clarity + Plausible/GA4 projects

---

### T14 — Perf + a11y pass + production cutover *(checkpoint:human-verify)*

**Action:** Full-site quality gate, then cutover from current site to Astro build on production `innovaitionedge.com`.

**Steps:**
1. **Perf pass:**
   - Run `npm run build` → inspect `dist/` sizes; each page < 500 KB
   - Convert all raster images to WebP via Astro `<Image>` component
   - Preload display font; use `font-display: swap`
   - Defer non-critical scripts (analytics = `defer` or `async`)
   - Add `<link rel="preconnect">` for external origins (fonts, analytics)
2. **a11y pass:**
   - Run axe DevTools on all 7 pages → zero WCAG 2.1 AA violations
   - Manual keyboard walk: tab order sane, focus rings visible, mobile menu keyboard-accessible, all form fields have labels
   - Test with VoiceOver / NVDA on 2 pages (Home + Contact)
3. **Lighthouse pass:**
   - Mobile Lighthouse ≥ 95 on Performance / Accessibility / Best Practices / SEO for all 7 pages
   - Log scores in `.planning/phase-01-website-revamp/lighthouse-baseline.md` for future regression checks
4. **Response header check:** `curl -I` on staging URL → confirm HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy still present (from `staticwebapp.config.json`)
5. **Cutover:**
   - Confirm production SWA `POWER_AUTOMATE_CONTACT_URL` env var is set
   - Merge PR to `main` → GitHub Actions deploys to production
   - Verify `innovaitionedge.com` loads new site; DNS unchanged
   - Submit new sitemap to Google Search Console
6. **Post-cutover checkpoint:** user validates production site

**Checkpoint prompt:** "Open innovaitionedge.com in a fresh browser. Confirm: (1) new design loads, (2) all 6 pages navigable, (3) contact form submits successfully with a real message, (4) Bookings link works, (5) mobile experience is smooth. Type 'shipped' to close the phase, or describe issues."

**needs:** T12, T13
**creates:** Lighthouse baseline doc, production deployment

---

## Success Criteria (verification checklist)

| ID | Criterion | Test |
|---|---|---|
| R1 | All 6 pages render on production | Manual visit each URL |
| R2 | Contact form delivers email | Submit form → check inbox arrives < 30s |
| R3 | Bookings works | Click Bookings CTA → complete a test booking |
| R4 | Lighthouse ≥ 95 all dimensions all pages | Automated Lighthouse CI run recorded |
| R5 | WCAG 2.1 AA compliant | axe-core zero violations across 7 pages |
| R6 | Security headers preserved | `curl -I` shows HSTS + all headers |
| R7 | Auto-deploy works | Push a trivial change → deploys automatically |

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Astro + SWA config incompatibility | Low | High | Tracer wave (T1–T3) surfaces this before content work |
| Power Automate URL exposed in client JS | Med | Low (spam only) | Use SWA API function proxy (T11 Option A) |
| Bookings iframe blocked by CSP/X-Frame | Med | Med | Test embed early in T11; fall back to link-out if blocked |
| Lighthouse < 95 due to third-party analytics | Med | Med | Load analytics async/defer; measure impact in T14 |
| Cutover breaks existing SEO rankings | Low | Med | Preserve URL structure (only root URL existed before); submit new sitemap immediately after cutover (T14) |
| WebP images not supported in older browsers | Low | Low | Astro `<Image>` component auto-generates fallbacks |
| Display font (Space Grotesk vs Manrope) delays T4 | Low | Low | Ship T4 with placeholder Inter-bold; swap font in T5 or T6 |

## Non-Goals (explicit)

- No blog engine
- No case studies page
- No team page
- No i18n
- No auth / customer portal
- No A/B testing
- No CMS integration

## User Setup Required (external actions Claude cannot do)

Consolidated list of manual steps by task:

- **T10:** Create Power Automate flow in `make.powerautomate.com`; save HTTP URL to GitHub secret
- **T11 prereq:** Create Microsoft Bookings page for discovery calls; note public URL
- **T11:** Configure `POWER_AUTOMATE_CONTACT_URL` env var in Azure Portal → SWA → Configuration
- **T13:** Create Microsoft Clarity project; create Plausible or GA4 property; provide tracking IDs
- **T14:** (post-cutover) Submit new sitemap to Google Search Console

## Estimated Context Budget

| Wave | Est. context per task | Notes |
|---|---|---|
| 1 | 10–15% each | Scaffolding, config only |
| 2 | 20–30% each | Design system + Home is dense |
| 3 | 15–20% per service page | 4 pages share template |
| 4 | 20–30% each | Backend wiring + testing |
| 5 | 15–25% each | Config, small changes across many files |

Total waves are executable in separate `/gsd-execute-phase` invocations to keep individual runs under 50% context.

---

## Next Step

Run `/gsd-execute-phase 1` to start Wave 1 (tracer slice), OR execute wave-by-wave via `/gsd-execute-wave 1.1`, `1.2`, etc. once wave-level execution is desired.
