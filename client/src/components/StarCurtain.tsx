/**
 * SoundVision Events — Star Curtain Overlay with Parallax
 * An animated curtain of twinkling stars/glitter particles with
 * multi-layer parallax: stars are assigned to depth layers that
 * scroll at different speeds, creating a 3D depth illusion.
 *
 * Layer 0 (far):   tiny, dim stars — move at 0.15x scroll speed
 * Layer 1 (mid):   medium stars   — move at 0.35x scroll speed
 * Layer 2 (near):  bright stars   — move at 0.6x scroll speed
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
  layer: number; // 0 = far, 1 = mid, 2 = near
}

const STAR_COLORS = [
  "255, 255, 255",     // white
  "200, 220, 255",     // cool white
  "255, 240, 220",     // warm white
  "0, 200, 255",       // cyan (brand)
  "180, 200, 255",     // pale blue
  "255, 200, 150",     // soft amber
];

// Parallax speed multipliers per layer (0 = no movement, 1 = full scroll)
const LAYER_SPEEDS = [0.15, 0.35, 0.6];

export default function StarCurtain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Track scroll position smoothly
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
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
      // Generate stars over the full page height so they exist everywhere
      const area = w * pageH;
      const count = Math.floor(area / 400);
      const stars: Star[] = [];

      for (let i = 0; i < count; i++) {
        // Assign layer: 70% far (tiny dust), 22% mid, 8% near (still small)
        const roll = Math.random();
        const layer = roll < 0.70 ? 0 : roll < 0.92 ? 1 : 2;

        const isAccent = Math.random() < 0.06;

        // Size and brightness scale with layer
        const sizeRange = [
          [0.15, 0.4],   // far: dust-like pinpoints
          [0.3, 0.7],    // mid: small dots
          [0.5, 1.1],    // near: slightly brighter but still small
        ][layer];
        const opacityRange = [
          [0.06, 0.20],  // far: very faint dust
          [0.15, 0.40],  // mid: subtle
          [0.35, 0.80],  // near: visible but not overpowering
        ][layer];

        stars.push({
          x: Math.random() * w,
          y: Math.random() * pageH,
          size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
          baseOpacity: opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]),
          twinkleSpeed: 0.4 + Math.random() * 2.5,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: isAccent
            ? STAR_COLORS[3 + Math.floor(Math.random() * 3)]
            : STAR_COLORS[Math.floor(Math.random() * 3)],
          layer,
        });
      }

      starsRef.current = stars;
    };

    const draw = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scrollY = scrollRef.current;
      const t = time / 1000;

      ctx.clearRect(0, 0, w, h);

      for (const star of starsRef.current) {
        // Parallax: offset the star's y position based on its layer speed
        // Stars at layer 0 barely move, layer 2 moves almost with scroll
        const parallaxOffset = scrollY * LAYER_SPEEDS[star.layer];
        const screenY = star.y - scrollY + (scrollY - parallaxOffset);

        // Only draw if the star is visible on screen (with some margin)
        if (screenY < -20 || screenY > h + 20) continue;

        // Twinkle
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const opacityMultiplier = 0.3 + (twinkle + 1) * 0.35;
        const opacity = star.baseOpacity * opacityMultiplier;

        // Draw the star dot
        ctx.beginPath();
        ctx.arc(star.x, screenY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${opacity})`;
        ctx.fill();

        // Subtle glow for near-layer bright stars (kept small for galaxy look)
        if (star.layer === 2 && star.baseOpacity > 0.55) {
          ctx.beginPath();
          ctx.arc(star.x, screenY, star.size * 2.2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            star.x, screenY, 0,
            star.x, screenY, star.size * 2.2
          );
          gradient.addColorStop(0, `rgba(${star.color}, ${opacity * 0.25})`);
          gradient.addColorStop(1, `rgba(${star.color}, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Tiny cross-sparkle only for the very brightest stars
        if (star.layer === 2 && star.size > 0.9 && opacity > 0.6) {
          const sparkleLen = star.size * 2.5;
          ctx.strokeStyle = `rgba(${star.color}, ${opacity * 0.15})`;
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(star.x - sparkleLen, screenY);
          ctx.lineTo(star.x + sparkleLen, screenY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(star.x, screenY - sparkleLen);
          ctx.lineTo(star.x, screenY + sparkleLen);
          ctx.stroke();
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
