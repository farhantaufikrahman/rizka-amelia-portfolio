'use client';

import Link from 'next/link';
import { ui, type L } from '@/lib/i18n';
import { useT } from '@/lib/store';
import { Container } from '@/components/ui/primitives';

/** "← Back to …" for detail pages that are reached from a parent page rather than the main menu. */
export default function BackLink({ href, label }: { href: string; label: L }) {
  const { t } = useT();
  return (
    <Container className="pt-10">
      <Link href={href} className="group inline-flex items-center gap-2 text-[13px] text-muted hover:text-rose">
        <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span> {t(ui.common.backTo)} {t(label)}
      </Link>
    </Container>
  );
}
