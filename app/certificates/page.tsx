import CertificatesView from '@/components/views/CertificatesView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Certificates',
  description: 'Certificates of Rizka Amelia — BNSP Skilled Instructor (2024), makeup training at Universitas Pendidikan Indonesia and speaker certificate from SMAN 1 Subang.',
  path: '/certificates',
});

export default function Page() {
  return <CertificatesView />;
}
