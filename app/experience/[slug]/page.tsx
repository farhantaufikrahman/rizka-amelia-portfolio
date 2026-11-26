import { notFound } from 'next/navigation';
import ExperienceDetailView from '@/components/views/ExperienceDetailView';
import { experiences } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const e = experiences.find((x) => x.slug === slug);
  if (!e) return {};
  const isMakeup = slug === 'makeup-artist';
  return pageMetadata({
    title: isMakeup ? 'Makeup Artist — Arunikaa Makeup' : `${e.role.en} · ${e.org.en}`,
    description: isMakeup
      ? 'Makeup portfolio of Rizka Amelia (Arunikaa Makeup): Sundanese bridal, graduation, traditional and editorial looks in Bandung.'
      : `${e.role.en} at ${e.org.en} (${e.period.en}). ${e.summary.en}`,
    path: `/experience/${slug}`,
    image: e.cover.src,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!experiences.some((e) => e.slug === slug)) notFound();
  return <ExperienceDetailView slug={slug} />;
}
