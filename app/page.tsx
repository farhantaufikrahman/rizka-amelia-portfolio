import HomeView from '@/components/views/HomeView';
import { pageMetadata } from '@/lib/seo';

export const metadata = {
  ...pageMetadata({
    title: 'Rizka Amelia — Operations, Makeup Artist & Speaker | Bandung',
    description:
      'Rizka Amelia is an Operation & Administration Staff in Bandung, a Cum Laude graduate of Universitas Pendidikan Indonesia, freelance makeup artist (Arunikaa Makeup), model and speaker.',
    path: '/',
  }),
  title: { absolute: 'Rizka Amelia — Operations, Makeup Artist & Speaker | Bandung' },
};

export default function Page() {
  return <HomeView />;
}
