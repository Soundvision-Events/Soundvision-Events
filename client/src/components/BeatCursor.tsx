/**
 * SoundVision Events — Beat Cursor (Equalizer Trail)
 * The default cursor stays visible as the click point.
 * The equalizer wave smoothly trails behind with a slight lag,
 * so the pointer is always clearly visible ahead of the wave.
 * Only shown on non-touch desktop devices.
 */
import { useEffect, useRef, useCallback } from "react";

export default function BeatCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Real mouse position (instant)
  const mouseRef = useRef({ x: -300, y: -300 });
  // Trailing position (lerped behind the real cursor)
  const trailRef = useRef({ x: -300, y: -300 });

  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);
  const timeRef = useRef(0);

  const NUM_BARS = 16;
  const BAR_WIDTH = 2.2;
  const BAR_GAP = 1.8;
  const MAX_BAR_HEIGHT = 18;
  const TOTAL_WIDTH = NUM_BARS * (BAR_WIDTH + BAR_GAP) - BAR_GAP;

  // Lag factor: 0 = instant, 1 = never moves. ~0.12 gives a nice trail.
  const TRAIL_LAG = 0.12;

  const barParamsRef = useRef(
    Array.from({ length: NUM_BARS }, (_, i) => ({
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
    const wave1 = Math.sin(time * p.freq1 + p.phase1) * p.amp1;
    const wave2 = Math.sin(time * p.freq2 + p.phase2) * p.amp2;
    const wave3 = Math.sin(time * p.freq3 + p.phase3) * p.amp3;
    const combined = (wave1 + wave2 + wave3 + 1) / 2;
    const minHeight = 0.12;
    return minHeight + combined * (1 - minHeight);
  }, []);

  useEffect(() => {
    const checkTouch = () => { isTouchRef.current = true; };
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

      // Lerp the trail position toward the real cursor — creates the lag
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Only start trailing once the cursor has entered the window
      if (mx > -200) {
        if (trailRef.current.x < -200) {
          // Snap to cursor on first entry
          trailRef.current.x = mx;
          trailRef.current.y = my;
        } else {
          trailRef.current.x += (mx - trailRef.current.x) * (1 - TRAIL_LAG);
          trailRef.current.y += (my - trailRef.current.y) * (1 - TRAIL_LAG);
        }
      }

      timeRef.current += 0.06;
      const time = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const tx = trailRef.current.x;
      const ty = trailRef.current.y;

      if (tx < -100) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.save();

      const startX = tx - TOTAL_WIDTH / 2;
      const centerY = ty;

      for (let i = 0; i < NUM_BARS; i++) {
        const height = getBarHeight(i, time) * MAX_BAR_HEIGHT;
        const x = startX + i * (BAR_WIDTH + BAR_GAP);

        const distFromCenter = Math.abs(i - NUM_BARS / 2) / (NUM_BARS / 2);
        const g = Math.round(200 - distFromCenter * 80);
        const alpha = 0.65 + (1 - distFromCenter) * 0.3;

        ctx.shadowColor = `rgba(0, 200, 255, ${alpha * 0.55})`;
        ctx.shadowBlur = 6;

        ctx.fillStyle = `rgba(0, ${g}, 255, ${alpha})`;

        // Bar UP
        ctx.fillRect(Math.round(x), Math.round(centerY - height), BAR_WIDTH, Math.round(height));
        // Bar DOWN (mirror)
        ctx.fillRect(Math.round(x), Math.round(centerY), BAR_WIDTH, Math.round(height));
      }

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
