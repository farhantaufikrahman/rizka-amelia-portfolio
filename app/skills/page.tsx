import SkillsView from '@/components/views/SkillsView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Skills',
  description: 'Skills of Rizka Amelia — operations, SOP implementation, administration and reporting, quality control, customer service, makeup artistry, digital marketing and Microsoft Office.',
  path: '/skills',
});

export default function Page() {
  return <SkillsView />;
}
