import ExperienceView from '@/components/views/ExperienceView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Experience',
  description: 'Experience of Rizka Amelia — Operational Staff at I Love Emas, operational internship at PT Agronesia (BMC), secretary roles in student organizations, and freelance creative work.',
  path: '/experience',
});

export default function Page() {
  return <ExperienceView />;
}
