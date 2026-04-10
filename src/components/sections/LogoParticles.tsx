"use client";

import { useEffect, useRef } from "react";

/**
 * LogoParticles
 *
 * Renders the Gray Method logo as a field of colored particles that scatter
 * in from random positions, assemble into the logo shape, then gently breathe.
 *
 * - Samples the source logo pixel-by-pixel into an offscreen canvas.
 * - Each bright pixel becomes a particle with a "home" target position.
 * - Particles spring toward home with damping, then drift in a sine oscillation.
 * - prefers-reduced-motion renders the logo once, static.
 * - Handles resize by rebuilding the particle field to the new canvas size.
 */

interface Particle {
  hx: number; // home x (target)
  hy: number; // home y (target)
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  phase: number; // random phase for breathing oscillation
}

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
    let rafId = 0;
    let startTime = 0;
    let imgData: Uint8ClampedArray | null = null;
    const sampleSize = 200; // offscreen sampling resolution
    const step = 2;         // sample every Nth pixel

    const sizeCanvas = () => {
      const rect = wrapper.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      return size;
    };

    const buildParticles = () => {
      if (!imgData) return;
      const size = sizeCanvas();
      const scale = (size * dpr) / sampleSize;
      const next: Particle[] = [];

      for (let y = 0; y < sampleSize; y += step) {
        for (let x = 0; x < sampleSize; x += step) {
          const i = (y * sampleSize + x) * 4;
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          if (a < 140) continue;

          // Skip the dark badge interior — only keep gold/cream particles
          const brightness = (r + g + b) / 3;
          if (brightness < 55) continue;

          const hx = x * scale;
          const hy = y * scale;

          next.push({
            hx,
            hy,
            x: prefersReducedMotion ? hx : Math.random() * size * dpr,
            y: prefersReducedMotion ? hy : Math.random() * size * dpr,
            vx: 0,
            vy: 0,
            color: `rgb(${r},${g},${b})`,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      particles = next;
      startTime = performance.now();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = (t - startTime) / 1000;
      const drifting = elapsed > 2;

      for (const p of particles) {
        if (!prefersReducedMotion) {
          // Spring toward home with damping
          const dx = p.hx - p.x;
          const dy = p.hy - p.y;
          p.vx = (p.vx + dx * 0.045) * 0.86;
          p.vy = (p.vy + dy * 0.045) * 0.86;
          p.x += p.vx;
          p.y += p.vy;

          // After assembled, add gentle breathing oscillation
          if (drifting) {
            p.x += Math.sin(elapsed * 1.1 + p.phase) * 0.4 * dpr;
            p.y += Math.cos(elapsed * 1.3 + p.phase) * 0.4 * dpr;
          }
        }
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2 * dpr, 2 * dpr);
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
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
      rafId = requestAnimationFrame(draw);
    };
    img.onerror = () => {
      // Fallback: draw nothing, leave canvas blank
      console.warn("[LogoParticles] Failed to load logo image:", src);
    };
    img.src = src;

    let resizeFrame = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        buildParticles();
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
