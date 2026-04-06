/**
 * SoundVision Events — Navbar (Multi-page)
 * Sticky nav with glassmorphism backdrop, cyan accent
 * Routes: /, /bruiloft, /bedrijfsfeesten, /studentenfeesten, /prive
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Bruiloft", href: "/bruiloft" },
  { label: "Bedrijfsfeest", href: "/bedrijfsfeesten" },
  { href: "/studentenfeesten", label: "Studentenfeest" },
  { label: "Privé feest", href: "/prive" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = () => {
    setMobileOpen(false);
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 200, 255, 0.25)"
          : "1px solid rgba(115, 0, 255, 0.15)",
        boxShadow: scrolled
          ? "0 4px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "none",
        borderRadius: "4px",
        height: "80px",
      }}
    >
      {/* Colour overlay — only this layer gets opacity */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          backgroundColor: "#00294d",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <div className="relative" style={{ paddingRight: "clamp(0.75rem, 3vw, 3rem)", paddingLeft: "clamp(0.75rem, 3vw, 3rem)", marginTop: "0", opacity: 1.0 }}>
        <div className="flex items-center justify-between" style={{height: '74px'}}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/logo_dark_aae3c78f.png"
              alt="SoundVision Events"
              style={{
                height: "52px",
                width: "auto",
              }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`sv-nav-link${isActive ? ' active' : ''}`}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1.125rem",
                    letterSpacing: "0.05em",
                    color: isActive ? "#00c8ff" : "rgba(240, 244, 248, 0.85)",
                    paddingBottom: "4px",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons + Trustoo Top Pro Badge */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              className="sv-btn-primary"
              onClick={scrollToContact}
              style={{
                fontSize: '13px',
                paddingTop: '5px',
                paddingRight: '3px',
                paddingBottom: '5px',
                paddingLeft: '3px',
                marginTop: '8px',
                borderRadius: '0px',
                borderWidth: '3px',
                borderStyle: 'ridge',
                borderColor: '#f5f5f5',
              }}
            >
              Offerte Aanvragen
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "#00c8ff" }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: "rgba(8, 12, 16, 0.98)",
            borderTop: "1px solid rgba(0, 200, 255, 0.15)",
          }}
          className="lg:hidden"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`sv-nav-link-mobile${isActive ? ' active' : ''}`}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    color: isActive ? "#00c8ff" : "rgba(240, 244, 248, 0.85)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={scrollToContact}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                fontWeight: 500,
                padding: "0.65rem 1.2rem",
                borderRadius: "6px",
                border: "1px solid rgba(115, 0, 255, 0.55)",
                background: "rgba(115, 0, 255, 0.15)",
                color: "rgba(200, 160, 255, 0.9)",
                cursor: "pointer",
                textTransform: "uppercase",
                width: "100%",
              }}
            >
              Offerte Aanvragen
            </button>
            <button
              className="sv-btn-primary mt-2"
              onClick={scrollToContact}
            >
              Boek Nu
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
