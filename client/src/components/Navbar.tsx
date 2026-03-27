/**
 * SoundVision Events — Navbar
 * Sticky nav with glassmorphism backdrop, cyan accent
 */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Over Ons", href: "#about" },
  { label: "Evenementen", href: "#events" },
  { label: "Pakketten", href: "#packages" },
  { label: "Add-ons", href: "#addons" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(8, 12, 16, 0.92)"
          : "rgba(8, 12, 16, 0.4)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 200, 255, 0.15)"
          : "1px solid transparent",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-3"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #00c8ff22, #00c8ff44)",
                border: "1px solid rgba(0, 200, 255, 0.4)",
              }}
            >
              {/* SVG music note logo */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M9 18V5l12-2v13" stroke="#00c8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="6" cy="18" r="3" stroke="#00c8ff" strokeWidth="2"/>
                <circle cx="18" cy="16" r="3" stroke="#ff5500" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.25rem",
                  letterSpacing: "0.08em",
                  color: "#f0f4f8",
                  lineHeight: 1,
                }}
              >
                SOUNDVISION
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  color: "#00c8ff",
                  lineHeight: 1,
                  marginTop: "2px",
                }}
              >
                EVENTS
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  color: "rgba(240, 244, 248, 0.75)",
                  transition: "color 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240, 244, 248, 0.75)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              className="sv-btn-primary"
              onClick={() => handleNavClick("#contact")}
            >
              Boek Nu
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  letterSpacing: "0.05em",
                  color: "rgba(240, 244, 248, 0.85)",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              className="sv-btn-primary mt-2"
              onClick={() => handleNavClick("#contact")}
            >
              Boek Nu
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
