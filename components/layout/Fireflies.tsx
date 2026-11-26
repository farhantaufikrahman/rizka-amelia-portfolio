'use client';

import { useEffect, useRef } from 'react';

type Fly = { x: number; y: number; vx: number; vy: number; phase: number; speed: number; size: number; trail: { x: number; y: number }[] };

/**
 * Fireflies drawn on one canvas: each wanders on a smooth random heading, carries a
 * pulsing halo of light and leaves a short fading trail. Brighter on the night theme.
 * Pauses when the tab is hidden; renders nothing for reduced-motion users.
 */
export default function Fireflies({ count = 26 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const n = w < 640 ? Math.round(count * 0.55) : count;
    const flies: Fly[] = Array.from({ length: n }, () => {
      const a = Math.random() * Math.PI * 2;
      return {
        // Fireflies gather low, near the tulips, with a few higher up.
        x: Math.random() * w,
        y: h * (0.35 + Math.random() * 0.65),
        vx: Math.cos(a) * 0.3,
        vy: Math.sin(a) * 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.18 + Math.random() * 0.32,
        size: 1.4 + Math.random() * 1.8,
        trail: [],
      };
    });

    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 1;
      const dark = document.documentElement.dataset.theme === 'dark';
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = dark ? 'lighter' : 'source-over';

      for (const f of flies) {
        // wander: gently turn the heading, keep speed constant
        const turn = Math.sin(t * 0.01 + f.phase * 3) * 0.04 + (Math.random() - 0.5) * 0.05;
        const ang = Math.atan2(f.vy, f.vx) + turn;
        f.vx = Math.cos(ang) * f.speed;
        f.vy = Math.sin(ang) * f.speed - 0.02; // slow updraft
        f.x += f.vx;
        f.y += f.vy;
        if (f.x < -20) f.x = w + 20;
        if (f.x > w + 20) f.x = -20;
        if (f.y < h * 0.12) f.vy += 0.05;
        if (f.y > h + 20) f.y = h * 0.6;

        f.trail.push({ x: f.x, y: f.y });
        if (f.trail.length > 14) f.trail.shift();

        const pulse = 0.55 + 0.45 * Math.sin(t * 0.045 + f.phase);
        const core = dark ? '255, 236, 170' : '255, 196, 92';
        const haloColor = dark ? '255, 222, 140' : '255, 214, 150';

        // trail
        for (let i = 0; i < f.trail.length; i++) {
          const p = f.trail[i];
          const a = (i / f.trail.length) * 0.18 * pulse;
          ctx.fillStyle = `rgba(${core}, ${a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, f.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        // halo of light it carries
        const r = f.size * (dark ? 11 : 8) * (0.7 + pulse * 0.5);
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r);
        g.addColorStop(0, `rgba(${haloColor}, ${(dark ? 0.55 : 0.42) * pulse})`);
        g.addColorStop(1, `rgba(${haloColor}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
        ctx.fill();

        // body
        ctx.fillStyle = `rgba(${core}, ${0.6 + pulse * 0.4})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const onVis = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
