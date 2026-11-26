import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers/Providers';
import Background from '@/components/layout/Background';
import Navbar from '@/components/layout/Navbar';
import { ScrollProgress } from '@/components/ui/Reveal';
import { site } from '@/lib/content';
import { personJsonLd } from '@/lib/seo';
import { noFlashScript } from '@/lib/theme-script';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Rizka Amelia — Makeup Artist, Model & Speaker | Bandung',
    template: '%s · Rizka Amelia',
  },
  description: site.description.en,
  applicationName: 'Rizka Amelia — Portfolio',
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    'Rizka Amelia',
    'Rizka Amelia Nurazizah Johana',
    'portfolio',
    'Operation Staff Bandung',
    'Administration Staff',
    'Quality Control',
    'makeup artist Bandung',
    'Arunikaa Makeup',
    'MUA Bandung',
    'model Bandung',
    'Universitas Pendidikan Indonesia',
    'BNSP instruktur',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'Rizka Amelia — Portfolio',
    title: 'Rizka Amelia — Portfolio',
    description: site.description.en,
    locale: 'en_US',
    alternateLocale: ['id_ID'],
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Rizka Amelia — Portfolio' }],
  },
  twitter: { card: 'summary_large_image', title: 'Rizka Amelia — Portfolio', description: site.description.en, images: ['/og.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  formatDetection: { telephone: false },
  // Paste the token from Google Search Console here after verifying the domain.
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBEFED' },
    { media: '(prefers-color-scheme: dark)', color: '#1E1418' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="min-h-screen overflow-x-hidden text-ink antialiased">
        <Providers>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-on-ink">
            Skip to content
          </a>
          <Background />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
