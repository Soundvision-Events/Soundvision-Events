/**
 * SoundVision Events — Beat Cursor (Equalizer Style)
 * A flat audio equalizer/waveform that follows the mouse cursor.
 * Vertical bars animate up and down like a music equalizer or heart monitor.
 * Only shown on non-touch devices (desktop).
 */
import { useEffect, useRef, useCallback } from "react";

export default function BeatCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);
  const timeRef = useRef(0);

  // Each bar has its own phase offset and frequency for organic movement
  const NUM_BARS = 16;
  const BAR_WIDTH = 2.2;
  const BAR_GAP = 1.8;
  const MAX_BAR_HEIGHT = 18;
  const TOTAL_WIDTH = NUM_BARS * (BAR_WIDTH + BAR_GAP) - BAR_GAP;

  // Generate unique animation parameters for each bar
  const barParamsRef = useRef(
    Array.from({ length: NUM_BARS }, (_, i) => ({
      // Multiple sine waves layered for organic beat feel
      freq1: 1.8 + Math.random() * 1.2,
      freq2: 3.2 + Math.random() * 2.0,
      freq3: 0.5 + Math.random() * 0.8,
      phase1: (i / NUM_BARS) * Math.PI * 2 + Math.random() * 0.5,
      phase2: Math.random() * Math.PI * 2,
      phase3: Math.random() * Math.PI * 2,
      amp1: 0.4 + Math.random() * 0.3,
      amp2: 0.2 + Math.random() * 0.2,
      amp3: 0.15 + Math.random() * 0.15,
    }))
  );

  const getBarHeight = useCallback((barIndex: number, time: number): number => {
    const p = barParamsRef.current[barIndex];
    // Layer multiple sine waves for a natural equalizer feel
    const wave1 = Math.sin(time * p.freq1 + p.phase1) * p.amp1;
    const wave2 = Math.sin(time * p.freq2 + p.phase2) * p.amp2;
    const wave3 = Math.sin(time * p.freq3 + p.phase3) * p.amp3;

    // Combine and normalize to 0-1 range
    const combined = (wave1 + wave2 + wave3 + 1) / 2;

    // Apply a minimum height so bars are always visible
    const minHeight = 0.12;
    return minHeight + combined * (1 - minHeight);
  }, []);

  useEffect(() => {
    const checkTouch = () => {
      isTouchRef.current = true;
    };
    window.addEventListener("touchstart", checkTouch, { once: true, passive: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (isTouchRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 0.06;
      const time = timeRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (mx < -100) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.save();
      // Position the equalizer centered on the cursor
      const startX = mx - TOTAL_WIDTH / 2;
      const centerY = my;

      // Draw each bar — mirrored (up and down from center line)
      for (let i = 0; i < NUM_BARS; i++) {
        const height = getBarHeight(i, time) * MAX_BAR_HEIGHT;
        const x = startX + i * (BAR_WIDTH + BAR_GAP);

        // Color gradient: cyan in center, fading to blue at edges
        const distFromCenter = Math.abs(i - NUM_BARS / 2) / (NUM_BARS / 2);
        const r = Math.round(0 + distFromCenter * 0);
        const g = Math.round(200 - distFromCenter * 80);
        const b = Math.round(255);
        const alpha = 0.7 + (1 - distFromCenter) * 0.3;

        // Glow effect
        ctx.shadowColor = `rgba(0, 200, 255, ${alpha * 0.6})`;
        ctx.shadowBlur = 6;

        // Bar going UP from center
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fillRect(
          Math.round(x),
          Math.round(centerY - height),
          BAR_WIDTH,
          Math.round(height)
        );

        // Bar going DOWN from center (mirror)
        ctx.fillRect(
          Math.round(x),
          Math.round(centerY),
          BAR_WIDTH,
          Math.round(height)
        );
      }

      // Small center dot
      ctx.shadowColor = "rgba(0, 200, 255, 0.8)";
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(mx, my, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 200, 255, 0.9)";
      ctx.fill();

      ctx.restore();

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", checkTouch);
    };
  }, [getBarHeight, NUM_BARS, BAR_WIDTH, BAR_GAP, MAX_BAR_HEIGHT, TOTAL_WIDTH]);

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
    />
  );
}
