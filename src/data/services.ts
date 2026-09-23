export interface Ship {
  heading: string;
  body: string;
}

export interface Service {
  slug: string;
  eyebrow: string;
  name: string;
  cardTitle: string;
  cardBody: string;
  heroTitle: string;
  heroIntro: string;
  problemHeading: string;
  problemBody: string[];
  ships: Ship[];
  engagementHeading: string;
  engagementBody: string;
  engagementBullets: string[];
  metaDescription: string;
}

export const services: Service[] = [
  {
    slug: 'sharepoint',
    eyebrow: 'SharePoint',
    name: 'SharePoint modernization',
    cardTitle: 'Modern SharePoint intranets people actually use',
    cardBody:
      'Rebuild dated SharePoint estates into performant hubs with SPFx components, real content architecture, and search that finally works.',
    heroTitle: 'Modern SharePoint intranets that people actually use.',
    heroIntro:
      'We migrate legacy SharePoint estates to modern hubs, ship the SPFx components that make them feel like real products, and rebuild the information architecture underneath so search stops embarrassing you.',
    problemHeading: 'Where most SharePoint estates get stuck',
    problemBody: [
      'Classic sites everywhere. The "let\'s go modern" project has been on the roadmap for three years and keeps losing to whichever incident is on fire this quarter.',
      'Content architecture is whatever accumulated over a decade. Search returns 400 results, none of them the right one. Adoption is 20% and shrinking.',
      'Every attempt to add a real capability ends in a 2018-era webpart nobody knows how to maintain.',
    ],
    ships: [
      {
        heading: 'SPFx components tied to real workflows',
        body: 'Web parts, extensions, and Adaptive Card Extensions built to your design system — not the default fabric look. Deployed via the App Catalog with proper versioning.',
      },
      {
        heading: 'Modern site architecture with governance',
        body: 'Hub / communication / team site hierarchy that mirrors how the business is actually organised. Permission model, provisioning templates, lifecycle rules.',
      },
      {
        heading: 'Search that returns the right answer',
        body: 'Custom refiners, promoted results, personalization by department. Managed properties mapped to the metadata your business actually files by.',
      },
      {
        heading: 'Content types and metadata that mirror the business',
        body: 'Term sets, retention labels, and content types designed with your records team — not copy-pasted from a template.',
      },
      {
        heading: 'Classic-to-modern migration without breakage',
        body: 'Teams, OneDrive, and Outlook links stay pointing at the right place. Migration in tranches so users are never left with a dead intranet.',
      },
    ],
    engagementHeading: 'How the engagement runs',
    engagementBody:
      'A typical modernization runs 6–10 weeks and delivers a shipped, adopted site — not just an assessment deck.',
    engagementBullets: [
      'Week 1–2: content + IA audit, target-state architecture agreed',
      'Week 3–6: SPFx component library, one migrated business-unit hub, search + navigation live',
      'Week 7–10: additional sites migrated in tranches, handoff to your team with playbooks',
    ],
    metaDescription:
      'SharePoint modernization services: SPFx components, hub site architecture, content types, and classic-to-modern migration delivered by a Microsoft 365 solutions provider.',
  },

  {
    slug: 'teams',
    eyebrow: 'Teams',
    name: 'Teams apps',
    cardTitle: 'Teams apps that fit how your business actually works',
    cardBody:
      'Line-of-business Teams apps with Adaptive Cards, message extensions, and bot integrations — shipped as native experiences, not iframed refugees.',
    heroTitle: 'Teams apps that fit the way your business actually works.',
    heroIntro:
      'We build the Teams apps that turn the chat client into the operational surface — Adaptive Cards, message extensions, meeting apps, and Bot Framework integrations that surface natively where your people already spend the day.',
    problemHeading: 'Where Teams stalls out',
    problemBody: [
      'Teams is where the chat happens. The actual work still lives in Excel, email chains, and someone\'s laptop.',
      'Every "let\'s build a Teams app" initiative dies at the tab vs. SPFx vs. Bot Framework decision. A vendor demo goes well; nothing ships.',
      'The apps that do get built are iframed refugees — not first-class Teams surfaces, so nobody uses them.',
    ],
    ships: [
      {
        heading: 'Adaptive Card–driven workflows',
        body: 'Approvals, requests, and structured data capture as first-class cards inside chat and channels — with real actions, not just formatted text.',
      },
      {
        heading: 'Message extensions + Copilot connectors',
        body: 'Search-based and action-based extensions that surface your line-of-business systems inside the compose box, where the conversation actually happens.',
      },
      {
        heading: 'Meeting-scoped apps',
        body: 'Structured decision, retro, and standup workflows that live in the meeting surface — pre-meeting, in-meeting, and post-meeting stages with proper state.',
      },
      {
        heading: 'Bot Framework + Azure Bot Service integrations',
        body: 'Conversational surfaces backed by Azure Bot Service, hosted in your tenant, with proper auth (SSO / OBO) and telemetry.',
      },
      {
        heading: 'Cross-tenant and guest access patterns',
        body: 'B2B collaboration flows audited against your compliance posture — external access without opening the whole tenant.',
      },
    ],
    engagementHeading: 'How the engagement runs',
    engagementBody:
      'Typical Teams app engagement is 4–8 weeks per app, ending with a real user cohort using it in production plus telemetry to prove it.',
    engagementBullets: [
      'Week 1: scoping — the exact workflow that will move into Teams, plus success metric',
      'Week 2–5: build — adaptive cards, backend, auth, deployment via Teams admin center',
      'Week 6–8: pilot with real cohort, telemetry review, handoff or expansion',
    ],
    metaDescription:
      'Microsoft Teams app development: Adaptive Cards, message extensions, meeting apps, and Bot Framework integrations — built as first-class Teams surfaces.',
  },

  {
    slug: 'power-platform',
    eyebrow: 'Power Platform',
    name: 'Power Platform automation',
    cardTitle: 'Automation that removes real friction',
    cardBody:
      'Power Automate flows and Power Apps that replace the spreadsheet-and-email operational drag most enterprises are still living with.',
    heroTitle: 'Power Platform automation that removes the real friction.',
    heroIntro:
      'We ship the Power Automate flows, Power Apps, and Dataverse schemas that finally retire the spreadsheet-and-email operational drag — with the governance and DLP shape your central IT team can actually defend.',
    problemHeading: 'Where the manual work still hides',
    problemBody: [
      'Approvals live in email chains. Weekly reports live in one analyst\'s spreadsheet. When she goes on leave, three teams block.',
      'The Power Platform licenses are sitting there, unused, because "we tried Flow once and it broke and nobody trusted it after."',
      'Central IT is nervous about citizen development sprawl and has quietly turned the whole thing off with a DLP policy.',
    ],
    ships: [
      {
        heading: 'Power Automate flows replacing email-chain approvals',
        body: 'Multi-stage approvals with SLAs, escalation, audit trail, and delegation — surfaced in Teams and Outlook where people already work.',
      },
      {
        heading: 'Canvas Power Apps for field / mobile capture',
        body: 'Structured data capture on the go with offline support, image + signature + geolocation — connected back to Dataverse or SharePoint.',
      },
      {
        heading: 'Model-driven apps + Dataverse for line-of-business ops',
        body: 'Case management, asset tracking, vendor ops — model-driven apps on Dataverse with role-based security and Power BI dashboards.',
      },
      {
        heading: 'Custom connectors to legacy systems',
        body: 'SAP, on-prem SQL, mainframe APIs surfaced as first-class Power Platform connectors so citizen developers can safely reuse them.',
      },
      {
        heading: 'Governance you can defend',
        body: 'Environment strategy, DLP policies, CoE Starter Kit rollout, licensing model — turning "we\'re nervous about shadow IT" into a defensible position.',
      },
    ],
    engagementHeading: 'How the engagement runs',
    engagementBody:
      'Power Platform engagements typically bundle discovery + build in a 2–6 week loop per flow or app.',
    engagementBullets: [
      'Week 1: workflow mapping, connector inventory, success metric agreed',
      'Week 2–4: build — flows, apps, connectors, unit + integration tests',
      'Week 5–6: rollout, telemetry review, governance handoff',
    ],
    metaDescription:
      'Microsoft Power Platform consulting: Power Automate flows, Power Apps, Dataverse, custom connectors, and CoE governance for enterprise automation.',
  },

  {
    slug: 'azure-ai',
    eyebrow: 'Azure AI',
    name: 'Azure AI agents',
    cardTitle: 'AI agents grounded in your M365 tenant',
    cardBody:
      'Copilot Studio and Azure AI Foundry solutions grounded in your Graph data — assistants that actually know your business, not generic chatbots.',
    heroTitle: 'AI agents grounded in your M365 tenant.',
    heroIntro:
      'We build the Copilot Studio and Azure AI Foundry agents that go beyond a chat wrapper — grounded in your Microsoft Graph and SharePoint data, permission-trimmed, evaluated, and shipped into Teams where people already work.',
    problemHeading: 'Where AI initiatives get stuck',
    problemBody: [
      'Copilot for M365 is generic. It hallucinates on your data because it does not know your business.',
      'The GPT-wrapper POC works in demo but fails in prod — no eval, no permission trimming, no way to know when it is quietly wrong.',
      'IT is nervous about exposing SharePoint content to any model, so the whole initiative sits in a holding pattern.',
    ],
    ships: [
      {
        heading: 'Copilot Studio agents grounded in Microsoft Graph',
        body: 'Custom agents that answer from your SharePoint, Teams, OneDrive, and line-of-business data — with proper permission trimming, so a user only sees what they can already see.',
      },
      {
        heading: 'RAG pipelines with Azure AI Search',
        body: 'Retrieval over your content with hybrid search (vector + keyword), chunking strategy tuned to your document shapes, and re-ranking for grounded answers.',
      },
      {
        heading: 'Azure AI Foundry solutions with evaluation',
        body: 'End-to-end agents built in Foundry with prompt orchestration, tools, and evaluation datasets — so quality regression is a graph, not a support ticket.',
      },
      {
        heading: 'Eval harnesses that catch silent regressions',
        body: 'Offline eval sets, LLM-as-judge and human-review pipelines, cost + latency tracking — because "vibes-based" AI shipping is how you get burned.',
      },
      {
        heading: 'Responsible AI deployment patterns',
        body: 'Content filters, prompt-shield, logging + audit, human review loops for high-stakes calls, DLP integration — so security signs off, not blocks.',
      },
    ],
    engagementHeading: 'How the engagement runs',
    engagementBody:
      'AI engagements are typically 6–10 weeks pilot, ending with a shipped agent, an evaluation report, and a clear rollout path.',
    engagementBullets: [
      'Week 1–2: use case scoping, data inventory, permission model, eval design',
      'Week 3–7: build — retrieval, prompt orchestration, tools, first eval pass',
      'Week 8–10: shipped pilot in Teams, evaluation report, rollout / expansion plan',
    ],
    metaDescription:
      'Azure AI and Copilot Studio consulting: custom agents grounded in Microsoft Graph, RAG pipelines, evaluation harnesses, and Responsible AI deployment patterns.',
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
