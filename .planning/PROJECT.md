---
name: InnovAItion Edge Website
type: project
status: active
created: 2026-08-25
domain: Marketing site for a Microsoft 365 solutions provider
---

# InnovAItion Edge Website

## Vision

A modern, credible marketing site for **InnovAItion Edge** — a Microsoft 365 solutions provider based in Coimbatore. The site converts enterprise IT decision-makers into discovery calls by demonstrating depth in the M365 ecosystem (SharePoint, Teams, Power Platform, Azure AI).

## Positioning

> We modernize the Microsoft 365 workplace with AI agents, custom Teams/SharePoint apps, and Power Platform automation.

**Target audience:** enterprise IT leaders, Heads of Digital Workplace, CIOs at mid-market companies evaluating M365 modernization or AI adoption partners.

## Non-Goals

- **No blog / insights section** — content overhead not justified at current stage
- **No case studies / client logos** — none available yet (startup, no permitted client references)
- **No team page** — team is <5 people; founder-led About page instead
- **No product marketing for Innova365** — this site is service-focused, not tied to a product line
- **No multi-language** — English only
- **No customer portal / gated content / auth** — pure marketing site

## Locked Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Astro** | Zero JS by default, built-in image optimization, MDX-ready, tiny build output |
| Hosting | **Azure Static Web Apps** | Already in use; free tier; preview environments per PR |
| CI/CD | **GitHub Actions** | Native SWA integration via existing workflow |
| Contact form backend | **Power Automate HTTP trigger + Outlook connector** | Uses existing E5 license, $0 cost, dogfoods the pitch |
| Booking | **Microsoft Bookings** (E5) | No third-party dependency |
| Analytics | **Microsoft Clarity** + **Plausible** (or GA4) | Clarity for heatmaps (free), Plausible for privacy-friendly stats |
| Typography | **Inter** (body) + **Space Grotesk** or **Manrope** (display) | Inter already in use; display face adds distinction |
| Deploy target domain | `innovaitionedge.com` | Existing SWA custom domain |

## Non-Functional Targets

- **Lighthouse ≥ 95** on Performance, Accessibility, Best Practices, SEO (mobile + desktop)
- **WCAG 2.1 AA** conformance
- **First Contentful Paint** < 1.5s on 3G
- **Total page weight** < 500 KB on any page (excluding fonts)
- **Zero recurring cost** beyond existing Azure + M365 subscriptions

## Stakeholders

- **Product owner / builder:** Naveen Prasath Selvaraj (founder)
- **Implementer:** Claude Code
- **End users:** enterprise IT decision-makers evaluating M365 partners

## Repository Layout (post-revamp)

```
/                       Astro project root
├── src/
│   ├── pages/          Route files (.astro)
│   ├── layouts/        Page layouts
│   ├── components/     Reusable UI
│   └── styles/         Global styles + design tokens
├── public/             Static assets (favicons, robots.txt, sitemap)
├── astro.config.mjs
├── package.json
├── staticwebapp.config.json    Preserved from current site
└── .github/workflows/          SWA deploy workflow
```
