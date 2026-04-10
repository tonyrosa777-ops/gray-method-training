"use client";

import { useEffect, useRef } from "react";

/**
 * LogoParticles
 *
 * Hybrid canvas animation:
 *   · During assembly (converge → hold → explode) the logo is rendered as a
 *     field of colored particles sampled from the source image.
 *   · At the end of the explode phase, the particles crossfade out as the
 *     real logo image crossfades in, then stays pixel-perfect for idle.
 *   · Idle state draws the real image (crisp, antialiased) and overlays
 *     energy effects: a rotating gold arc on the ring, a horizontal shimmer
 *     sweep every ~6s, and additive sparkle bursts on the bright pixels.
 *
 * This fixes the fuzziness issue — particle grids can't render antialiased
 * text, so the idle state uses drawImage() instead.
 *
 * prefers-reduced-motion skips straight to idle.
 */

interface Particle {
  hx: number;
  hy: number;
  sx: number;
  sy: number;
  cx: number;
  cy: number;
  r: number;
  g: number;
  b: number;
}

interface Sparkle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
}

const CONVERGE_DURATION = 0.7;
const HOLD_DURATION = 0.25;
const EXPLODE_DURATION = 1.0;
const ASSEMBLY_TOTAL = CONVERGE_DURATION + HOLD_DURATION + EXPLODE_DURATION;

const easeInCubic = (t: number) => t * t * t;
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

interface LogoParticlesProps {
  src?: string;
  className?: string;
}

export default function LogoParticles({
  src = "/images/gray-method-logo.png",
  className = "",
}: LogoParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles: Particle[] = [];
    let sparkleSpots: { x: number; y: number }[] = [];
    const sparkles: Sparkle[] = [];
    let rafId = 0;
    let startTime = 0;
    let lastTime = 0;
    let nextSparkleAt = 0;
    const sampleSize = 240;
    const step = 3;

    const logoImg = new Image();
    let imgReady = false;

    const sizeCanvas = () => {
      const rect = wrapper.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      canvas.width = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      return size;
    };

    const buildParticles = () => {
      if (!imgReady) return;
      const size = sizeCanvas();
      const W = size * dpr;
      const cx = W / 2;
      const cy = W / 2;

      const off = document.createElement("canvas");
      off.width = sampleSize;
      off.height = sampleSize;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(logoImg, 0, 0, sampleSize, sampleSize);
      const data = octx.getImageData(0, 0, sampleSize, sampleSize).data;

      const scale = W / sampleSize;
      const next: Particle[] = [];
      const spots: { x: number; y: number }[] = [];

      for (let y = 0; y < sampleSize; y += step) {
        for (let x = 0; x < sampleSize; x += step) {
          const i = (y * sampleSize + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 120) continue;
          const brightness = (r + g + b) / 3;
          if (brightness < 55) continue;

          const hx = Math.round(x * scale);
          const hy = Math.round(y * scale);

          const scatterAngle = Math.random() * Math.PI * 2;
          const scatterDist = W * (0.9 + Math.random() * 0.7);
          const sx = cx + Math.cos(scatterAngle) * scatterDist;
          const sy = cy + Math.sin(scatterAngle) * scatterDist;

          next.push({ hx, hy, sx, sy, cx, cy, r, g, b });

          // Collect the very brightest pixels for sparkle spawning.
          // Exclude the banner/subtitle text band so sparkles never land on text.
          if (brightness > 200) {
            const yFrac = hy / W; // canvas is square so W === H
            if (yFrac < 0.36 || yFrac > 0.68) {
              spots.push({ x: hx, y: hy });
            }
          }
        }
      }
      particles = next;
      sparkleSpots = spots;
      startTime = 0;
      lastTime = 0;
      nextSparkleAt = ASSEMBLY_TOTAL + 0.15;
      sparkles.length = 0;
    };

    const spawnSparkle = (elapsed: number) => {
      if (sparkleSpots.length === 0) return;
      const spot = sparkleSpots[Math.floor(Math.random() * sparkleSpots.length)];
      sparkles.push({
        x: spot.x,
        y: spot.y,
        life: 0,
        maxLife: 0.55 + Math.random() * 0.5,
        size: (4 + Math.random() * 5) * dpr,
      });
      nextSparkleAt = elapsed + 0.14 + Math.random() * 0.24;
    };

    const drawSparkles = (dt: number) => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life += dt / s.maxLife;
        if (s.life >= 1) {
          sparkles.splice(i, 1);
          continue;
        }
        const fade = Math.sin(s.life * Math.PI);
        const size = s.size * fade;
        ctx.fillStyle = `rgba(255, 240, 210, ${fade * 0.9})`;
        ctx.fillRect(s.x - size, s.y - 0.5 * dpr, size * 2, 1 * dpr);
        ctx.fillRect(s.x - 0.5 * dpr, s.y - size, 1 * dpr, size * 2);
        ctx.fillStyle = `rgba(255, 255, 240, ${fade})`;
        ctx.fillRect(s.x - 1.2 * dpr, s.y - 1.2 * dpr, 2.4 * dpr, 2.4 * dpr);
      }
      ctx.restore();
    };

    const drawLogoImage = (alpha: number) => {
      if (!imgReady) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(logoImg, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

    const drawRingPulse = (elapsed: number) => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      // Tuned to sit on the Gray Method logo's outer gold ring
      const ringR = canvas.width * 0.375;
      const pointer = (elapsed * 0.75) % (Math.PI * 2);
      const arcSpan = Math.PI * 0.5;

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "rgba(240, 200, 130, 0.55)";
      ctx.lineWidth = 8 * dpr;
      ctx.shadowColor = "rgba(240, 200, 130, 0.9)";
      ctx.shadowBlur = 18 * dpr;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, pointer, pointer + arcSpan);
      ctx.stroke();
      ctx.restore();
    };

    const drawShimmerSweep = (elapsed: number) => {
      const cycle = (elapsed % 6.5) / 6.5;
      const x = (-0.2 + cycle * 1.4) * canvas.width;
      const width = canvas.width * 0.28;

      const grad = ctx.createLinearGradient(
        x - width / 2,
        0,
        x + width / 2,
        0
      );
      grad.addColorStop(0, "rgba(255, 240, 200, 0)");
      grad.addColorStop(0.5, "rgba(255, 240, 200, 0.2)");
      grad.addColorStop(1, "rgba(255, 240, 200, 0)");

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = grad;
      ctx.fillRect(x - width / 2, 0, width, canvas.height);
      ctx.restore();
    };

    const drawCenterGlow = (intensity: number, radiusScale: number) => {
      if (intensity <= 0) return;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = canvas.width * 0.18 * radiusScale;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, `rgba(255, 230, 170, ${intensity * 0.55})`);
      grad.addColorStop(0.5, `rgba(255, 200, 130, ${intensity * 0.25})`);
      grad.addColorStop(1, "rgba(255, 200, 130, 0)");
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

    const draw = (t: number) => {
      if (startTime === 0) startTime = t;
      const elapsed = (t - startTime) / 1000;
      const dt = lastTime === 0 ? 0.016 : (t - lastTime) / 1000;
      lastTime = t;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let phase: "converge" | "hold" | "explode" | "idle";
      let phaseT = 0;
      if (prefersReducedMotion || elapsed >= ASSEMBLY_TOTAL) {
        phase = "idle";
      } else if (elapsed < CONVERGE_DURATION) {
        phase = "converge";
        phaseT = elapsed / CONVERGE_DURATION;
      } else if (elapsed < CONVERGE_DURATION + HOLD_DURATION) {
        phase = "hold";
        phaseT = (elapsed - CONVERGE_DURATION) / HOLD_DURATION;
      } else {
        phase = "explode";
        phaseT = (elapsed - CONVERGE_DURATION - HOLD_DURATION) / EXPLODE_DURATION;
      }

      // ---- Particle phases (converge / hold / explode) ----
      if (phase !== "idle") {
        const pSize = 2.5 * dpr;
        for (const p of particles) {
          let px: number;
          let py: number;
          let opacity = 1;
          let brightness = 1;

          if (phase === "converge") {
            const e = easeInCubic(phaseT);
            px = p.sx + (p.cx - p.sx) * e;
            py = p.sy + (p.cy - p.sy) * e;
            opacity = 0.35 + e * 0.65;
          } else if (phase === "hold") {
            px = p.cx;
            py = p.cy;
            brightness = 1 + 0.7 * Math.sin(phaseT * Math.PI);
          } else {
            // explode
            const e = easeOutExpo(phaseT);
            px = p.cx + (p.hx - p.cx) * e;
            py = p.cy + (p.hy - p.cy) * e;
            opacity = Math.max(0, 1 - phaseT * 1.15);
            brightness = 1 + (1 - phaseT) * 0.7;
          }

          const cr = Math.min(255, Math.round(p.r * brightness));
          const cg = Math.min(255, Math.round(p.g * brightness));
          const cb = Math.min(255, Math.round(p.b * brightness));
          ctx.fillStyle =
            opacity >= 0.995
              ? `rgb(${cr},${cg},${cb})`
              : `rgba(${cr},${cg},${cb},${opacity})`;
          ctx.fillRect(px, py, pSize, pSize);
        }

        // Center bloom during hold and first half of explode
        if (phase === "hold") {
          drawCenterGlow(Math.sin(phaseT * Math.PI), 1);
        } else if (phase === "explode") {
          drawCenterGlow((1 - phaseT) * 0.9, 1 + phaseT * 0.6);
        }
      }

      // ---- Real logo image (crossfades in during explode, full in idle) ----
      if (phase === "explode") {
        drawLogoImage(phaseT);
      } else if (phase === "idle") {
        drawLogoImage(1);
      }

      // ---- Idle energy effects ----
      if (phase === "idle") {
        // Clip out the "GRAY METHOD" banner + subtitle band so flowing energy
        // never interferes with text readability. evenodd fill rule: a full
        // canvas rect + a banner-band rect means the banner band is excluded.
        const bannerY0 = canvas.height * 0.36;
        const bannerY1 = canvas.height * 0.68;

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.rect(0, bannerY0, canvas.width, bannerY1 - bannerY0);
        ctx.clip("evenodd");

        drawRingPulse(elapsed);
        drawShimmerSweep(elapsed);

        ctx.restore();

        // Sparkles layer on top (already filtered to non-banner spots)
        if (elapsed >= nextSparkleAt) {
          spawnSparkle(elapsed);
          if (Math.random() < 0.3) spawnSparkle(elapsed);
        }
        drawSparkles(dt);
      }

      rafId = requestAnimationFrame(draw);
    };

    logoImg.onload = () => {
      imgReady = true;
      buildParticles();
      rafId = requestAnimationFrame(draw);
    };
    logoImg.onerror = () => {
      console.warn("[LogoParticles] failed to load:", src);
    };
    logoImg.src = src;

    let resizeFrame = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(buildParticles);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", onResize);
    };
  }, [src]);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full aspect-square flex items-center justify-center ${className}`}
    >
      <canvas ref={canvasRef} aria-label="Gray Method logo" role="img" />
    </div>
  );
}
