import SkillsView from '@/components/views/SkillsView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Skills',
  description: 'Skills of Rizka Amelia — operations, SOP implementation, administration and reporting, customer service, quality control, digital marketing, Microsoft Office and Google Workspace.',
  path: '/skills',
});

export default function Page() {
  return <SkillsView />;
}
