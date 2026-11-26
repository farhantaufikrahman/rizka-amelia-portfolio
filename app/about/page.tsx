import AboutView from '@/components/views/AboutView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About',
  description: 'About Rizka Amelia — Cum Laude graduate of Universitas Pendidikan Indonesia, operations professional, makeup artist, model and speaker based in Bandung.',
  path: '/about',
});

export default function Page() {
  return <AboutView />;
}
