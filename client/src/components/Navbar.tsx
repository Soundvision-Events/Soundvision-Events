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
  { label: "Bedrijfsfeesten", href: "/bedrijfsfeesten" },
  { label: "Studentenfeesten", href: "/studentenfeesten" },
  { label: "Privé", href: "/prive" },
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
        background: scrolled
          ? "rgba(6, 0, 51, 0.95)"
          : "rgba(6, 0, 51, 0.40)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 200, 255, 0.15)"
          : "1px solid transparent",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.85rem",
                    letterSpacing: "0.05em",
                    color: isActive ? "#00c8ff" : "rgba(240, 244, 248, 0.75)",
                    transition: "color 0.2s ease",
                    textDecoration: "none",
                    borderBottom: isActive ? "2px solid #00c8ff" : "2px solid transparent",
                    paddingBottom: "4px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#00c8ff";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "rgba(240, 244, 248, 0.75)";
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              className="sv-btn-primary"
              onClick={scrollToContact}
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
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1rem",
                    letterSpacing: "0.05em",
                    color: isActive ? "#00c8ff" : "rgba(240, 244, 248, 0.85)",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
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
