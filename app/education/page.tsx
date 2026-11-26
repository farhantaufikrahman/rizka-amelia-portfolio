import EducationView from '@/components/views/EducationView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Education',
  description: 'Education of Rizka Amelia — Agroindustrial Technology Education at Universitas Pendidikan Indonesia (GPA 3.49, Cum Laude), teaching practicum at SMKN 4 Garut and a thesis on an SOP for hedonic testing.',
  path: '/education',
});

export default function Page() {
  return <EducationView />;
}
