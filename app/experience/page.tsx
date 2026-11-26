import ExperienceView from '@/components/views/ExperienceView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Experience',
  description: 'Work experience of Rizka Amelia — Operational Staff at I Love Emas, operational intern at PT Agronesia (BMC), freelance makeup artist and model.',
  path: '/experience',
});

export default function Page() {
  return <ExperienceView />;
}
