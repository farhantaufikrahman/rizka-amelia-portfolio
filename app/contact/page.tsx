import ContactView from '@/components/views/ContactView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Contact Rizka Amelia for operations & administration roles, makeup bookings (Arunikaa Makeup) or modelling in Bandung.',
  path: '/contact',
});

export default function Page() {
  return <ContactView />;
}
