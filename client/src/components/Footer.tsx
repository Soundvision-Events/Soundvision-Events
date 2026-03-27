/**
 * SoundVision Events — Footer
 * Dark footer with links and branding
 */
import { Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#050810",
        borderTop: "1px solid rgba(0, 200, 255, 0.1)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(0,200,255,0.15), rgba(0,200,255,0.05))",
                  border: "1px solid rgba(0, 200, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
                    fontSize: "1.4rem",
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
                    letterSpacing: "0.3em",
                    color: "#00c8ff",
                    lineHeight: 1,
                    marginTop: "2px",
                  }}
                >
                  EVENTS
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(240, 244, 248, 0.5)",
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: "320px",
                marginBottom: "1.5rem",
              }}
            >
              Professionele DJ shows voor bruiloften, bedrijfsfeesten en verjaardagen. Uw onvergetelijke avond begint hier.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={16} />, href: "https://www.instagram.com/soundvisionevents", label: "Instagram" },
                { icon: <Youtube size={16} />, href: "https://www.youtube.com/@SoundVisionEvents", label: "YouTube" },
                { icon: <Mail size={16} />, href: "mailto:info@soundvisionevents.nl", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(240, 244, 248, 0.5)",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0, 200, 255, 0.4)";
                    e.currentTarget.style.color = "#00c8ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.color = "rgba(240, 244, 248, 0.5)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1rem",
                letterSpacing: "0.15em",
                color: "#f0f4f8",
                marginBottom: "1.25rem",
              }}
            >
              NAVIGATIE
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "Over Ons", href: "#about" },
                { label: "Evenementen", href: "#events" },
                { label: "Pakketten", href: "#packages" },
                { label: "Add-ons", href: "#addons" },
                { label: "Galerij", href: "#gallery" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.875rem",
                      color: "rgba(240, 244, 248, 0.5)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240, 244, 248, 0.5)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pakketten */}
          <div>
            <h4
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1rem",
                letterSpacing: "0.15em",
                color: "#f0f4f8",
                marginBottom: "1.25rem",
              }}
            >
              PAKKETTEN
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Small Show", desc: "Tot 4 uur" },
                { label: "Medium Show", desc: "Tot 6 uur" },
                { label: "Large Show", desc: "Tot 8 uur" },
              ].map((pkg) => (
                <li key={pkg.label}>
                  <a
                    href="#packages"
                    onClick={(e) => { e.preventDefault(); handleNavClick("#packages"); }}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.875rem",
                        color: "rgba(240, 244, 248, 0.5)",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240, 244, 248, 0.5)")}
                    >
                      {pkg.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.75rem",
                        color: "rgba(240, 244, 248, 0.3)",
                      }}
                    >
                      {pkg.desc}
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button
                className="sv-btn-primary"
                style={{ fontSize: "0.9rem", padding: "0.6rem 1.5rem" }}
                onClick={() => handleNavClick("#contact")}
              >
                Boek Nu
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}
        >
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(240, 244, 248, 0.3)",
            }}
          >
            © {currentYear} SoundVision Events. Alle rechten voorbehouden.
          </p>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(240, 244, 248, 0.3)",
            }}
          >
            DJ Tonicity — Uw Allround DJ
          </p>
        </div>
      </div>
    </footer>
  );
}
