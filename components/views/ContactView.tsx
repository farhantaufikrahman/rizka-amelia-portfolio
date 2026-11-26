'use client';

import type { ReactNode } from 'react';
import { Brush, Mail, MapPin, MessageCircle } from 'lucide-react';
import { contactPage as c, site } from '@/lib/content';
import { useT } from '@/lib/store';
import { Reveal } from '@/components/ui/Reveal';
import { LineIcon, MaskedImage } from '@/components/decor/Decor';
import { Envelope, PressedTulip, Washi } from '@/components/decor/Illustrations';
import SectionHero from '@/components/sections/SectionHero';

function Row({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const body = (
    <>
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[#EFC3C9] bg-[#FFFDFB] text-[#5B2C3A]">{icon}</span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-[#5B2C3A]">{label}</span>
        <span className="text-sm text-[#7D5F66]">{value}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-4 border-b border-dashed border-[#EFC3C9] py-3 transition-colors hover:[&_span]:text-[#E48A9A]">
      {body}
    </a>
  ) : (
    <div className="flex items-center gap-4 border-b border-dashed border-[#EFC3C9] py-3">{body}</div>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#EFC3C9] bg-[#FFFDFB] text-[#5B2C3A] transition-colors hover:text-[#E48A9A]">
      {children}
    </a>
  );
}

/** Concept: a love letter — sealed envelope in the hero, contact details written on letter paper. */
export default function ContactView() {
  const { t } = useT();
  const ic = { size: 18, strokeWidth: 1.5 };

  return (
    <div className="relative pb-24">
      <SectionHero
        eyebrow={t(c.eyebrow)}
        title={[t(c.title[0]), t(c.title[1])]}
        desc={t(c.desc)}
        cta={{ label: t(c.send), href: `mailto:${site.email}` }}
        visualClassName="h-[460px] sm:h-[560px]"
        visual={
          <div className="relative mx-auto h-full w-full max-w-[520px]">
            {/* portrait slipped half out of the envelope */}
            <div className="absolute left-[18%] top-0 h-[64%] w-[64%] rotate-[-3deg] bg-[#FFFDFB] p-3 shadow-[var(--shadow-photo)]">
              <MaskedImage src={site.portrait.src} alt={t(site.portrait.alt)} priority objectPosition="62% 10%" className="absolute inset-3" />
            </div>
            <Envelope className="animate-bob absolute bottom-[4%] left-0 z-10 w-full" />
            <PressedTulip className="animate-sway absolute -right-2 top-[12%] z-20 h-44 w-16 rotate-[20deg]" />
          </div>
        }
      />

      <div className="mx-auto max-w-[720px] px-6">
        <Reveal>
          <div className="paper-lined relative rotate-[-0.8deg] rounded-md px-8 pb-10 pt-12 text-[#5B2C3A] shadow-[var(--shadow-photo)] sm:px-14">
            <Washi className="-top-3 left-10 -rotate-6" />
            <Washi className="-top-3 right-10 rotate-6" color="rgba(168,185,160,0.6)" />
            <p className="font-serif text-3xl italic">{t({ en: 'Dear you,', id: 'Untukmu,' })}</p>
            <p className="mt-3 text-[15px] leading-8 text-[#7D5F66]">{t(c.desc)}</p>
            <div className="mt-6 flex flex-col">
              <Row icon={<Mail {...ic} />} label={t(c.email)} value={site.email} href={`mailto:${site.email}`} />
              <Row icon={<MessageCircle {...ic} />} label={t(c.whatsapp)} value={t(c.whatsappValue)} href={site.whatsapp} />
              <Row icon={<MapPin {...ic} />} label={t(c.location)} value={t(site.location)} />
            </div>
            <div className="mt-6 flex items-end justify-between gap-4">
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
              <p className="font-serif text-3xl italic text-[#E48A9A]">— Rizka</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
