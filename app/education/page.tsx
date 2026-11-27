import EducationView from '@/components/views/EducationView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Education & Certifications',
  description: 'Education of Rizka Amelia — Agroindustrial Technology Education at Universitas Pendidikan Indonesia (GPA 3.49, Cum Laude), teaching practicum at SMKN 4 Garut, a thesis on an SOP for hedonic testing, and BNSP Skilled Instructor certification.',
  path: '/education',
});

export default function Page() {
  return <EducationView />;
}
