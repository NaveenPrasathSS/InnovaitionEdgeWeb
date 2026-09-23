export interface TechItem {
  name: string;
  color: string;
  initials: string;
}

export interface TechPillar {
  slug: string;
  eyebrow: string;
  title: string;
  body: string;
  items: TechItem[];
}

// Colors sampled from Microsoft product brand pages, used for identification only.
export const pillars: TechPillar[] = [
  {
    slug: 'm365-core',
    eyebrow: 'Foundation',
    title: 'Microsoft 365 core',
    body: 'The tenant-level surfaces most enterprises already own — where we spend most of our time turning licenses into shipped outcomes.',
    items: [
      { name: 'SharePoint Online', color: '#038387', initials: 'SP' },
      { name: 'Microsoft Teams', color: '#4b53bc', initials: 'T' },
      { name: 'OneDrive', color: '#0364b8', initials: 'OD' },
      { name: 'Outlook', color: '#0078d4', initials: 'O' },
      { name: 'Exchange Online', color: '#0078d4', initials: 'EX' },
      { name: 'Microsoft Graph', color: '#7fba00', initials: 'MG' },
    ],
  },
  {
    slug: 'dev-stack',
    eyebrow: 'Custom apps',
    title: 'Development stack',
    body: 'The frameworks and languages we use to extend Microsoft 365 with real, first-class experiences — not iframed refugees.',
    items: [
      { name: 'SPFx', color: '#038387', initials: 'SPFx' },
      { name: 'Teams Toolkit', color: '#4b53bc', initials: 'TT' },
      { name: 'Adaptive Cards', color: '#0078d4', initials: 'AC' },
      { name: 'Bot Framework', color: '#0078d4', initials: 'BF' },
      { name: '.NET', color: '#512bd4', initials: '.NET' },
      { name: 'TypeScript', color: '#3178c6', initials: 'TS' },
      { name: 'React', color: '#61dafb', initials: 'RX' },
      { name: 'Node.js', color: '#5fa04e', initials: 'JS' },
    ],
  },
  {
    slug: 'power-platform',
    eyebrow: 'Automation',
    title: 'Power Platform',
    body: 'Low-code and pro-code delivery for the operational drag — from citizen-developer flows to model-driven apps built on enterprise governance.',
    items: [
      { name: 'Power Apps', color: '#742774', initials: 'PA' },
      { name: 'Power Automate', color: '#0066ff', initials: 'PA' },
      { name: 'Power BI', color: '#f2c811', initials: 'BI' },
      { name: 'Power Pages', color: '#6264a7', initials: 'PP' },
      { name: 'Copilot Studio', color: '#0d47a1', initials: 'CS' },
      { name: 'Dataverse', color: '#742774', initials: 'DV' },
      { name: 'Custom Connectors', color: '#0066ff', initials: 'CC' },
    ],
  },
  {
    slug: 'azure-ai',
    eyebrow: 'AI & cloud',
    title: 'Azure & Azure AI',
    body: 'Where our AI agents actually run — grounded in Microsoft Graph, deployed to the tenant, monitored with proper evaluation and telemetry.',
    items: [
      { name: 'Azure OpenAI', color: '#0078d4', initials: 'AI' },
      { name: 'Azure AI Foundry', color: '#0078d4', initials: 'AF' },
      { name: 'Azure AI Search', color: '#0078d4', initials: 'AS' },
      { name: 'Azure Bot Service', color: '#0078d4', initials: 'ABS' },
      { name: 'Azure Functions', color: '#ffb900', initials: 'AF' },
      { name: 'Azure Logic Apps', color: '#0078d4', initials: 'LA' },
      { name: 'Azure DevOps', color: '#0078d4', initials: 'DO' },
      { name: 'Application Insights', color: '#68217a', initials: 'AI' },
    ],
  },
  {
    slug: 'identity',
    eyebrow: 'Security & governance',
    title: 'Identity, security & compliance',
    body: 'The plumbing every enterprise M365 project depends on — configured to your policy, not left as a default.',
    items: [
      { name: 'Microsoft Entra ID', color: '#00bcf2', initials: 'EN' },
      { name: 'Conditional Access', color: '#0078d4', initials: 'CA' },
      { name: 'Microsoft Purview', color: '#742774', initials: 'MP' },
      { name: 'Sensitivity Labels', color: '#0078d4', initials: 'SL' },
      { name: 'DLP Policies', color: '#e81123', initials: 'DLP' },
      { name: 'B2B / Guest Access', color: '#0078d4', initials: 'B2B' },
    ],
  },
  {
    slug: 'data-integration',
    eyebrow: 'Data & integration',
    title: 'Data & integration',
    body: 'Where M365 meets the systems your business actually runs on — SAP, on-prem SQL, legacy APIs, and the databases behind them.',
    items: [
      { name: 'Azure SQL', color: '#a91d3a', initials: 'SQL' },
      { name: 'Cosmos DB', color: '#0078d4', initials: 'DB' },
      { name: 'Dataverse', color: '#742774', initials: 'DV' },
      { name: 'REST / OData', color: '#475569', initials: 'API' },
      { name: 'Custom Connectors', color: '#0066ff', initials: 'CC' },
      { name: 'On-prem Data Gateway', color: '#0078d4', initials: 'GW' },
    ],
  },
];
