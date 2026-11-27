import ContactView from '@/components/views/ContactView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Contact Rizka Amelia for Operational & Administrative Staff opportunities in Bandung — CV, email, LinkedIn and WhatsApp.',
  path: '/contact',
});

export default function Page() {
  return <ContactView />;
}
