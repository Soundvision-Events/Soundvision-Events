/**
 * SoundVision Events — Particle Background
 * Canvas-based ambient particle system matching the YouTube reference:
 * https://www.youtube.com/watch?v=iGpuQ0ioPrM
 *
 * Deep teal/black radial vignette, glowing white-cyan particles drifting
 * upward with organic sinusoidal sway, parallax depth layers, and smooth
 * fade-in/fade-out lifecycle. Runs at 60fps via requestAnimationFrame.
 */
import { useEffect, useRef } from "react";

interface ParticleProps {
  /** Base tint for the central glow — default deep teal */
  tint?: string;
  /** Number of particles — default 220 */
  count?: number;
  /** Overall opacity multiplier 0–1 — default 1 */
  opacity?: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;    // visual size (depth proxy)
  speedY: number;    // upward drift speed
  speedX: number;    // base horizontal drift
  sineAmp: number;   // horizontal sway amplitude
  sineFreq: number;  // horizontal sway frequency
  sinePhase: number; // horizontal sway phase offset
  alpha: number;     // current opacity
  maxAlpha: number;  // peak opacity for this particle
  fadeState: "in" | "hold" | "out";
  fadeTimer: number;
  holdDuration: number;
}

function makeParticle(W: number, H: number, fromBottom = false): Particle {
  const depth = Math.random(); // 0 = far, 1 = near
  const radius = 0.5 + depth * 3.5;
  const speedY = 0.25 + depth * 0.85;
  const maxAlpha = 0.15 + depth * 0.65;
  return {
    x: Math.random() * W,
    y: fromBottom ? H + Math.random() * H * 0.3 : Math.random() * H,
    radius,
    speedY,
    speedX: (Math.random() - 0.5) * 0.15,
    sineAmp: 0.4 + Math.random() * 1.8,
    sineFreq: 0.003 + Math.random() * 0.008,
    sinePhase: Math.random() * Math.PI * 2,
    alpha: fromBottom ? 0 : Math.random() * maxAlpha,
    maxAlpha,
    fadeState: "in",
    fadeTimer: 0,
    holdDuration: 180 + Math.random() * 300,
  };
}

export default function ParticleBackground({
  tint = "#0a4b5a",
  count = 220,
  opacity = 1,
}: ParticleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let time = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      // Rebuild particles on resize
      particles = Array.from({ length: count }, () => makeParticle(W, H, false));
    };

    const draw = () => {
      time++;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Draw radial vignette background
      const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.75);
      grad.addColorStop(0, tint + "cc");   // teal centre
      grad.addColorStop(0.45, tint + "55");
      grad.addColorStop(1, "#00000000");   // black edges
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Update & draw particles
      for (const p of particles) {
        // Move upward + horizontal drift
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(time * p.sineFreq + p.sinePhase) * p.sineAmp * 0.04;

        // Fade lifecycle
        p.fadeTimer++;
        if (p.fadeState === "in") {
          p.alpha = Math.min(p.alpha + 0.008, p.maxAlpha);
          if (p.alpha >= p.maxAlpha) { p.fadeState = "hold"; p.fadeTimer = 0; }
        } else if (p.fadeState === "hold") {
          if (p.fadeTimer > p.holdDuration) { p.fadeState = "out"; p.fadeTimer = 0; }
        } else {
          p.alpha = Math.max(p.alpha - 0.006, 0);
        }

        // Recycle when off-screen or fully faded
        if (p.y < -p.radius * 4 || p.alpha <= 0) {
          const fresh = makeParticle(W, H, true);
          Object.assign(p, fresh);
        }

        // Draw glowing circle
        ctx.save();
        ctx.globalAlpha = p.alpha * opacity;
        ctx.shadowBlur = p.radius * 6;
        ctx.shadowColor = "rgba(180, 240, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220, 248, 255, 1)";
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [tint, count, opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
