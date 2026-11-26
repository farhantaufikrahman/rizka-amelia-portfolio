import type { Metadata } from 'next';
import { experiences, projects, site } from './content';

const OG_IMAGE = { url: '/og.jpg', width: 1200, height: 630, alt: 'Rizka Amelia — Portfolio' };

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const images = image ? [{ url: image, alt: title }] : [OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: 'Rizka Amelia — Portfolio',
      title,
      description,
      locale: 'en_US',
      alternateLocale: ['id_ID'],
      images,
    },
    twitter: { card: 'summary_large_image', title, description, images: images.map((i) => i.url) },
  };
}

/** Every public route, used by sitemap.ts. */
export const routes = [
  '/',
  '/about',
  '/education',
  '/experience',
  ...experiences.map((e) => `/experience/${e.slug}`),
  '/skills',
  '/organization',
  '/speaking',
  '/projects',
  ...projects.map((p) => `/projects/${p.slug}`),
  '/certificates',
  '/contact',
];

/** schema.org Person — helps search engines show a rich profile. */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  image: `${site.url}${site.portrait.src}`,
  email: `mailto:${site.email}`,
  jobTitle: 'Operation & Administration Staff',
  description: site.description.en,
  address: { '@type': 'PostalAddress', addressLocality: 'Bandung', addressCountry: 'ID' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitas Pendidikan Indonesia' },
  worksFor: { '@type': 'Organization', name: 'PT Muara Logam Indonesia (I Love Emas)' },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'Instruktur Terampil (Skilled Instructor)',
    recognizedBy: { '@type': 'Organization', name: 'Badan Nasional Sertifikasi Profesi (BNSP)' },
  },
  knowsAbout: ['Operations management', 'SOP implementation', 'Quality control', 'Administration & reporting', 'Customer service', 'Makeup artistry', 'Public speaking', 'Social media management'],
  knowsLanguage: ['id', 'en'],
  sameAs: [site.linkedin, site.instagram, site.arunikaa],
};
