import { notFound } from 'next/navigation';
import ProjectDetailView from '@/components/views/ProjectDetailView';
import { projects } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.title[0].en} ${p.title[1].en}`.replace(/\.$/, ''),
    description: p.summary.en,
    path: `/projects/${slug}`,
    image: p.cover.src,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!projects.some((p) => p.slug === slug)) notFound();
  return <ProjectDetailView slug={slug} />;
}
