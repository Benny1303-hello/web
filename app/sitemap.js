import productsCatalog from '@/lib/productsCatalog.json';
import { serviceOfferings, systemIntegrationSolutions } from '@/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://web-vxfh.vercel.app';

const staticRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/staff', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/distribution', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/list', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services/extended-warranty', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/services/apc-gold-warranty', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/services/staff', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/system-integration', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/system-integration/solutions', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/system-integration/staff', priority: 0.4, changeFrequency: 'monthly' },
];

export default function sitemap() {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productGroupEntries = productsCatalog.groups.map((group) => ({
    url: `${SITE_URL}/products/${group.key}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const productDetailEntries = productsCatalog.products.map((product) => ({
    url: `${SITE_URL}/products/${product.group}/${product.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const serviceDetailEntries = serviceOfferings.map((service) => ({
    url: `${SITE_URL}/services/list/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const solutionDetailEntries = systemIntegrationSolutions.map((solution) => ({
    url: `${SITE_URL}/system-integration/solutions/${solution.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...productGroupEntries,
    ...productDetailEntries,
    ...serviceDetailEntries,
    ...solutionDetailEntries,
  ];
}
