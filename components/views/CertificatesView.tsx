"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { certificatesPage as c } from "@/lib/content";
import { useT } from "@/lib/store";
import { Container, PillLink, cx } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { HangingString, Washi } from "@/components/decor/Illustrations";
import { OrgLogo } from "@/components/decor/Decor";
import { Lightbox } from "@/components/sections/Gallery";
import SectionHero from "@/components/sections/SectionHero";
import FooterCTA from "@/components/layout/FooterCTA";

const FRAMES = [
  "border-[#C9A27C] bg-[#FFFDFB]",
  "border-[#E48A9A] bg-[#FFF8F7]",
  "border-[#A8B9A0] bg-[#FBFDF9]",
  "border-[#B98A88] bg-[#FFFDFB]",
];

/** Concept: a gallery wall — each certificate hangs in its own frame from a nail. */
export default function CertificatesView() {
  const { t } = useT();
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const photos = c.items.map((i) => i.photo);
  const lead = c.items[0];

  return (
    <>
      <SectionHero
        eyebrow={t(c.eyebrow)}
        title={[t(c.title[0]), t(c.title[1])]}
        desc={t(c.desc)}
        cta={{ label: t(c.cta), href: "#wall" }}
        visualClassName="h-[460px] sm:h-[560px]"
        visual={
          <div className="relative mx-auto flex h-full w-full max-w-[420px] flex-col items-center">
            <HangingString className="w-56" />
            <div
              className="animate-swing -mt-1 rounded-sm border-[14px] border-[#C9A27C] bg-[#FFFDFB] p-3 shadow-[var(--shadow-photo)] [box-shadow:inset_0_0_0_2px_#E9CFA9,var(--shadow-photo)]"
              style={{ animationDuration: "7s" }}
            >
              <span className="relative block h-[300px] w-[220px] sm:h-[360px] sm:w-[260px]">
                <Image
                  src={lead.photo.src}
                  alt={t(lead.photo.alt)}
                  fill
                  priority
                  sizes="260px"
                  className="object-contain"
                />
              </span>
            </div>
            <p className="mt-4 flex items-center gap-2 rounded-full bg-card py-1.5 pl-1.5 pr-4 text-[13px] text-muted shadow-[var(--shadow-soft)]">
              {lead.logo && <OrgLogo logo={lead.logo} size={28} />}
              {t(lead.title)} · {t(lead.meta)}
            </p>
          </div>
        }
      />
      <Container id="wall" className="scroll-mt-28 pb-6">
        {/* picture rail */}
        <div
          aria-hidden
          className="mb-2 h-2 rounded-full bg-[linear-gradient(90deg,#E9CFA9,#C9A27C,#E9CFA9)] shadow-[0_6px_14px_-8px_rgba(91,44,58,0.4)]"
        />
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {c.items.map((item, i) => (
            <Reveal
              key={item.photo.src}
              delay={i * 0.08}
              className={cx(
                "flex flex-col items-center",
                i % 2 === 1 && "lg:mt-8",
              )}
            >
              <HangingString className="h-10 w-32" />
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t(item.title)}
                className={cx(
                  "animate-swing group -mt-1 cursor-zoom-in rounded-sm border-[10px] p-2 shadow-[var(--shadow-photo)] transition-transform hover:scale-[1.03]",
                  FRAMES[i % FRAMES.length],
                )}
                style={{
                  animationDelay: `${-i * 1.3}s`,
                  animationDuration: `${6 + (i % 3)}s`,
                }}
              >
                <span className="relative block h-[180px] w-[130px] sm:h-[220px] sm:w-[160px]">
                  <Image
                    src={item.photo.src}
                    alt={t(item.photo.alt)}
                    fill
                    sizes="180px"
                    className="object-contain"
                  />
                </span>
              </button>
              {/* museum label */}
              <div className="relative mt-5 w-full max-w-[200px] rounded-sm bg-[#FFFDFB] px-3 py-2 text-center text-[#5B2C3A] shadow-[var(--shadow-soft)]">
                <Washi className="-top-3 left-1/2 -translate-x-1/2 scale-75" />
                {item.logo && <OrgLogo logo={item.logo} size={36} className="mx-auto mb-1.5 mt-1" />}
                <p className="font-serif text-lg italic leading-tight">
                  {t(item.title)}
                </p>
                <p className="mt-0.5 text-[12px] text-[#7D5F66]">
                  {t(item.meta)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <PillLink href={c.pdf} variant="outline">
            {t(c.openPdf)}
          </PillLink>
        </div>
      </Container>
      <Lightbox
        photos={photos}
        index={index}
        onClose={close}
        onIndex={setIndex}
      />
      <FooterCTA />
    </>
  );
}
