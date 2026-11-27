import ProjectsView from '@/components/views/ProjectsView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Projects',
  description: 'Projects by Rizka Amelia — an SOP for hedonic testing developed as a thesis at FPTI UPI, plus a creative campaign shoot for Momis Bakery.',
  path: '/projects',
});

export default function Page() {
  return <ProjectsView />;
}
