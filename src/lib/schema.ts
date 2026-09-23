const SITE = 'https://innovaitionedge.com';
const NAME = 'InnovAItion Edge';
const ALT_NAMES = ['Innovation Edge', 'InnovAItion Edge Coimbatore'];
const EMAIL = 'contact@innovaitionedge.com';
// Registered address (legal HQ)
const CITY = 'Karur';
const REGION = 'Tamil Nadu';
const COUNTRY = 'IN';
// Karur city centre
const LAT = 10.9601;
const LNG = 78.0766;

const AREA_SERVED = [
  // Global-first — where our clients actually are
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'United Kingdom' },
  { '@type': 'Country', name: 'Israel' },
  { '@type': 'Country', name: 'Germany' },
  { '@type': 'Country', name: 'Netherlands' },
  { '@type': 'AdministrativeArea', name: 'European Union' },
  { '@type': 'Country', name: 'Australia' },
  { '@type': 'Country', name: 'Canada' },
  { '@type': 'Country', name: 'Singapore' },
  { '@type': 'Country', name: 'United Arab Emirates' },
  // India + local — registered HQ and local delivery reach
  { '@type': 'Country', name: 'India' },
  { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
  { '@type': 'City', name: 'Karur' },
  { '@type': 'City', name: 'Coimbatore' },
  { '@type': 'City', name: 'Chennai' },
  { '@type': 'City', name: 'Bengaluru' },
  { '@type': 'City', name: 'Kulithalai' },
  { '@type': 'Place', name: 'Worldwide' },
];

const SERVICE_TYPES = [
  'Microsoft 365 Consulting',
  'SharePoint Development & Modernization',
  'Microsoft Teams App Development',
  'Power Platform Development',
  'Power Automate & Power Apps',
  'Azure AI & Copilot Studio Consulting',
  'Enterprise IT Services',
];

const KNOWS_ABOUT = [
  'Microsoft 365',
  'Microsoft SharePoint Online',
  'SharePoint Framework (SPFx)',
  'Microsoft Teams',
  'Microsoft Teams Toolkit',
  'Adaptive Cards',
  'Bot Framework',
  'Power Platform',
  'Power Apps',
  'Power Automate',
  'Power BI',
  'Power Pages',
  'Dataverse',
  'Copilot Studio',
  'Azure OpenAI',
  'Azure AI Foundry',
  'Azure AI Search',
  'Azure Bot Service',
  'Azure Functions',
  'Microsoft Graph',
  'Microsoft Entra ID',
  'Microsoft Purview',
  '.NET',
  'TypeScript',
  'React',
];

/** Full ProfessionalService (LocalBusiness) schema — canonical @id on the site. */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE}/#organization`,
  name: NAME,
  legalName: NAME,
  alternateName: ALT_NAMES,
  url: SITE,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/logo.png`,
    width: 180,
    height: 36,
  },
  image: `${SITE}/logo.png`,
  description:
    'InnovAItion Edge is a Microsoft 365 solutions provider and IT services company. We build custom SharePoint, Teams, Power Platform, and Azure AI solutions for enterprise M365 estates in the United States, United Kingdom, Israel, Europe, India, and worldwide.',
  slogan: 'Turn Microsoft 365 into an operational advantage',
  address: {
    '@type': 'PostalAddress',
    addressLocality: CITY,
    addressRegion: REGION,
    addressCountry: COUNTRY,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: LAT,
    longitude: LNG,
  },
  email: EMAIL,
  contactPoint: {
    '@type': 'ContactPoint',
    email: EMAIL,
    contactType: 'sales',
    availableLanguage: ['English'],
    areaServed: 'Worldwide',
  },
  areaServed: AREA_SERVED,
  serviceType: SERVICE_TYPES,
  knowsAbout: KNOWS_ABOUT,
  priceRange: '$$',
  currenciesAccepted: 'INR, USD',
  paymentAccepted: 'Bank Transfer, UPI, Wire',
} as const;

interface ServiceSchemaInput {
  name: string;
  description: string;
  slug: string;
  areaServed?: string;
  serviceType?: string;
}

export const serviceSchema = ({
  name,
  description,
  slug,
  serviceType,
}: ServiceSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  serviceType: serviceType ?? name,
  provider: {
    '@type': 'ProfessionalService',
    '@id': `${SITE}/#organization`,
    name: NAME,
    url: SITE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CITY,
      addressRegion: REGION,
      addressCountry: COUNTRY,
    },
  },
  areaServed: AREA_SERVED,
  url: `${SITE}${slug}`,
});

interface BreadcrumbInput {
  name: string;
  path: string;
}

export const breadcrumbSchema = (items: BreadcrumbInput[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE}${item.path}`,
  })),
});

interface FAQInput {
  question: string;
  answer: string;
}

export const faqSchema = (items: FAQInput[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const siteName = NAME;
export const siteUrl = SITE;
