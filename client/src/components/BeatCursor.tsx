/**
 * SoundVision Events — Beat Cursor
 * An animated beat/waveform trace that follows the mouse cursor.
 * Renders a pulsating ECG-style heartbeat line radiating from the cursor position.
 * Only shown on non-touch devices (desktop).
 */
import { useEffect, useRef, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

export default function BeatCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef<Point[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);

  // Beat waveform pattern — an ECG/heartbeat shape
  const getBeatY = useCallback((t: number): number => {
    // Create a repeating heartbeat pattern
    const cycle = t % 1;

    if (cycle < 0.1) {
      // Flat baseline
      return 0;
    } else if (cycle < 0.15) {
      // Small P-wave bump
      return Math.sin((cycle - 0.1) / 0.05 * Math.PI) * 3;
    } else if (cycle < 0.2) {
      // Back to baseline
      return 0;
    } else if (cycle < 0.24) {
      // Sharp Q dip
      return -((cycle - 0.2) / 0.04) * 6;
    } else if (cycle < 0.3) {
      // Big R spike up
      const p = (cycle - 0.24) / 0.06;
      return -6 + p * 30;
    } else if (cycle < 0.36) {
      // S dip down
      const p = (cycle - 0.3) / 0.06;
      return 24 - p * 32;
    } else if (cycle < 0.42) {
      // Return to baseline
      const p = (cycle - 0.36) / 0.06;
      return -8 + p * 8;
    } else if (cycle < 0.55) {
      // Flat
      return 0;
    } else if (cycle < 0.7) {
      // T-wave bump
      return Math.sin((cycle - 0.55) / 0.15 * Math.PI) * 5;
    } else {
      // Flat baseline rest
      return 0;
    }
  }, []);

  useEffect(() => {
    // Detect touch device
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

      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (mx < 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Draw the animated beat trace ring around cursor
      const time = frameRef.current * 0.025;
      const numPoints = 120;
      const radius = 22;

      // Draw the beat waveform as a circular ring
      ctx.save();
      ctx.translate(mx, my);

      // Outer glow
      ctx.shadowColor = "rgba(0, 200, 255, 0.4)";
      ctx.shadowBlur = 12;

      // Draw beat trace circle
      ctx.beginPath();
      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
        const beatPhase = (i / numPoints) * 2 + time; // 2 full beat cycles around the circle
        const beatAmplitude = getBeatY(beatPhase % 1);
        const r = radius + beatAmplitude;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();

      // Gradient stroke
      const gradient = ctx.createLinearGradient(-radius, -radius, radius, radius);
      gradient.addColorStop(0, "rgba(0, 200, 255, 0.9)");
      gradient.addColorStop(0.5, "rgba(0, 144, 255, 0.7)");
      gradient.addColorStop(1, "rgba(0, 200, 255, 0.9)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Inner dot (cursor center)
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 200, 255, 0.9)";
      ctx.shadowColor = "rgba(0, 200, 255, 0.8)";
      ctx.shadowBlur = 8;
      ctx.fill();

      // Second smaller beat ring (inner)
      ctx.beginPath();
      const innerRadius = 12;
      for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
        const beatPhase = (i / numPoints) * 2 + time * 1.5 + 0.5; // offset and faster
        const beatAmplitude = getBeatY(beatPhase % 1) * 0.4;
        const r = innerRadius + beatAmplitude;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(0, 200, 255, 0.35)";
      ctx.lineWidth = 1;
      ctx.shadowBlur = 4;
      ctx.stroke();

      // Trailing beat pulse particles
      if (frameRef.current % 3 === 0) {
        const angle = Math.random() * Math.PI * 2;
        const beatPhase = (angle / (Math.PI * 2)) * 2 + time;
        const beatAmp = getBeatY(beatPhase % 1);
        const r = radius + beatAmp;
        trailRef.current.push({
          x: Math.cos(angle) * r,
          y: Math.sin(angle) * r,
          age: 0,
        });
      }

      // Draw and age trail particles
      trailRef.current = trailRef.current.filter((p) => p.age < 30);
      for (const p of trailRef.current) {
        p.age++;
        const alpha = 1 - p.age / 30;
        const drift = p.age * 0.5;
        const dx = p.x + (p.x / radius) * drift;
        const dy = p.y + (p.y / radius) * drift;
        const size = (1 - p.age / 30) * 1.5;

        ctx.beginPath();
        ctx.arc(dx, dy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, ${alpha * 0.5})`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = `rgba(0, 200, 255, ${alpha * 0.3})`;
        ctx.fill();
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
  }, [getBeatY]);

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
