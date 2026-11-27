'use client';

import { useEffect, useRef } from 'react';

type Fly = { x: number; y: number; heading: number; speed: number; phase: number; pulse: number; size: number; trail: { x: number; y: number }[] };

/**
 * A few fireflies drawn on one canvas, spread evenly over the whole screen.
 * Each drifts slowly on a gently turning heading (no updraft, so they never bunch up
 * at the top), glows with a slow breathing pulse, and turns back softly at the edges.
 * Motion is time-based, so it is equally calm on 60 Hz and 120 Hz screens.
 * Pauses when the tab is hidden; renders nothing for reduced-motion users.
 */
export default function Fireflies({ count = 12 }: { count?: number }) {
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
      const pw = w;
      const ph = h;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // keep the flies where they were, proportionally, so a resize doesn't clump them
      if (pw && ph) for (const f of flies) { f.x *= w / pw; f.y *= h / ph; }
    };
    const flies: Fly[] = [];
    resize();
    window.addEventListener('resize', resize);

    // Stratified start positions: one fly per cell of a grid, so they cover top, bottom, left and right evenly.
    const n = w < 640 ? Math.max(6, Math.round(count * 0.6)) : count;
    const cols = Math.ceil(Math.sqrt(n * (w / h)));
    const rows = Math.ceil(n / cols);
    for (let i = 0; i < n; i++) {
      const cx = i % cols;
      const cy = Math.floor(i / cols);
      flies.push({
        x: ((cx + 0.2 + Math.random() * 0.6) / cols) * w,
        y: ((cy + 0.2 + Math.random() * 0.6) / rows) * h,
        heading: Math.random() * Math.PI * 2,
        speed: 6 + Math.random() * 6, // px per second — a slow drift
        phase: Math.random() * Math.PI * 2,
        pulse: 0.25 + Math.random() * 0.2, // glow cycles per second (~2.5–4 s per breath)
        size: 1.3 + Math.random() * 1.3,
        trail: [],
      });
    }

    const margin = 40;
    let raf = 0;
    let last = 0;
    let time = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      time += dt;
      const dark = document.documentElement.dataset.theme === 'dark';
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = dark ? 'lighter' : 'source-over';

      for (const f of flies) {
        // wander: a slow sinusoidal turn plus a little noise
        f.heading += (Math.sin(time * 0.15 + f.phase * 3) * 0.25 + (Math.random() - 0.5) * 0.4) * dt;
        // near an edge, steer gently back toward the middle instead of wrapping
        if (f.x < margin || f.x > w - margin || f.y < margin || f.y > h - margin) {
          const toCentre = Math.atan2(h / 2 - f.y, w / 2 - f.x);
          let diff = toCentre - f.heading;
          diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          f.heading += diff * 0.6 * dt;
        }
        f.x += Math.cos(f.heading) * f.speed * dt;
        f.y += Math.sin(f.heading) * f.speed * dt;

        f.trail.push({ x: f.x, y: f.y });
        if (f.trail.length > 10) f.trail.shift();

        const pulse = 0.5 + 0.5 * Math.sin(time * f.pulse * Math.PI * 2 + f.phase);
        const core = dark ? '255, 236, 170' : '255, 196, 92';
        const haloColor = dark ? '255, 222, 140' : '255, 214, 150';

        // faint trail
        for (let i = 0; i < f.trail.length; i++) {
          const p = f.trail[i];
          ctx.fillStyle = `rgba(${core}, ${(i / f.trail.length) * 0.1 * pulse})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, f.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        // halo of light it carries
        const r = f.size * (dark ? 10 : 7.5) * (0.75 + pulse * 0.4);
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r);
        g.addColorStop(0, `rgba(${haloColor}, ${(dark ? 0.5 : 0.38) * (0.25 + pulse * 0.75)})`);
        g.addColorStop(1, `rgba(${haloColor}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
        ctx.fill();

        // body
        ctx.fillStyle = `rgba(${core}, ${0.35 + pulse * 0.55})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = 0;
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
