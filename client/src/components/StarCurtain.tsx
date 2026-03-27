/**
 * SoundVision Events — Star Curtain Overlay with Parallax + Flash Events
 *
 * Three depth layers with medium-sized stars (between the old tiny galaxy
 * and the original large stars). Scattered among the regular stars are
 * "transmitter" flash events: random stars that suddenly burst bright,
 * hold for a moment, then fade — like signal flashes or camera flickers.
 *
 * Layer 0 (far):   small dim dust  — 0.15x parallax
 * Layer 1 (mid):   medium stars    — 0.35x parallax
 * Layer 2 (near):  bright stars    — 0.6x  parallax
 * Flash pool:      any layer can flash — burst bright then decay
 */
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
  layer: number;
}

interface Flash {
  starIndex: number;   // which star is flashing
  startTime: number;   // when the flash began (seconds)
  duration: number;    // total flash duration (seconds)
  peakOpacity: number; // how bright at peak
  size: number;        // flash glow radius
}

const STAR_COLORS = [
  "255, 255, 255",   // white
  "200, 220, 255",   // cool white
  "255, 240, 220",   // warm white
  "0, 200, 255",     // cyan (brand)
  "180, 200, 255",   // pale blue
  "255, 200, 150",   // soft amber
  "255, 255, 180",   // warm yellow flash
];

const LAYER_SPEEDS = [0.15, 0.35, 0.6];

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
      // Medium density — 1 star per ~600px² (between old 400 and 1200)
      const area = w * pageH;
      const count = Math.floor(area / 600);
      const stars: Star[] = [];

      for (let i = 0; i < count; i++) {
        // Layer distribution: 60% far, 28% mid, 12% near
        const roll = Math.random();
        const layer = roll < 0.60 ? 0 : roll < 0.88 ? 1 : 2;

        const isAccent = Math.random() < 0.08;

        // Medium sizes — noticeably bigger than the tiny galaxy version
        // but not as large as the original
        const sizeRange = [
          [0.3, 0.75],   // far: small but visible dots
          [0.6, 1.2],    // mid: clear medium stars
          [0.9, 1.8],    // near: bright prominent stars
        ][layer];

        const opacityRange = [
          [0.08, 0.28],  // far
          [0.20, 0.50],  // mid
          [0.40, 0.85],  // near
        ][layer];

        stars.push({
          x: Math.random() * w,
          y: Math.random() * pageH,
          size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
          baseOpacity: opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]),
          twinkleSpeed: 0.3 + Math.random() * 2.0,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: isAccent
            ? STAR_COLORS[3 + Math.floor(Math.random() * 4)]
            : STAR_COLORS[Math.floor(Math.random() * 3)],
          layer,
        });
      }

      starsRef.current = stars;
      flashesRef.current = [];
    };

    // Spawn a new transmitter flash on a random visible star
    const spawnFlash = (t: number) => {
      const stars = starsRef.current;
      if (stars.length === 0) return;

      const h = window.innerHeight;
      const scrollY = scrollRef.current;

      // Pick a random star that is currently visible on screen
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

      // Don't double-flash the same star
      const alreadyFlashing = flashesRef.current.some(f => f.starIndex === idx);
      if (alreadyFlashing) return;

      flashesRef.current.push({
        starIndex: idx,
        startTime: t,
        duration: 0.4 + Math.random() * 0.8,   // 0.4–1.2 seconds
        peakOpacity: 0.7 + Math.random() * 0.3, // 0.7–1.0
        size: (star.size + 1) * (3 + Math.random() * 4), // glow radius
      });
    };

    const draw = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scrollY = scrollRef.current;
      const t = time / 1000;

      // Spawn flashes at random intervals (avg every 0.15–0.35 seconds)
      const timeSinceLast = t - lastFlashTimeRef.current;
      const nextInterval = 0.12 + Math.random() * 0.25;
      if (timeSinceLast > nextInterval) {
        // Spawn 1–3 flashes at once for a burst feel
        const burst = Math.random() < 0.3 ? 2 : 1;
        for (let b = 0; b < burst; b++) spawnFlash(t);
        lastFlashTimeRef.current = t;
      }

      // Remove expired flashes
      flashesRef.current = flashesRef.current.filter(
        f => t - f.startTime < f.duration
      );

      ctx.clearRect(0, 0, w, h);

      // Build a quick lookup for active flashes by star index
      const flashMap = new Map<number, Flash>();
      for (const f of flashesRef.current) {
        flashMap.set(f.starIndex, f);
      }

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i];

        const parallaxOffset = scrollY * LAYER_SPEEDS[star.layer];
        const screenY = star.y - scrollY + (scrollY - parallaxOffset);

        if (screenY < -40 || screenY > h + 40) continue;

        // Base twinkle
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const opacityMultiplier = 0.3 + (twinkle + 1) * 0.35;
        let opacity = star.baseOpacity * opacityMultiplier;

        // Check if this star is flashing
        const flash = flashMap.get(i);
        if (flash) {
          const elapsed = t - flash.startTime;
          const progress = elapsed / flash.duration;

          // Envelope: quick rise (0→0.2), hold (0.2→0.6), slow decay (0.6→1.0)
          let envelope: number;
          if (progress < 0.2) {
            envelope = progress / 0.2; // rise
          } else if (progress < 0.6) {
            envelope = 1.0; // hold
          } else {
            envelope = 1.0 - (progress - 0.6) / 0.4; // decay
          }

          const flashOpacity = flash.peakOpacity * envelope;

          // Draw the flash glow halo
          const gx = star.x;
          const gy = screenY;
          const gr = flash.size * envelope;

          if (gr > 0.5) {
            const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
            gradient.addColorStop(0, `rgba(${star.color}, ${flashOpacity * 0.9})`);
            gradient.addColorStop(0.3, `rgba(${star.color}, ${flashOpacity * 0.4})`);
            gradient.addColorStop(1, `rgba(${star.color}, 0)`);
            ctx.beginPath();
            ctx.arc(gx, gy, gr, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Cross sparkle on flash peak
            if (envelope > 0.5) {
              const arm = gr * 0.7;
              ctx.strokeStyle = `rgba(${star.color}, ${flashOpacity * 0.6})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(gx - arm, gy); ctx.lineTo(gx + arm, gy);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(gx, gy - arm); ctx.lineTo(gx, gy + arm);
              ctx.stroke();
              // Diagonal arms (shorter)
              const diag = arm * 0.5;
              ctx.strokeStyle = `rgba(${star.color}, ${flashOpacity * 0.3})`;
              ctx.beginPath();
              ctx.moveTo(gx - diag, gy - diag); ctx.lineTo(gx + diag, gy + diag);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(gx + diag, gy - diag); ctx.lineTo(gx - diag, gy + diag);
              ctx.stroke();
            }

            opacity = Math.max(opacity, flashOpacity);
          }
        }

        // Draw the star dot
        ctx.shadowColor = `rgba(${star.color}, ${opacity * 0.5})`;
        ctx.shadowBlur = star.layer === 2 ? 4 : 2;
        ctx.beginPath();
        ctx.arc(star.x, screenY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Subtle glow for near-layer bright stars
        if (star.layer === 2 && star.baseOpacity > 0.5) {
          const gr2 = star.size * 2.8;
          const gradient = ctx.createRadialGradient(
            star.x, screenY, 0,
            star.x, screenY, gr2
          );
          gradient.addColorStop(0, `rgba(${star.color}, ${opacity * 0.3})`);
          gradient.addColorStop(1, `rgba(${star.color}, 0)`);
          ctx.beginPath();
          ctx.arc(star.x, screenY, gr2, 0, Math.PI * 2);
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
