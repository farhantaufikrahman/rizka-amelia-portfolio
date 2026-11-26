import OrganizationView from '@/components/views/OrganizationView';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Organization',
  description: 'Organization experience of Rizka Amelia — General Assembly Secretary of the FPTI UPI student board and General Secretary Staff of BEM HIMAGRIN.',
  path: '/organization',
});

export default function Page() {
  return <OrganizationView />;
}
