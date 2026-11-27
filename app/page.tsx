import HomeView from '@/components/views/HomeView';
import { pageMetadata } from '@/lib/seo';

export const metadata = {
  ...pageMetadata({
    title: 'Rizka Amelia — Operational & Administrative Staff | Bandung',
    description:
      'Operational & Administrative Staff in Bandung with experience in daily operations, SOP implementation, reporting, data processing, and customer service.',
    path: '/',
  }),
  title: { absolute: 'Rizka Amelia — Operational & Administrative Staff | Bandung' },
};

export default function Page() {
  return <HomeView />;
}
