const SITE = 'https://innovaitionedge.com';
const NAME = 'InnovAItion Edge';
const EMAIL = 'contact@innovaitionedge.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: NAME,
  legalName: 'InnovAItion Edge',
  url: SITE,
  logo: `${SITE}/logo.png`,
  description:
    'A Microsoft 365 solutions provider modernizing the enterprise workplace with AI agents, custom Teams and SharePoint apps, and Power Platform automation.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coimbatore',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: EMAIL,
    contactType: 'sales',
    availableLanguage: ['English'],
  },
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
  areaServed = 'Worldwide',
  serviceType,
}: ServiceSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  serviceType: serviceType ?? name,
  provider: {
    '@type': 'Organization',
    name: NAME,
    url: SITE,
  },
  areaServed,
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
