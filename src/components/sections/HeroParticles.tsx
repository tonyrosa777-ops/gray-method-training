"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityTarget: number;
  opacitySpeed: number;
  type: "star" | "ember" | "glimmer";
  color: string;
  age: number;
  maxAge: number;
  glimmerPhase: number;
}

/* ------------------------------------------------------------------ */
/*  Colour palettes                                                     */
/* ------------------------------------------------------------------ */
const STAR_COLORS = [
  "rgba(200,169,110,",  // gold
  "rgba(180,176,170,",  // silver
  "rgba(242,237,228,",  // cream-white
];

const EMBER_COLORS = [
  "rgba(232,98,26,",    // orange accent
  "rgba(200,169,110,",  // gold
  "rgba(223,196,138,",  // gold-light
  "rgba(210,130,40,",   // amber
];

/* ------------------------------------------------------------------ */
/*  Factory helpers                                                     */
/* ------------------------------------------------------------------ */
function mkStar(w: number, h: number): Particle {
  const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.14,
    vy: (Math.random() - 0.5) * 0.14,
    size: Math.random() * 1.4 + 0.45,
    opacity: Math.random() * 0.48 + 0.06,
    opacityTarget: Math.random() * 0.7 + 0.12,
    opacitySpeed: Math.random() * 0.01 + 0.003,
    type: "star",
    color,
    age: 0,
    maxAge: Infinity,
    glimmerPhase: 0,
  };
}

function mkEmber(w: number, h: number): Particle {
  const color = EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)];
  return {
    x: Math.random() * w * 0.5,
    y: h + Math.random() * 40,
    vx: (Math.random() - 0.4) * 0.6,
    vy: -(Math.random() * 0.9 + 0.35),
    size: Math.random() * 2.6 + 0.8,
    opacity: 0,
    opacityTarget: Math.random() * 0.7 + 0.25,
    opacitySpeed: Math.random() * 0.022 + 0.01,
    type: "ember",
    color,
    age: 0,
    maxAge: Math.random() * 300 + 180,
    glimmerPhase: 0,
  };
}

function mkGlimmer(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h * 0.85,
    vx: 0,
    vy: 0,
    size: Math.random() * 11 + 6,
    opacity: 0,
    opacityTarget: 0.8,
    opacitySpeed: 0.04,
    type: "glimmer",
    color: "rgba(223,196,138,",
    age: 0,
    maxAge: Math.random() * 90 + 55,
    glimmerPhase: 0,
  };
}

/* ------------------------------------------------------------------ */
/*  Draw the 4-pointed glimmer star                                     */
/* ------------------------------------------------------------------ */
function drawGlimmer(ctx: CanvasRenderingContext2D, p: Particle) {
  const { x, y, size, opacity, color } = p;
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(x, y);

  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size * 0.12, size * 0.12);
    ctx.lineTo(0, size);
    ctx.lineTo(-size * 0.12, size * 0.12);
    ctx.closePath();
    ctx.fillStyle = color + "1)";
    ctx.fill();
    ctx.restore();
  }

  // Soft centre glow
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.45);
  g.addColorStop(0, color + "0.9)");
  g.addColorStop(1, color + "0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed particles
    for (let i = 0; i < 145; i++) particles.push(mkStar(w, h));
    for (let i = 0; i < 58; i++) {
      const e = mkEmber(w, h);
      // Stagger so they don't all appear at once
      e.y = Math.random() * h;
      e.age = Math.floor(Math.random() * e.maxAge * 0.6);
      e.opacity = Math.random() * e.opacityTarget;
      particles.push(e);
    }

    let glimmerCooldown = 0;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Occasionally spawn a glimmer
      glimmerCooldown--;
      if (glimmerCooldown <= 0 && Math.random() < 0.07) {
        particles.push(mkGlimmer(w, h));
        glimmerCooldown = 35 + Math.random() * 35;
      }

      // Cull dead particles
      particles = particles.filter(
        (p) => p.type === "star" || p.age <= p.maxAge
      );

      // Replenish embers
      const emberCount = particles.filter((p) => p.type === "ember").length;
      if (emberCount < 32) particles.push(mkEmber(w, h));

      for (const p of particles) {
        p.age++;
        p.x += p.vx;
        p.y += p.vy;

        /* -- STAR -- */
        if (p.type === "star") {
          // Wrap at edges
          if (p.x < -4) p.x = w + 4;
          if (p.x > w + 4) p.x = -4;
          if (p.y < -4) p.y = h + 4;
          if (p.y > h + 4) p.y = -4;

          // Twinkle — chase a target opacity, flip target when near
          const diff = p.opacityTarget - p.opacity;
          if (Math.abs(diff) < 0.012) {
            p.opacityTarget = Math.random() * 0.5 + 0.05;
          }
          p.opacity += diff * p.opacitySpeed * 9;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.max(0, Math.min(1, p.opacity)) + ")";
          ctx.fill();
        }

        /* -- EMBER -- */
        else if (p.type === "ember") {
          // Slight horizontal sway
          p.vx += (Math.random() - 0.5) * 0.025;
          p.vx *= 0.965;

          const lifeRatio = p.age / p.maxAge;
          if (lifeRatio < 0.18) {
            p.opacity = Math.min(p.opacity + p.opacitySpeed, p.opacityTarget);
          } else if (lifeRatio > 0.65) {
            p.opacity = Math.max(0, p.opacity - p.opacitySpeed * 1.8);
          }

          const clampedOp = Math.max(0, Math.min(1, p.opacity));

          // Soft glow halo
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4.2);
          glow.addColorStop(0, p.color + clampedOp * 0.7 + ")");
          glow.addColorStop(1, p.color + "0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4.2, 0, Math.PI * 2);
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.min(clampedOp * 1.8, 1) + ")";
          ctx.fill();
        }

        /* -- GLIMMER -- */
        else if (p.type === "glimmer") {
          p.glimmerPhase++;
          const lifeRatio = p.age / p.maxAge;
          if (lifeRatio < 0.28) {
            p.opacity = Math.min(p.opacity + p.opacitySpeed, p.opacityTarget);
          } else {
            p.opacity = Math.max(0, p.opacity - p.opacitySpeed * 0.65);
          }
          drawGlimmer(ctx, p);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
