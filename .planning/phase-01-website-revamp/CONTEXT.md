---
phase: 01
name: Website Revamp
type: context
created: 2026-08-25
source: discuss-phase (inline conversation)
---

# Phase 1 Context — Website Revamp

## Phase Goal

Replace the single-page static HTML site at `innovaitionedge.com` with a 6-page Astro site that credibly represents InnovAItion Edge as a Microsoft 365 solutions provider, using existing Azure SWA + GitHub Actions infrastructure, at zero incremental cost.

## Current State (baseline)

- **Site:** single `index.html` (~215 lines), vanilla CSS (~180 lines), vanilla JS (~80 lines)
- **Hosting:** Azure Static Web Apps
- **Deploy:** GitHub Actions (existing workflow in `.github/`)
- **Assets:** brand logo (orange/black), 2.2 MB `cloud.png` hero (unoptimized), favicons
- **Brand:** `#f48027` orange on white; Inter font
- **Sections on current page:** Hero → What We Do (4 shallow cards) → Why It Matters (nearly empty) → Where We Work (nearly empty) → Connect → Contact form
- **Contact form:** uses EmailJS with placeholder credentials (`YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_PUBLIC_KEY`) — **currently non-functional**
- **SEO:** sitemap has 1 URL only; Organization JSON-LD present in `<head>`
- **Config:** `staticwebapp.config.json` sets HSTS, X-Content-Type-Options, X-Frame-Options SAMEORIGIN, Referrer-Policy, Permissions-Policy, cache rules

## Known Issues to Fix

1. **Contact form is dead** — placeholder EmailJS keys never filled in
2. **Hero image is 2.2 MB** — massive perf hit; needs SVG or optimized raster
3. **WCAG contrast failures** — orange `#f48027` on white on H1/H2 headings fails AA contrast
4. **Broken `.btn-ghost`** — styled with solid orange background contradicting ghost pattern
5. **Empty sections** — "Why It Matters" and "Where We Work" have no meaningful content
6. **Thin sitemap** — only lists the root URL
7. **No conversion path beyond a broken form** — no booking option, no clear CTA

## Locked Decisions (from discuss-phase conversation)

### Scope
- **6 pages only:** Home, Services overview, 4 service pages (M365 Modernization, SharePoint & Teams Apps, Power Platform Automation, Azure AI & Agents), About/Approach, Contact
- **No team page** — startup, <5 people
- **No case studies page** — no permitted client references yet
- **No blog / insights** — content overhead not justified
- **No Innova365 product tie-in** — service-focused positioning
- **English only**

### Tech
- **Framework: Astro** — approved by user
- **Hosting: Azure SWA** — unchanged
- **CI/CD: GitHub Actions** — unchanged, adapted for Astro build output
- **Contact backend: Power Automate HTTP trigger + Outlook connector** — dogfoods the pitch, uses existing E5, zero cost
- **Booking: Microsoft Bookings** (available on user's E5 license)
- **Analytics: Microsoft Clarity + Plausible** (or GA4 if Plausible cost is unwanted — Clarity is free either way)

### Design
- **Palette:** demote orange to accent only; charcoal `#0F172A` for headings (fixes contrast)
- **Typography:** keep Inter for body; add Space Grotesk or Manrope for display headings
- **Button system:** rebuild with primary (orange), secondary (outline), ghost (text-only) — fix current broken `.btn-ghost`
- **Hero:** replace `cloud.png` with SVG illustration or Astro-optimized raster
- **Motion:** subtle scroll reveals; no heavy animation

### Credibility strategy (without client logos / case studies / team)
1. Service-page depth — name real M365 primitives (SPFx, Graph API, Copilot Studio, Dataverse, Fabric, Azure AI Foundry)
2. "Discover → Prototype → Ship → Enable" methodology surfaced on Home + About
3. Sample engagement patterns instead of case studies ("Typical: 4-week Copilot pilot for a 200-person team…")
4. Founder-led voice on About page
5. The Power Automate-backed contact form itself as a live proof point

## Constraints

- **Zero recurring cost** — no new SaaS subscriptions
- **No third-party services** in the critical path (contact form must not depend on EmailJS/Formspree)
- **Preserve existing `staticwebapp.config.json`** — security headers and cache rules stay
- **Preserve existing custom domain + SSL** on SWA
- **Solo developer + Claude workflow** — no team ceremonies

## Non-Goals for This Phase

- No CMS / no dynamic content
- No auth / no customer portal
- No case studies (deferred to future milestone)
- No blog engine
- No i18n
- No A/B testing framework

## Success Criteria (map to R1–R7 in ROADMAP)

- R1: All 6 pages render on production `innovaitionedge.com`
- R2: Contact form submission arrives at `contact@innovaitionedge.com` inbox within 30 seconds
- R3: Microsoft Bookings iframe / link opens a scheduling flow on `/contact`
- R4: Lighthouse mobile ≥ 95 on Performance / Accessibility / Best Practices / SEO on all 6 pages
- R5: axe-core scan reports zero WCAG 2.1 AA violations
- R6: Response headers on production match pre-cutover values (HSTS, X-Content-Type-Options, etc.)
- R7: `git push origin main` triggers GitHub Action → SWA deploy without manual steps

## Open Items (to be resolved during execution, not blocking planning)

- Final choice of display font (Space Grotesk vs Manrope) — decide when Home page is being styled
- Choice between Plausible ($9/mo) vs GA4 (free) — user preference during analytics task
- SVG hero illustration source (custom, undraw.co, or Astro-optimized raster fallback)
