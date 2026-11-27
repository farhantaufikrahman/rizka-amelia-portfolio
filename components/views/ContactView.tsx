'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Brush, FileDown, Mail, MapPin, MessageCircle } from 'lucide-react';
import { contactPage as c, site } from '@/lib/content';
import { useT } from '@/lib/store';
import { Body, Container, Eyebrow, PillLink, SerifTitle } from '@/components/ui/primitives';
import { Parallax, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { Halo, LineIcon, MaskedImage } from '@/components/decor/Decor';
import { TulipCorner } from '@/components/decor/TulipCluster';

function Row({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const body = (
    <>
      <span className="hover-wiggle flex h-11 w-11 flex-none items-center justify-center rounded-full border border-line bg-card text-ink transition-colors duration-300 group-hover:border-rose group-hover:bg-rose group-hover:text-white">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className="text-sm text-muted transition-colors group-hover:text-rose">{value}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group flex items-center gap-4 py-3">
      {body}
    </a>
  ) : (
    <div className="group flex items-center gap-4 py-3">{body}</div>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-ink transition-all duration-300 hover:-translate-y-1 hover:border-rose hover:text-rose">
      {children}
    </a>
  );
}

/** Reference layout: "Let's connect!" with contact rows and a send button, portrait in an arch on the right. */
export default function ContactView() {
  const { t } = useT();
  const ic = { size: 18, strokeWidth: 1.5 };

  return (
    <div className="relative pb-24">
      <Container className="grid min-h-[calc(100svh-120px)] items-center gap-12 pb-10 pt-10 lg:grid-cols-12">
        <Stagger className="relative z-10 flex flex-col gap-5 lg:col-span-6">
          <StaggerItem>
            <Eyebrow>{t(c.eyebrow)}</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <SerifTitle lines={[t(c.title[0]), t(c.title[1])]} accent size="xl" />
          </StaggerItem>
          <StaggerItem>
            <Body>{t(c.desc)}</Body>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-rose/10 px-3.5 py-1.5 text-[13px] font-medium text-ink">
              <span aria-hidden className="h-2 w-2 rounded-full bg-[#7FB069]" />
              {t(c.availability)}
            </p>
          </StaggerItem>
          {/* Order for recruiters: CV, email, LinkedIn, WhatsApp, location; Instagram sits with the icons below. */}
          <StaggerItem className="flex flex-col divide-y divide-line">
            <Row icon={<FileDown {...ic} />} label={t(c.cv)} value={t(c.cvValue)} href={site.cv} />
            <Row icon={<Mail {...ic} />} label={t(c.email)} value={site.email} href={`mailto:${site.email}`} />
            <Row icon={<LineIcon name="linkedin" size={18} />} label={t(c.linkedin)} value={t(c.linkedinValue)} href={site.linkedin} />
            <Row icon={<MessageCircle {...ic} />} label={t(c.whatsapp)} value={t(c.whatsappValue)} href={site.whatsapp} />
            <Row icon={<MapPin {...ic} />} label={t(c.location)} value={t(site.location)} />
          </StaggerItem>
          <StaggerItem className="flex flex-wrap items-center gap-4">
            <PillLink href={`mailto:${site.email}`}>{t(c.send)}</PillLink>
            <div className="flex gap-2.5">
              <Social href={site.instagram} label="Instagram @rizkamnj">
                <LineIcon name="instagram" size={18} />
              </Social>
              <Social href={site.arunikaa} label="Makeup bookings @arunikaa.makeup">
                <Brush {...ic} />
              </Social>
            </div>
          </StaggerItem>
        </Stagger>

        <Parallax speed={30} className="relative mx-auto aspect-[5/7] w-full max-w-[340px] sm:max-w-[400px] lg:col-span-6 lg:max-w-[420px]">
          {/* garden arch */}
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 999px 999px 32px 32px)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 999px 999px 32px 32px)' }}
            transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1], delay: 0.6 }}
          >
            <Halo className="inset-0 rounded-t-full rounded-b-[32px]" />
          </motion.div>
          <div className="animate-float absolute inset-[5%]">
            <MaskedImage src={site.portrait.src} alt={t(site.portrait.alt)} priority objectPosition={site.portrait.pos} className="absolute inset-0 rounded-t-full rounded-b-[28px] border-4 border-paper" />
          </div>
          <TulipCorner side="left" scale={0.28} className="-bottom-4 -left-6 z-20 sm:-left-10" gustDelay={0.3} />
        </Parallax>
      </Container>
    </div>
  );
}
