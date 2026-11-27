import AboutView from '@/components/views/AboutView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About',
  description: 'About Rizka Amelia — Operational Staff at PT Muara Logam Indonesia (I Love Emas) and Cum Laude graduate of Universitas Pendidikan Indonesia, working in operations and administration in Bandung.',
  path: '/about',
});

export default function Page() {
  return <AboutView />;
}
