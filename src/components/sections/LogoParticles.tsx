"use client";

import { useEffect, useRef } from "react";

/**
 * LogoParticles
 *
 * Phased canvas animation of the Gray Method logo:
 *   1. CONVERGE  — particles rush from outside the canvas toward center
 *   2. HOLD      — dense bright cluster at center, energy buildup
 *   3. EXPLODE   — burst outward into exact logo positions (easeOutExpo)
 *   4. IDLE      — crisp logo with continuous energy effects:
 *                   · rotating gold pulse traveling around the ring
 *                   · horizontal shimmer sweep every ~6 seconds
 *                   · random sparkle bursts on the bright gold pixels (stars, dumbbell)
 *                   · subtle per-star twinkle via sine-phase brightness modulation
 *
 * Particles never drift off home during idle — that's what caused the fuzziness
 * in the previous version. All idle motion is color/brightness modulation and a
 * separate additive sparkle layer drawn on top.
 *
 * prefers-reduced-motion skips assembly and renders the crisp idle state immediately.
 */

interface Particle {
  hx: number;       // home x (int, canvas internal coords)
  hy: number;       // home y
  sx: number;       // scatter origin x (offscreen)
  sy: number;       // scatter origin y
  cx: number;       // canvas center x
  cy: number;       // canvas center y
  r: number;
  g: number;
  b: number;
  brightness: number;
  rNorm: number;    // distance from center, normalized 0..1
  angle: number;    // -π..π
  phase: number;    // random offset for twinkle
  isRing: boolean;  // particle lives on the outer gold ring
  isBright: boolean;// bright highlight pixel (star/dumbbell edge)
}

interface Sparkle {
  x: number;
  y: number;
  life: number;   // 0..1
  maxLife: number;
  size: number;
}

const CONVERGE_DURATION = 0.7;
const HOLD_DURATION = 0.25;
const EXPLODE_DURATION = 1.05;
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

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let brightIndices: number[] = []; // cached for sparkle spawning
    const sparkles: Sparkle[] = [];
    let rafId = 0;
    let startTime = 0;
    let lastTime = 0;
    let nextSparkleAt = 0;
    let imgData: Uint8ClampedArray | null = null;
    const sampleSize = 260;
    const step = 2;

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
      if (!imgData) return;
      const size = sizeCanvas();
      const scale = (size * dpr) / sampleSize;
      const cx = (size * dpr) / 2;
      const cy = (size * dpr) / 2;
      const maxR = Math.hypot(cx, cy);

      const next: Particle[] = [];

      for (let y = 0; y < sampleSize; y += step) {
        for (let x = 0; x < sampleSize; x += step) {
          const i = (y * sampleSize + x) * 4;
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          if (a < 120) continue;
          const brightness = (r + g + b) / 3;
          if (brightness < 48) continue;

          const hx = Math.round(x * scale);
          const hy = Math.round(y * scale);
          const dxs = hx - cx;
          const dys = hy - cy;
          const radius = Math.hypot(dxs, dys);
          const rNorm = radius / maxR;
          const angle = Math.atan2(dys, dxs);

          // Scatter origin: random angle, far outside canvas
          const scatterAngle = Math.random() * Math.PI * 2;
          const scatterDist = (size * dpr) * (0.85 + Math.random() * 0.6);
          const sx = cx + Math.cos(scatterAngle) * scatterDist;
          const sy = cy + Math.sin(scatterAngle) * scatterDist;

          next.push({
            hx,
            hy,
            sx,
            sy,
            cx,
            cy,
            r,
            g,
            b,
            brightness,
            rNorm,
            angle,
            phase: Math.random() * Math.PI * 2,
            isRing: rNorm > 0.62 && rNorm < 0.78,
            isBright: brightness > 195,
          });
        }
      }
      particles = next;
      brightIndices = [];
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].isBright) brightIndices.push(i);
      }
      startTime = performance.now();
      lastTime = 0;
      nextSparkleAt = ASSEMBLY_TOTAL + 0.2;
      sparkles.length = 0;
    };

    const spawnSparkle = (elapsed: number) => {
      if (brightIndices.length === 0) return;
      const idx = brightIndices[Math.floor(Math.random() * brightIndices.length)];
      const p = particles[idx];
      sparkles.push({
        x: p.hx,
        y: p.hy,
        life: 0,
        maxLife: 0.55 + Math.random() * 0.45,
        size: (3.5 + Math.random() * 4.5) * dpr,
      });
      nextSparkleAt = elapsed + 0.14 + Math.random() * 0.22;
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
        const fade = Math.sin(s.life * Math.PI); // 0→1→0
        const size = s.size * fade;
        ctx.fillStyle = `rgba(255, 240, 200, ${fade * 0.85})`;
        // Cross-shaped sparkle
        ctx.fillRect(s.x - size, s.y - 0.5 * dpr, size * 2, 1 * dpr);
        ctx.fillRect(s.x - 0.5 * dpr, s.y - size, 1 * dpr, size * 2);
        // Center hot dot
        ctx.fillStyle = `rgba(255, 255, 240, ${fade})`;
        ctx.fillRect(s.x - 1 * dpr, s.y - 1 * dpr, 2 * dpr, 2 * dpr);
      }
      ctx.restore();
    };

    const draw = (t: number) => {
      if (startTime === 0) startTime = t;
      const elapsed = (t - startTime) / 1000;
      const dt = lastTime === 0 ? 0.016 : (t - lastTime) / 1000;
      lastTime = t;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Resolve animation phase
      let phaseName: "converge" | "hold" | "explode" | "idle";
      let phaseT = 0;
      if (prefersReducedMotion || elapsed >= ASSEMBLY_TOTAL) {
        phaseName = "idle";
      } else if (elapsed < CONVERGE_DURATION) {
        phaseName = "converge";
        phaseT = elapsed / CONVERGE_DURATION;
      } else if (elapsed < CONVERGE_DURATION + HOLD_DURATION) {
        phaseName = "hold";
        phaseT = (elapsed - CONVERGE_DURATION) / HOLD_DURATION;
      } else {
        phaseName = "explode";
        phaseT = (elapsed - CONVERGE_DURATION - HOLD_DURATION) / EXPLODE_DURATION;
      }

      // Idle energy effect parameters
      // Rotating ring pulse: a bright arc travels clockwise around the ring
      const ringPointer = ((elapsed * 0.85) % (Math.PI * 2)) - Math.PI;
      const ringArcHalfWidth = 0.55; // radians

      // Horizontal shimmer sweep — one full pass every ~6 seconds
      const shimmerCycle = (elapsed % 6.5) / 6.5; // 0..1
      const shimmerXpx = (-0.15 + shimmerCycle * 1.3) * canvas.width;
      const shimmerHalfWidth = canvas.width * 0.16;

      // Hold-phase center bloom brightness
      const holdPulse = phaseName === "hold" ? 1 + 0.8 * Math.sin(phaseT * Math.PI) : 1;

      const pSize = 2 * dpr;

      for (const p of particles) {
        let px: number;
        let py: number;
        let opacity = 1;
        let brightness = 1;

        if (phaseName === "converge") {
          const e = easeInCubic(phaseT);
          px = p.sx + (p.cx - p.sx) * e;
          py = p.sy + (p.cy - p.sy) * e;
          opacity = 0.35 + e * 0.65;
          brightness = 0.85 + e * 0.5;
        } else if (phaseName === "hold") {
          px = p.cx;
          py = p.cy;
          brightness = holdPulse;
          opacity = 1;
        } else if (phaseName === "explode") {
          const e = easeOutExpo(phaseT);
          px = p.cx + (p.hx - p.cx) * e;
          py = p.cy + (p.hy - p.cy) * e;
          // Flash at start of explosion, settle to normal
          brightness = 1 + (1 - phaseT) * 0.9;
        } else {
          // IDLE — particles stay pixel-perfect at home
          px = p.hx;
          py = p.hy;

          // Rotating ring pulse
          if (p.isRing) {
            let angDist = p.angle - ringPointer;
            while (angDist > Math.PI) angDist -= Math.PI * 2;
            while (angDist < -Math.PI) angDist += Math.PI * 2;
            const absDist = Math.abs(angDist);
            if (absDist < ringArcHalfWidth) {
              const boost = 1 - absDist / ringArcHalfWidth;
              brightness += boost * 1.1;
            }
          }

          // Horizontal shimmer
          const dxShim = Math.abs(p.hx - shimmerXpx);
          if (dxShim < shimmerHalfWidth) {
            const boost = 1 - dxShim / shimmerHalfWidth;
            brightness = Math.max(brightness, 1 + boost * 0.6);
          }

          // Bright-pixel twinkle (stars, dumbbell edges)
          if (p.isBright) {
            brightness += Math.sin(elapsed * 2.2 + p.phase) * 0.2 + 0.08;
          }
        }

        const cr = Math.min(255, Math.round(p.r * brightness));
        const cg = Math.min(255, Math.round(p.g * brightness));
        const cb = Math.min(255, Math.round(p.b * brightness));
        ctx.fillStyle =
          opacity >= 0.999
            ? `rgb(${cr},${cg},${cb})`
            : `rgba(${cr},${cg},${cb},${opacity})`;
        ctx.fillRect(px, py, pSize, pSize);
      }

      // Sparkles only during idle
      if (phaseName === "idle") {
        if (elapsed >= nextSparkleAt) {
          spawnSparkle(elapsed);
          // Occasionally burst two at once for drama
          if (Math.random() < 0.25) spawnSparkle(elapsed);
        }
        drawSparkles(dt);
      }

      rafId = requestAnimationFrame(draw);
    };

    const img = new Image();
    img.onload = () => {
      const off = document.createElement("canvas");
      off.width = sampleSize;
      off.height = sampleSize;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, 0, 0, sampleSize, sampleSize);
      imgData = octx.getImageData(0, 0, sampleSize, sampleSize).data;
      buildParticles();
      startTime = 0;
      lastTime = 0;
      rafId = requestAnimationFrame(draw);
    };
    img.onerror = () => {
      console.warn("[LogoParticles] Failed to load logo image:", src);
    };
    img.src = src;

    let resizeFrame = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        buildParticles();
        startTime = 0;
        lastTime = 0;
      });
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
