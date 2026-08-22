import { DEFAULT_SEO } from './seo.config';

/**
 * Stable @id URIs for connecting graph entities cleanly.
 */
export const SCHEMA_IDS = {
  website: `${DEFAULT_SEO.baseUrl}/#website`,
  organization: `${DEFAULT_SEO.baseUrl}/#organization`,
  localBusiness: `${DEFAULT_SEO.baseUrl}/#localbusiness`,
  tutoringService: `${DEFAULT_SEO.baseUrl}/#service-tutoring`,
  assessmentService: `${DEFAULT_SEO.baseUrl}/#service-assessment`,
};

/**
 * 1. WebSite Schema
 */
export const getWebSiteSchema = () => ({
  '@type': 'WebSite',
  '@id': SCHEMA_IDS.website,
  'url': DEFAULT_SEO.baseUrl,
  'name': DEFAULT_SEO.siteName,
  'description': DEFAULT_SEO.defaultDescription,
  'inLanguage': 'en-IN',
});

/**
 * 2. Organization Schema
 */
export const getOrganizationSchema = () => ({
  '@type': 'Organization',
  '@id': SCHEMA_IDS.organization,
  'name': DEFAULT_SEO.siteName,
  'url': DEFAULT_SEO.baseUrl,
  'logo': {
    '@type': 'ImageObject',
    'url': `${DEFAULT_SEO.baseUrl}/mentR_Logo.png`,
    'caption': 'TheMentR Logo',
  },
  'image': `${DEFAULT_SEO.baseUrl}/mentR_Logo.png`,
  'description': DEFAULT_SEO.defaultDescription,
  'email': 'contact@thementr.com',
  'telephone': '+919668562631',
  'contactPoint': [
    {
      '@type': 'ContactPoint',
      'telephone': '+919668562631',
      'contactType': 'customer service',
      'availableLanguage': ['English', 'Hindi', 'Odia'],
    },
    {
      '@type': 'ContactPoint',
      'telephone': '18008892388',
      'contactType': 'toll free',
      'availableLanguage': ['English', 'Hindi', 'Odia'],
    }
  ],
  'sameAs': [
    'https://www.instagram.com/thementrnetwork',
    'https://www.linkedin.com/company/thementrnetwork/',
    'https://x.com/TheMentRNetwork',
    'https://www.facebook.com/share/1CR7mAbF8C/',
  ],
});

/**
 * 3. LocalBusiness Schema
 */
export const getLocalBusinessSchema = () => ({
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  '@id': SCHEMA_IDS.localBusiness,
  'name': DEFAULT_SEO.siteName,
  'url': DEFAULT_SEO.baseUrl,
  'image': `${DEFAULT_SEO.baseUrl}/mentR_Logo.png`,
  'telephone': '+919668562631',
  'email': 'contact@thementr.com',
  'priceRange': '₹1,499 - ₹9,999 / month',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Plot no. 2937/6463, Saptasati Vihar, Palasuni',
    'addressLocality': 'Bhubaneswar',
    'addressRegion': 'Odisha',
    'postalCode': '751025',
    'addressCountry': 'IN',
  },
  'areaServed': [
    {
      '@type': 'City',
      'name': 'Bhubaneswar',
    },
    {
      '@type': 'Country',
      'name': 'India',
    }
  ],
  'parentOrganization': {
    '@id': SCHEMA_IDS.organization,
  },
});

/**
 * 4. Service Schema
 */
export const getTutoringServiceSchema = () => ({
  '@type': 'Service',
  '@id': SCHEMA_IDS.tutoringService,
  'name': 'Personalized Home Tuition & Mentorship',
  'serviceType': 'Home Tuition & 1-on-1 Mentorship',
  'provider': {
    '@id': SCHEMA_IDS.organization,
  },
  'description': 'Connecting students and parents with fully background-checked, qualified home tutors for K-12 (CBSE, ICSE, IGCSE, State Boards) with 1-on-1 personalized guidance.',
  'areaServed': {
    '@type': 'Country',
    'name': 'India',
  },
  'termsOfService': `${DEFAULT_SEO.baseUrl}/terms`,
});

export const getAssessmentServiceSchema = () => ({
  '@type': 'Service',
  '@id': SCHEMA_IDS.assessmentService,
  'name': 'Diagnostic Learning Assessment Visit',
  'serviceType': 'Diagnostic Educational Assessment',
  'provider': {
    '@id': SCHEMA_IDS.localBusiness,
  },
  'description': 'Comprehensive 60-90 minute at-home diagnostic learning assessment to evaluate student academic requirements before tutor assignment.',
  'areaServed': {
    '@type': 'Country',
    'name': 'India',
  },
});

/**
 * 5. FAQPage Schema Helper
 */
export const VISIBLE_CONTACT_FAQS = [
  {
    q: 'Who can apply to become a teacher with TheMentR?',
    a: 'Any individual holding a minimum qualification of 10+2, ITI, Diploma, or higher degrees (B.Sc., B.Ed., M.Ed., M.Sc., M.Tech, LLB, M. Com., BA, MA, B.Com., PhD, etc.) may apply. Recruitment is skill-based and inclusive; both freshers and experienced educators are welcome.',
  },
  {
    q: 'How do students join TheMentR?',
    a: 'Students or parents can register via the TheMentR website or app by entering basic information (name, contact, grade, subjects required) and verifying their contact details through OTP or email.',
  },
  {
    q: 'What is TheMentR and how does it work?',
    a: 'TheMentR is a digital platform designed to connect students and parents with fully verified, qualified tuition teachers for KG to PG levels, offering both online and offline sessions through a secure and transparent marketplace.',
  },
  {
    q: 'What subscription plans are available for institutions?',
    a: 'Institutions can purchase annual subscription plans at nominal rates, paying a one-time fee for one academic year. The subscription allows them to recruit visiting faculty through TheMentR on a per class fee basis without additional costs during the subscription period.',
  },
  {
    q: 'What extra benefits do TheMentR teachers receive?',
    a: 'TheMentR provides group insurance, mobile phone allowance, reward bonuses, banking assistance (loan eligibility, credit cards), verified badge and Experience Certificate in addition to regular pay.',
  },
  {
    q: 'How does TheMentR ensure the quality and safety of tutors?',
    a: 'Every tutor undergoes multi-step verification including government ID checks, degree authentication, background screening, demo teaching assessments, reference checks and ongoing feedback monitoring.',
  },
  {
    q: 'What is the fee range for tuition through TheMentR?',
    a: 'TheMentR offers a transparent fee structure starting at ₹1,499 per month up to ₹9,999 per month including all taxes and platform fees, with no hidden charges.',
  },
];

export const getFAQPageSchema = (faqs = []) => ({
  '@type': 'FAQPage',
  'mainEntity': faqs.map((faq) => ({
    '@type': 'Question',
    'name': faq.q || faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.a || faq.answer,
    },
  })),
});

/**
 * 6. BreadcrumbList Schema Helper
 */
export const getBreadcrumbSchema = (items = []) => ({
  '@type': 'BreadcrumbList',
  'itemListElement': items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': item.url.startsWith('http') ? item.url : `${DEFAULT_SEO.baseUrl}${item.url === '/' ? '' : item.url}`,
  })),
});

/**
 * Helper to build a connected JSON-LD @graph context object
 */
export const createSchemaGraph = (schemas = []) => ({
  '@context': 'https://schema.org',
  '@graph': schemas,
});

/**
 * Pre-configured Page Schema Graphs
 */
export const PAGE_SCHEMAS = {
  home: createSchemaGraph([
    getWebSiteSchema(),
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getTutoringServiceSchema(),
    getFAQPageSchema(VISIBLE_CONTACT_FAQS),
  ]),
  contact: createSchemaGraph([
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getFAQPageSchema(VISIBLE_CONTACT_FAQS),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' },
    ]),
  ]),
  pricing: createSchemaGraph([
    getOrganizationSchema(),
    getTutoringServiceSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Pricing', url: '/pricing' },
    ]),
  ]),
  avsar: createSchemaGraph([
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getAssessmentServiceSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'AVSAR Assessment', url: '/avsar' },
    ]),
  ]),
  blogs: createSchemaGraph([
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blogs', url: '/blogs' },
    ]),
  ]),
  ecosystem: createSchemaGraph([
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Ecosystem', url: '/ecosystem' },
    ]),
  ]),
  terms: createSchemaGraph([
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Terms & Policy', url: '/terms' },
    ]),
  ]),
  sitemap: createSchemaGraph([
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Sitemap', url: '/sitemap' },
    ]),
  ]),
};
