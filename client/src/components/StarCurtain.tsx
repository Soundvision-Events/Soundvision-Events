/**
 * SoundVision Events — Star Curtain Overlay
 * An animated curtain of twinkling stars/glitter particles
 * layered over the entire page. Stars vary in size, brightness,
 * and twinkle speed for a realistic night-sky / stage-curtain effect.
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
}

const STAR_COLORS = [
  "255, 255, 255",     // white
  "200, 220, 255",     // cool white
  "255, 240, 220",     // warm white
  "0, 200, 255",       // cyan (brand)
  "180, 200, 255",     // pale blue
  "255, 200, 150",     // soft amber
];

export default function StarCurtain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = document.documentElement.scrollHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${document.documentElement.scrollHeight}px`;
      ctx.scale(dpr, dpr);
      generateStars();
    };

    const generateStars = () => {
      const width = window.innerWidth;
      const height = document.documentElement.scrollHeight;
      // Density: ~1 star per 3000px² for a subtle but visible effect
      const area = width * height;
      const count = Math.floor(area / 2500);
      const stars: Star[] = [];

      for (let i = 0; i < count; i++) {
        // Most stars are tiny and dim, a few are brighter
        const isBright = Math.random() < 0.12;
        const isAccent = Math.random() < 0.08;

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: isBright
            ? 1.2 + Math.random() * 1.8
            : 0.4 + Math.random() * 1.0,
          baseOpacity: isBright
            ? 0.5 + Math.random() * 0.5
            : 0.1 + Math.random() * 0.35,
          twinkleSpeed: 0.5 + Math.random() * 2.5,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: isAccent
            ? STAR_COLORS[3 + Math.floor(Math.random() * 3)]
            : STAR_COLORS[Math.floor(Math.random() * 3)],
        });
      }

      starsRef.current = stars;
    };

    const draw = (time: number) => {
      const width = window.innerWidth;
      const height = document.documentElement.scrollHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const t = time / 1000;

      for (const star of starsRef.current) {
        // Twinkle: sinusoidal oscillation with unique speed and offset
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        // Map from [-1, 1] to [0.3, 1.0] range for opacity multiplier
        const opacityMultiplier = 0.3 + (twinkle + 1) * 0.35;
        const opacity = star.baseOpacity * opacityMultiplier;

        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${opacity})`;
        ctx.fill();

        // Add a subtle glow for brighter stars
        if (star.baseOpacity > 0.5 && star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
          );
          gradient.addColorStop(0, `rgba(${star.color}, ${opacity * 0.4})`);
          gradient.addColorStop(1, `rgba(${star.color}, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();
    animationRef.current = requestAnimationFrame(draw);

    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    };

    window.addEventListener("resize", handleResize);

    // Also update canvas height when content changes (e.g. after images load)
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    });
    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animationRef.current);
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
