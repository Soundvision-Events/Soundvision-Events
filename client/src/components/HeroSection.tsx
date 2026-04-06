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

/**
 * AnimatedCounter — digital stopwatch count-up effect
 * Counts from 0 to target number with easing, staggered delay per stat.
 */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1800,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
}) {
  const [display, setDisplay] = useState("0");
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic for natural deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        if (decimals > 0) {
          setDisplay(current.toFixed(decimals));
        } else {
          setDisplay(Math.round(current).toString());
        }

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, delay, decimals]);

  return <>{prefix}{display}{suffix}</>;
}

interface Review {
  name: string;
  city: string;
  stars: number;
  text: string;
}

export default function HeroSection() {
  const [activeReview, setActiveReview] = useState(0);
  const [visible, setVisible] = useState(true);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [trustooScore, setTrustooScore] = useState<string | null>(null);
  const [liveReviews, setLiveReviews] = useState<Review[] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Read Trustoo reviews AND score from the footer widget DOM once it loads
  useEffect(() => {
    const tryReadScore = (attempts = 0) => {
      // Also try to extract real reviews from the widget
      const widget = document.querySelector(".trustoo-widget");
      if (widget) {
        // Trustoo widget renders review cards — try common selectors
        const reviewEls = widget.querySelectorAll(
          "[class*='review'], [class*='Review'], [class*='beoordeling'], [class*='card']"
        );
        if (reviewEls.length > 0) {
          const extracted: Review[] = [];
          reviewEls.forEach((el) => {
            const nameEl = el.querySelector("[class*='name'], [class*='naam'], [class*='author']");
            const textEl = el.querySelector("[class*='text'], [class*='tekst'], [class*='content'], [class*='comment'], p");
            const starsEl = el.querySelector("[class*='star'], [class*='ster'], [class*='rating']");
            const name = nameEl?.textContent?.trim() || "";
            const text = textEl?.textContent?.trim() || "";
            // Count filled stars
            const starCount = starsEl
              ? (starsEl.querySelectorAll("svg, [class*='filled'], [class*='active']").length || 5)
              : 5;
            if (name && text && text.length > 10) {
              extracted.push({ name, city: "", stars: Math.min(starCount, 5), text });
            }
          });
          if (extracted.length >= 2) {
            setLiveReviews(extracted.slice(0, 6));
          }
        }
      }
    };
    const tryReadScoreOnly = (attempts = 0) => {
      // The Trustoo widget renders the average score in a specific element.
      // We look for elements that contain a score in the range 8.0–10.0
      // (valid customer satisfaction scores), ignoring internal counters.
      const widget = document.querySelector(".trustoo-widget");
      if (widget) {
        // Try to find a dedicated score/rating element first
        const scoreEl =
          widget.querySelector("[class*='score']") ||
          widget.querySelector("[class*='rating']") ||
          widget.querySelector("[class*='average']") ||
          widget.querySelector("[class*='cijfer']");

        const candidates: string[] = [];
        if (scoreEl) candidates.push(scoreEl.textContent || "");
        // Also scan all text nodes for a score-like pattern
        candidates.push(widget.textContent || "");

        for (const text of candidates) {
          // Match patterns like "9.8", "9,8", "9.8/10" — must be 8.0–10.0
          const re = /(\d+[.,]\d+)/g;
          let m: RegExpExecArray | null;
          while ((m = re.exec(text)) !== null) {
            const num = parseFloat(m[1].replace(",", "."));
            if (!isNaN(num) && num >= 8.0 && num <= 10.0) {
              setTrustooScore(num.toFixed(1));
              return;
            }
          }
        }
      }
      // Retry up to 20 times (10 seconds total)
      if (attempts < 20) {
        setTimeout(() => tryReadScoreOnly(attempts + 1), 500);
      }
    };
    // Start trying after widget script has had time to load
    setTimeout(() => {
      tryReadScore(0);       // try to extract real reviews
      tryReadScoreOnly(0);   // try to read the average score
    }, 1500);
  }, []);

  // Scroll-fade: hero video fades from 1 → 0 as hero scrolls out of view.
  // Also emits a custom event so VideoBackground can cross-fade in as the inverse.
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      let opacity: number;
      if (rect.top >= 0) {
        opacity = 1;
      } else {
        const scrolled = Math.abs(rect.top);
        const fadeRange = sectionHeight * 0.6; // fade over 60% of section height
        opacity = Math.max(0, 1 - scrolled / fadeRange);
      }
      setVideoOpacity(opacity);
      // Broadcast hero opacity so VideoBackground can cross-fade as inverse
      window.dispatchEvent(
        new CustomEvent("sv-hero-opacity", { detail: { opacity } })
      );
    };
    // Emit initial value on mount
    window.dispatchEvent(new CustomEvent("sv-hero-opacity", { detail: { opacity: 1 } }));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Use live reviews from widget if available, otherwise fall back to static
  const displayReviews = liveReviews && liveReviews.length > 0 ? liveReviews : REVIEWS;

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      setTimeout(() => {
        setActiveReview((prev) => (prev + 1) % displayReviews.length);
        setVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [displayReviews.length]);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const review = displayReviews[activeReview] ?? REVIEWS[0];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      {/* Hero video — full opacity, fades out on scroll, fades in gradually on load */}
      <div className="absolute inset-0" style={{ opacity: videoOpacity, transition: "opacity 0.1s linear", willChange: "opacity", zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/api/video-proxy?file=hero-loop-new_3c2c71bc.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Dark color overlay — sits above video, below all text/buttons/reviews (z-index 1) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#000000",
          opacity: 0.25,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* Light gradient overlay — keeps text readable while both videos show through */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,12,16,0.04) 0%, rgba(8,12,16,0.01) 40%, rgba(8,12,16,0.08) 80%, rgba(8,12,16,0.20) 100%)",
          zIndex: 2,
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
                  width: '64px',
                  height: '66px',
                  borderRadius: "50%",
                  border: "1px solid rgba(0, 200, 255, 0.3)",
                  position: "absolute",
                }}
              />
              <a
                href="https://www.instagram.com/soundvision.events"
                target="_blank"
                rel="noopener noreferrer"
                title="Volg SoundVision Events op Instagram"
                style={{ display: "contents", cursor: "pointer" }}
              >
                <div
                  className="sv-burn-glow"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "12px",
                    background: "linear-gradient(to bottom, rgba(0,212,255,0.18) 0%, rgba(96,64,224,0.22) 100%)",
                    border: "2px solid #00d4ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 2,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
                    <path d="M15 30V10l20-4v20" stroke="#00c8ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="10" cy="30" r="5" stroke="#00c8ff" strokeWidth="2.5"/>
                    <circle cx="30" cy="26" r="5" stroke="#ff5500" strokeWidth="2.5"/>
                  </svg>
                </div>
              </a>
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
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2rem, 5.5vw, 4rem)",
              letterSpacing: "0.03em",
              lineHeight: 1.1,
              color: "#ffffff",
              margin: 0,
              marginTop: "9px",
              marginRight: "54px",
              marginLeft: "-23px",
            }}
          >
            SOUND<span style={{ color: "#ffffff" }}>VISION</span><span style={{ color: "#2ec0ff" }}>{" events"}</span>
          </h1>
        </div>

        {/* EVENTS subtitle */}
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(0.9rem, 2.5vw, 1.7rem)",
            letterSpacing: "0.25em",
            color: "#fcfcfc",
            backgroundColor: "rgba(0,16,41,0.85)",
            borderRadius: "6px",
            border: "1.5px solid rgba(0,212,255,0.55)",
            boxShadow: "0 0 18px rgba(0,212,255,0.35), 0 0 50px rgba(0,212,255,0.12)",
            marginTop: "clamp(-2rem, -4vw, -5rem)",
            marginBottom: "clamp(1rem, 3vw, 3.5rem)",
            marginLeft: "auto",
            marginRight: "0",
            paddingTop: "0px",
            paddingRight: "0px",
            paddingBottom: "0px",
            paddingLeft: "clamp(2rem, 8vw, 127px)",
            fontWeight: 100,
            textAlign: "left",
            textDecoration: "overline",
            maxWidth: "min(708px, 90vw)",
            backdropFilter: "blur(8px)",
            opacity: 0.6,
          }}
        >
          Allround DJ Shows
        </h2>

        {/* CTA Buttons — positioned at 600px from hero top */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ position: "absolute", top: "600px", left: 0, right: 0, paddingLeft: "1rem", paddingRight: "1rem" }}>
          <button
            className="sv-btn-primary"
            style={{
              fontSize: "1.1rem",
              padding: "1rem 2.5rem",
              borderRadius: "6px",
              boxShadow: "0 0 18px rgba(0,212,255,0.60), 0 0 40px rgba(0,212,255,0.30), 0 0 80px rgba(91,74,240,0.25)",
              transition: "box-shadow 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 0 30px rgba(0,212,255,0.90), 0 0 70px rgba(0,212,255,0.55), 0 0 120px rgba(91,74,240,0.40)";
              el.style.transform = "translateY(-2px) scale(1.03)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 0 18px rgba(0,212,255,0.60), 0 0 40px rgba(0,212,255,0.30), 0 0 80px rgba(91,74,240,0.25)";
              el.style.transform = "translateY(0) scale(1)";
            }}
            onClick={() => handleScroll("#packages")}
          >
            Bekijk Pakketten
          </button>
          <button
            className="sv-btn-secondary"
            style={{
              fontSize: "1.1rem",
              padding: "1rem 2.5rem",
              boxShadow: "0 0 18px rgba(0,212,255,0.50), 0 0 40px rgba(60,0,200,0.30)",
              transition: "box-shadow 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 0 30px rgba(0,212,255,0.85), 0 0 70px rgba(0,212,255,0.45), 0 0 120px rgba(60,0,200,0.40)";
              el.style.transform = "translateY(-2px) scale(1.03)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 0 18px rgba(0,212,255,0.50), 0 0 40px rgba(60,0,200,0.30)";
              el.style.transform = "translateY(0) scale(1)";
            }}
            onClick={() => handleScroll("#contact")}
          >
            Neem Contact Op
          </button>
        </div>

        {/* Stats row — positioned at 580px from hero top, behind CTA buttons */}
        <div
          className="flex flex-wrap justify-center gap-8"
          style={{ position: "absolute", top: "500px", left: 0, right: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", paddingLeft: "1rem", paddingRight: "1rem" }}
        >
          {[
            { target: 500, suffix: "+", decimals: 0, label: "Shows Gespeeld" },
            { target: 15, suffix: "+", decimals: 0, label: "Jaar Ervaring" },
            { target: 3, suffix: "", decimals: 0, label: "Show Pakketten" },
            { target: trustooScore ? parseFloat(trustooScore) : 9.8, suffix: "/10", decimals: 1, label: "Trustoo Score", isTrustoo: true },
          ].map((stat, idx) => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "1.9rem",
                  background: STAT_GRADIENTS[idx],
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                  display: "inline-block",
                }}
              >
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={1800}
                  delay={idx * 300}
                />
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(240, 244, 248, 0.5)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                {(stat as { isTrustoo?: boolean }).isTrustoo && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#ffc84a" style={{ flexShrink: 0, filter: "drop-shadow(0 0 3px #ffc84a88)" }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                )}
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Floating Review Slider — positioned in dark DJ booth space below DJ hands ── */}
      <div
        className="absolute z-20"
        style={{
          top: "74%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(560px, 90vw)",
          background: "rgba(4, 8, 20, 0.55)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(0, 200, 255, 0.22)",
          borderRadius: "14px",
          padding: "1rem 1.5rem 0.75rem",
          boxShadow: "0 4px 32px rgba(0,0,0,0.45), 0 0 20px rgba(0,200,255,0.08)",
        }}
      >
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          {/* Stars + name row */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <StarRating count={review.stars} animKey={activeReview} />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.75rem",
              color: "rgba(240,244,248,0.55)",
              letterSpacing: "0.04em",
            }}>
              {review.name} · {review.city}
            </span>
          </div>
          {/* Review text */}
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.88rem",
            color: "rgba(240,244,248,0.80)",
            fontStyle: "italic",
            margin: 0,
            letterSpacing: "0.01em",
            textAlign: "center",
            lineHeight: 1.6,
          }}>
            "{review.text}"
          </p>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "5px", marginTop: "0.6rem", justifyContent: "center" }}>
          {displayReviews.map((_, i) => (
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
