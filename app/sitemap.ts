import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';
import { routes } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'monthly' : 'yearly',
    priority: path === '/' ? 1 : path.split('/').length > 2 ? 0.6 : 0.8,
  }));
}
