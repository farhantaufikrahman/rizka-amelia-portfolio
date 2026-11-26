import ProjectsView from '@/components/views/ProjectsView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Projects',
  description: 'Projects by Rizka Amelia — a thesis developing an SOP for hedonic testing at FPTI UPI and the Momies Bakery campaign shoot.',
  path: '/projects',
});

export default function Page() {
  return <ProjectsView />;
}
