---
name: InnovAItion Edge Website Roadmap
milestone: v2.0 — Site Revamp
status: active
created: 2026-08-25
---

# Roadmap — Website v2.0 Revamp

Modernize the single-page marketing site (currently 215 lines of static HTML) into a 6-page Astro site that credibly represents InnovAItion Edge as a Microsoft 365 solutions provider.

## Milestone Goal

Ship a new `innovaitionedge.com` that:
- Loads on Azure SWA via GitHub Actions CI/CD
- Presents 6 pages: Home, Services (overview), 4 service pages, About, Contact
- Accepts contact form submissions via Power Automate + Outlook (no third-party services)
- Embeds Microsoft Bookings for discovery-call scheduling
- Scores ≥ 95 on Lighthouse and passes WCAG 2.1 AA
- Costs $0/month beyond existing M365 + Azure subscriptions

## Phases

### Phase 1: Website Revamp (Astro migration + all 6 pages + form + cutover)

**Status:** Planned
**Directory:** `.planning/phase-01-website-revamp/`
**Depends on:** —

Full revamp shipped as one phase. Tracer-first: get one page (Home) deployed end-to-end to a SWA staging slot via the new Astro + GitHub Actions pipeline before expanding to the remaining 5 pages. Nothing user-facing changes on production until the final cutover task in Wave 5.

**Ships:**
- Astro project scaffold with GitHub Actions → SWA deploy
- Design system components (buttons, cards, nav, footer, CTA banner)
- 6 pages of content
- Power Automate flow wired to `/contact` form
- Microsoft Bookings embed on `/contact`
- Per-page SEO meta + Organization/Service JSON-LD
- Expanded sitemap (1 URL → 7 URLs)
- Microsoft Clarity + Plausible analytics
- Lighthouse ≥ 95, WCAG 2.1 AA
- Cutover to production

**Requirements:**
- R1: Site loads on `innovaitionedge.com` with all 6 pages accessible
- R2: Contact form delivers email to `contact@innovaitionedge.com` via Power Automate
- R3: Microsoft Bookings embed allows prospects to book a discovery call
- R4: Lighthouse mobile scores ≥ 95 on all four dimensions across all 6 pages
- R5: All headings/text meet WCAG 2.1 AA contrast (fixes current orange-on-white failures)
- R6: Existing SWA security headers and cache rules preserved
- R7: GitHub push to `main` triggers automatic build + deploy

## Future Milestones (not yet planned)

- **v2.1** — Case studies section (once first customer permits reference)
- **v2.2** — Blog / insights (if SEO gap becomes worth the content ops)
- **v3.0** — Innova365 product marketing integration (if product line launches)
