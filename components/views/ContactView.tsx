'use client';

import type { ReactNode } from 'react';
import { Brush, Mail, MapPin, MessageCircle } from 'lucide-react';
import { contactPage as c, site } from '@/lib/content';
import { useT } from '@/lib/store';
import { Halo, LineIcon, MaskedImage } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';
import SectionHero from '@/components/sections/SectionHero';

function Row({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const body = (
    <>
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-line bg-card text-ink">{icon}</span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-sm text-muted">{value}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-4 py-1.5 hover:text-rose">
      {body}
    </a>
  ) : (
    <div className="flex items-center gap-4 py-1.5">{body}</div>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-ink transition-colors hover:text-rose">
      {children}
    </a>
  );
}

export default function ContactView() {
  const { t } = useT();
  const ic = { size: 18, strokeWidth: 1.5 };

  return (
    <div className="relative pb-48">
      <SectionHero
        eyebrow={t(c.eyebrow)}
        title={[t(c.title[0]), t(c.title[1])]}
        desc={t(c.desc)}
        cta={{ label: t(c.send), href: `mailto:${site.email}` }}
        below={
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Row icon={<Mail {...ic} />} label={t(c.email)} value={site.email} href={`mailto:${site.email}`} />
              <Row icon={<MessageCircle {...ic} />} label={t(c.whatsapp)} value={t(c.whatsappValue)} href={site.whatsapp} />
              <Row icon={<MapPin {...ic} />} label={t(c.location)} value={t(site.location)} />
            </div>
            <div className="flex gap-2.5">
              <Social href={site.linkedin} label="LinkedIn">
                <LineIcon name="linkedin" size={18} />
              </Social>
              <Social href={site.instagram} label="Instagram @rizkamnj">
                <LineIcon name="instagram" size={18} />
              </Social>
              <Social href={site.arunikaa} label="Makeup bookings @arunikaa.makeup">
                <Brush {...ic} />
              </Social>
            </div>
          </div>
        }
        visual={
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px]">
            <Halo className="inset-0 rounded-[220px]" />
            <MaskedImage src={site.portrait.src} alt={t(site.portrait.alt)} priority objectPosition="62% 10%" className="absolute inset-[5%] rounded-[220px]" />
            <TulipCorner side="right" scale={0.55} className="-bottom-10 -right-12 z-20" />
          </div>
        }
      />
      {/* Faint city skyline */}
      <svg aria-hidden viewBox="0 0 1440 200" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-[200px] w-full text-rose opacity-25">
        <path
          fill="currentColor"
          d="M0 200 V150 H60 V120 H90 V150 H140 V100 H170 V80 H180 V100 H210 V150 H270 V130 H330 V150 H400 V110 H420 V60 L430 40 L440 60 V110 H460 V150 H540 V120 H600 V150 H680 V90 H720 V150 H800 V130 H880 V100 H900 V150 H980 V120 H1040 V150 H1120 V110 H1160 V150 H1240 V130 H1300 V150 H1440 V200 Z"
        />
      </svg>
    </div>
  );
}
