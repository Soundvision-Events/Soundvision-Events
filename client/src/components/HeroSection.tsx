/**
 * SoundVision Events — Hero Section
 * Full-screen hero with animated ring, looping background VIDEO, and CTA
 * Includes fading review slider below stats row
 */
import { useState, useEffect, useRef } from "react";

// CSS keyframe injected once for star pop animation
const STAR_STYLE_ID = "sv-star-anim";
if (typeof document !== "undefined" && !document.getElementById(STAR_STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STAR_STYLE_ID;
  style.textContent = `
    @keyframes sv-star-pop {
      0%   { opacity: 0.15; transform: scale(0.6); filter: brightness(0.4); }
      50%  { opacity: 1;    transform: scale(1.35); filter: brightness(1.8) drop-shadow(0 0 4px #ffc84a); }
      100% { opacity: 1;    transform: scale(1);    filter: brightness(1.2) drop-shadow(0 0 2px #ffc84a88); }
    }
  `;
  document.head.appendChild(style);
}

const REVIEWS = [
  { name: "Marieke V.", city: "Groningen", stars: 5, text: "Geweldige sfeer, iedereen bleef de hele avond dansen. Absolute aanrader!" },
  { name: "Thomas B.", city: "Assen", stars: 5, text: "Professioneel, punctueel en een geweldige show. We zijn super blij!" },
  { name: "Lisa & Daan", city: "Leeuwarden", stars: 5, text: "Onze bruiloft was perfect. De muziekkeuze was precies wat we wilden." },
  { name: "Sander K.", city: "Groningen", stars: 5, text: "Top DJ! Bedrijfsfeest was een groot succes dankzij SoundVision." },
  { name: "Emma de V.", city: "Drachten", stars: 5, text: "Fantastische avond, iedereen was enthousiast. Tot de volgende keer!" },
];

function StarRating({ count, animKey }: { count: number; animKey: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "3px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={`${animKey}-${i}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="#ffc84a"
          style={{
            flexShrink: 0,
            animation: `sv-star-pop 0.45s ease-out both`,
            animationDelay: `${i * 90}ms`,
          }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

// Gradient colours for each stat (purple → blue progression)
const STAT_GRADIENTS = [
  "linear-gradient(135deg, #a855f7, #7c3aed)",  // purple
  "linear-gradient(135deg, #7c3aed, #4f46e5)",  // purple-indigo
  "linear-gradient(135deg, #4f46e5, #2563eb)",  // indigo-blue
  "linear-gradient(135deg, #2563eb, #00c8ff)",  // blue-cyan
];

export default function HeroSection() {
  const [activeReview, setActiveReview] = useState(0);
  const [visible, setVisible] = useState(true);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [trustooScore, setTrustooScore] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Read Trustoo score from the footer widget DOM once it loads
  useEffect(() => {
    const tryReadScore = (attempts = 0) => {
      // Look for the score rendered inside the trustoo-widget element
      const widget = document.querySelector(".trustoo-widget");
      if (widget) {
        // The widget renders a score like "9.8" or "9,8" somewhere in its text
        const text = widget.textContent || "";
        const match = text.match(/(\d+[.,]\d+)\s*\/\s*10|(\d+[.,]\d+)/);
        if (match) {
          const raw = (match[1] || match[2]).replace(",", ".");
          const num = parseFloat(raw);
          if (!isNaN(num) && num > 0 && num <= 10) {
            setTrustooScore(num.toFixed(1));
            return;
          }
        }
      }
      // Retry up to 20 times (10 seconds total)
      if (attempts < 20) {
        setTimeout(() => tryReadScore(attempts + 1), 500);
      }
    };
    // Start trying after widget script has had time to load
    setTimeout(() => tryReadScore(), 1500);
  }, []);

  // Scroll-fade: video fades from 1 → 0 as hero scrolls out of view
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      // Start fading when top of section starts leaving viewport (rect.top < 0)
      // Fully transparent when section is fully scrolled past (rect.top < -sectionHeight)
      if (rect.top >= 0) {
        setVideoOpacity(1);
      } else {
        const scrolled = Math.abs(rect.top);
        const fadeRange = sectionHeight * 0.6; // fade over 60% of section height
        const opacity = Math.max(0, 1 - scrolled / fadeRange);
        setVideoOpacity(opacity);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      setTimeout(() => {
        setActiveReview((prev) => (prev + 1) % REVIEWS.length);
        setVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const review = REVIEWS[activeReview];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Hero video — full opacity, fades out on scroll */}
      <div className="absolute inset-0" style={{ opacity: videoOpacity, transition: "opacity 0.05s linear", willChange: "opacity" }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: '1038px', objectFit: "cover", marginTop: '35px', marginRight: '92px', marginBottom: '-49px', marginLeft: '4px', backgroundColor: '#07006b' }}
        >
          <source
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/hero-loop-new_5528fae7.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      {/* Light gradient overlay — keeps text readable while both videos show through */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,12,16,0.04) 0%, rgba(8,12,16,0.01) 40%, rgba(8,12,16,0.08) 80%, rgba(8,12,16,0.20) 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Cyan radial glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse at center, rgba(0,200,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ paddingTop: '157px', paddingRight: '22px', paddingBottom: '280px', paddingLeft: '21px', height: '1073px' }}
      >
        {/* Main heading: animated logo ring LEFT of h1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(1rem, 3vw, 2rem)",
            marginBottom: "0.5rem",
          }}
        >
          {/* Animated logo ring — left of title, badge overlaid at bottom */}
          <div className="relative sv-float flex-shrink-0" style={{ paddingBottom: "1.8rem" }}>
            <div
              className="sv-ring-1"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "2px solid transparent",
                background: "linear-gradient(#080c10, #080c10) padding-box, linear-gradient(135deg, #00c8ff, transparent, #ff5500) border-box",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="sv-ring-2"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  border: "1px solid rgba(0, 200, 255, 0.3)",
                  position: "absolute",
                }}
              />
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(0,200,255,0.15), rgba(255,85,0,0.1))",
                  border: "1px solid rgba(0,200,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
                  <path d="M15 30V10l20-4v20" stroke="#00c8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="30" r="5" stroke="#00c8ff" strokeWidth="2.5"/>
                  <circle cx="30" cy="26" r="5" stroke="#ff5500" strokeWidth="2.5"/>
                </svg>
              </div>
            </div>
            {/* Badge overlay — positioned below the ring, centered */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "#00c8ff",
                  padding: "0.25rem 0.75rem",
                  border: "1px solid rgba(0, 200, 255, 0.4)",
                  borderRadius: "100px",
                  background: "rgba(0, 200, 255, 0.1)",
                  textTransform: "uppercase",
                  backdropFilter: "blur(4px)",
                }}
              >
                All-Round DJ Shows
              </span>
            </div>
          </div>

          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              letterSpacing: "0.05em",
              lineHeight: 1,
              color: "#f0f4f8",
              margin: 0,
            }}
          >
            SOUND
            <span
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              VISION
            </span>
          </h1>
        </div>

        {/* EVENTS subtitle */}
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            letterSpacing: "0.4em",
            color: "#f0f0f0",
            marginBottom: "1.5rem",
          }}
        >
          EVENTS
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ paddingTop: "21px" }}>
          <button
            className="sv-btn-primary"
            style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
            onClick={() => handleScroll("#packages")}
          >
            Bekijk Pakketten
          </button>
          <button
            className="sv-btn-secondary"
            style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
            onClick={() => handleScroll("#contact")}
          >
            Neem Contact Op
          </button>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap justify-center gap-8 mt-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}
        >
          {[
            { value: "500+", label: "Shows Gespeeld" },
            { value: "15+", label: "Jaar Ervaring" },
            { value: "3", label: "Show Pakketten" },
            { value: trustooScore ? `${trustooScore}/10` : "9.8/10", label: "Trustoo Score" },
          ].map((stat, idx) => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "2.5rem",
                  background: STAT_GRADIENTS[idx],
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                  display: "inline-block",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(240, 244, 248, 0.5)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "0.25rem",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Review Slider */}
        <div
          style={{
            marginTop: "1.75rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.35rem",
            minHeight: "52px",
          }}
        >
          <div
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            {/* Stars + name row */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <StarRating count={review.stars} animKey={activeReview} />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.7rem",
                color: "rgba(240,244,248,0.45)",
                letterSpacing: "0.04em",
              }}>
                {review.name} · {review.city}
              </span>
            </div>
            {/* Review text */}
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(240,244,248,0.65)",
              fontStyle: "italic",
              margin: 0,
              letterSpacing: "0.01em",
              maxWidth: "480px",
            }}>
              "{review.text}"
            </p>
          </div>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: "5px", marginTop: "0.4rem" }}>
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setVisible(false); setTimeout(() => { setActiveReview(i); setVisible(true); }, 300); }}
                style={{
                  width: i === activeReview ? "16px" : "5px",
                  height: "5px",
                  borderRadius: "3px",
                  background: i === activeReview ? "#00c8ff" : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ animation: "float 2s ease-in-out infinite" }}
      >
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, rgba(0,200,255,0.8), transparent)",
            margin: "0 auto",
          }}
        />
      </div>
    </section>
  );
}
