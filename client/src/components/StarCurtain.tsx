/**
 * SoundVision Events — Star Curtain Overlay
 *
 * Three depth layers with organic floating/drifting motion on every star,
 * higher density, parallax scroll, and transmitter flash events.
 *
 * Layer 0 (far):   small dim dust  — slow drift, 0.10x parallax
 * Layer 1 (mid):   medium stars    — medium drift, 0.30x parallax
 * Layer 2 (near):  bright stars    — faster drift, 0.55x parallax
 * Flash pool:      random stars burst bright with cross-sparkle glow
 *
 * Drift model: each star has an independent sinusoidal x+y wander
 * with a unique frequency and amplitude, giving a gentle floating feel.
 */
import { useEffect, useRef } from "react";

interface Star {
  x: number;          // base x position (canvas coords)
  y: number;          // base y position (page coords)
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
  layer: number;
  // Drift parameters
  driftAmpX: number;   // horizontal drift amplitude (px)
  driftAmpY: number;   // vertical drift amplitude (px)
  driftFreqX: number;  // horizontal drift frequency (rad/s)
  driftFreqY: number;  // vertical drift frequency (rad/s)
  driftPhaseX: number; // phase offset
  driftPhaseY: number;
}

interface Flash {
  starIndex: number;
  startTime: number;
  duration: number;
  peakOpacity: number;
  size: number;
}

const STAR_COLORS = [
  "255, 255, 255",   // white
  "200, 220, 255",   // cool white
  "255, 240, 220",   // warm white
  "0, 200, 255",     // cyan (brand)
  "180, 200, 255",   // pale blue
  "255, 200, 150",   // soft amber
  "255, 255, 180",   // warm yellow
];

// Parallax scroll multipliers per layer
const LAYER_SPEEDS = [0.10, 0.30, 0.55];

// Drift amplitude ranges per layer (pixels)
const DRIFT_AMP = [
  { x: [1.5, 4.0],  y: [1.0, 3.0]  },  // far  — subtle
  { x: [3.0, 8.0],  y: [2.0, 6.0]  },  // mid  — moderate
  { x: [5.0, 14.0], y: [3.0, 10.0] },  // near — noticeable
];

// Drift frequency ranges per layer (rad/s) — lower = slower float
const DRIFT_FREQ = [
  { x: [0.08, 0.22], y: [0.06, 0.18] },  // far
  { x: [0.12, 0.30], y: [0.10, 0.25] },  // mid
  { x: [0.18, 0.40], y: [0.14, 0.35] },  // near
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function StarCurtain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const flashesRef = useRef<Flash[]>([]);
  const scrollRef = useRef<number>(0);
  const lastFlashTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    scrollRef.current = window.scrollY;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      generateStars();
    };

    const generateStars = () => {
      const w = window.innerWidth;
      const pageH = document.documentElement.scrollHeight;
      // Higher density: 1 star per ~380px² (was 600)
      const area = w * pageH;
      const count = Math.floor(area / 380);
      const stars: Star[] = [];

      for (let i = 0; i < count; i++) {
        // Layer distribution: 55% far, 30% mid, 15% near
        const roll = Math.random();
        const layer = roll < 0.55 ? 0 : roll < 0.85 ? 1 : 2;

        const isAccent = Math.random() < 0.10;

        const sizeRange = [
          [0.3, 0.8],   // far
          [0.6, 1.3],   // mid
          [1.0, 2.0],   // near
        ][layer];

        const opacityRange = [
          [0.07, 0.30],  // far
          [0.18, 0.55],  // mid
          [0.38, 0.90],  // near
        ][layer];

        const da = DRIFT_AMP[layer];
        const df = DRIFT_FREQ[layer];

        stars.push({
          x: Math.random() * w,
          y: Math.random() * pageH,
          size: rand(sizeRange[0], sizeRange[1]),
          baseOpacity: rand(opacityRange[0], opacityRange[1]),
          twinkleSpeed: 0.3 + Math.random() * 2.2,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: isAccent
            ? STAR_COLORS[3 + Math.floor(Math.random() * 4)]
            : STAR_COLORS[Math.floor(Math.random() * 3)],
          layer,
          driftAmpX:  rand(da.x[0], da.x[1]),
          driftAmpY:  rand(da.y[0], da.y[1]),
          driftFreqX: rand(df.x[0], df.x[1]),
          driftFreqY: rand(df.y[0], df.y[1]),
          driftPhaseX: Math.random() * Math.PI * 2,
          driftPhaseY: Math.random() * Math.PI * 2,
        });
      }

      starsRef.current = stars;
      flashesRef.current = [];
    };

    const spawnFlash = (t: number) => {
      const stars = starsRef.current;
      if (stars.length === 0) return;

      const h = window.innerHeight;
      const scrollY = scrollRef.current;

      const visibleIndices: number[] = [];
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const parallaxOffset = scrollY * LAYER_SPEEDS[star.layer];
        const screenY = star.y - scrollY + (scrollY - parallaxOffset);
        if (screenY >= -40 && screenY <= h + 40) {
          visibleIndices.push(i);
        }
      }
      if (visibleIndices.length === 0) return;

      const idx = visibleIndices[Math.floor(Math.random() * visibleIndices.length)];
      const star = stars[idx];

      if (flashesRef.current.some(f => f.starIndex === idx)) return;

      flashesRef.current.push({
        starIndex: idx,
        startTime: t,
        duration: 0.4 + Math.random() * 0.9,
        peakOpacity: 0.65 + Math.random() * 0.35,
        size: (star.size + 1) * (3 + Math.random() * 5),
      });
    };

    const draw = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scrollY = scrollRef.current;
      const t = time / 1000;

      // Spawn flashes
      const timeSinceLast = t - lastFlashTimeRef.current;
      const nextInterval = 0.10 + Math.random() * 0.22;
      if (timeSinceLast > nextInterval) {
        const burst = Math.random() < 0.35 ? 2 : 1;
        for (let b = 0; b < burst; b++) spawnFlash(t);
        lastFlashTimeRef.current = t;
      }

      // Expire old flashes
      flashesRef.current = flashesRef.current.filter(
        f => t - f.startTime < f.duration
      );

      ctx.clearRect(0, 0, w, h);

      const flashMap = new Map<number, Flash>();
      for (const f of flashesRef.current) flashMap.set(f.starIndex, f);

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i];

        // Parallax offset from scroll
        const parallaxOffset = scrollY * LAYER_SPEEDS[star.layer];
        const baseScreenY = star.y - scrollY + (scrollY - parallaxOffset);

        // Skip if off-screen (with generous margin for drift)
        if (baseScreenY < -60 || baseScreenY > h + 60) continue;

        // Organic drift: sinusoidal wander around base position
        const driftX = star.driftAmpX * Math.sin(t * star.driftFreqX + star.driftPhaseX);
        const driftY = star.driftAmpY * Math.sin(t * star.driftFreqY + star.driftPhaseY);

        const screenX = star.x + driftX;
        const screenY = baseScreenY + driftY;

        // Twinkle
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const opacityMultiplier = 0.28 + (twinkle + 1) * 0.36;
        let opacity = star.baseOpacity * opacityMultiplier;

        // Flash handling
        const flash = flashMap.get(i);
        if (flash) {
          const elapsed = t - flash.startTime;
          const progress = elapsed / flash.duration;

          let envelope: number;
          if (progress < 0.2) {
            envelope = progress / 0.2;
          } else if (progress < 0.6) {
            envelope = 1.0;
          } else {
            envelope = 1.0 - (progress - 0.6) / 0.4;
          }

          const flashOpacity = flash.peakOpacity * envelope;
          const gr = flash.size * envelope;

          if (gr > 0.5) {
            const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, gr);
            gradient.addColorStop(0, `rgba(${star.color}, ${flashOpacity * 0.9})`);
            gradient.addColorStop(0.3, `rgba(${star.color}, ${flashOpacity * 0.4})`);
            gradient.addColorStop(1, `rgba(${star.color}, 0)`);
            ctx.beginPath();
            ctx.arc(screenX, screenY, gr, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            if (envelope > 0.5) {
              const arm = gr * 0.7;
              ctx.strokeStyle = `rgba(${star.color}, ${flashOpacity * 0.6})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(screenX - arm, screenY); ctx.lineTo(screenX + arm, screenY);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(screenX, screenY - arm); ctx.lineTo(screenX, screenY + arm);
              ctx.stroke();
              const diag = arm * 0.5;
              ctx.strokeStyle = `rgba(${star.color}, ${flashOpacity * 0.3})`;
              ctx.beginPath();
              ctx.moveTo(screenX - diag, screenY - diag); ctx.lineTo(screenX + diag, screenY + diag);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(screenX + diag, screenY - diag); ctx.lineTo(screenX - diag, screenY + diag);
              ctx.stroke();
            }

            opacity = Math.max(opacity, flashOpacity);
          }
        }

        // Draw star dot
        ctx.shadowColor = `rgba(${star.color}, ${opacity * 0.5})`;
        ctx.shadowBlur = star.layer === 2 ? 5 : 2;
        ctx.beginPath();
        ctx.arc(screenX, screenY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Soft glow halo for bright near-layer stars
        if (star.layer === 2 && star.baseOpacity > 0.45) {
          const gr2 = star.size * 3.2;
          const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, gr2);
          gradient.addColorStop(0, `rgba(${star.color}, ${opacity * 0.35})`);
          gradient.addColorStop(1, `rgba(${star.color}, 0)`);
          ctx.beginPath();
          ctx.arc(screenX, screenY, gr2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();
    animationRef.current = requestAnimationFrame(draw);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    };
    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 300);
    });
    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
}
