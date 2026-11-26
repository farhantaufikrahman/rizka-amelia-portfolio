import SpeakingView from '@/components/views/SpeakingView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Speaking',
  description: 'Rizka Amelia as a speaker — Grooming & Beauty Class at FMIPA Universitas Padjadjaran and Arunikaa Class at SMAN 1 Subang.',
  path: '/speaking',
});

export default function Page() {
  return <SpeakingView />;
}
