/**
 * SoundVision Events — Footer (Multi-page)
 * Dark footer with route links and branding
 */
import { Link } from "wouter";
import { Instagram, Youtube, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "rgba(5, 8, 16, 0.40)",
        borderTop: "1px solid rgba(0, 200, 255, 0.1)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/logo_dark_upscaled_50cc37d3.png"
                alt="SoundVision Events"
                style={{ height: "40px", width: "auto" }}
              />
            </div>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(240, 244, 248, 0.5)",
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: "360px",
                marginBottom: "1.5rem",
              }}
            >
              Professionele DJ shows in Groningen en Noord-Nederland. Van bruiloften tot bedrijfsfeesten — uw onvergetelijke avond begint hier.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={16} />, href: "https://www.instagram.com/soundvision.events", label: "Instagram" },
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
              DJ SHOWS
            </h4>
            <ul className="space-y-3">
              {[
                { label: "All-Round DJ Show", href: "/" },
                { label: "Bruiloft DJ Show", href: "/bruiloft" },
                { label: "Bedrijfsfeesten", href: "/bedrijfsfeesten" },
                { label: "Studentenfeesten", href: "/studentenfeesten" },
                { label: "Privé Feesten", href: "/prive" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
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
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pakketten & Contact */}
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
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.875rem",
                      color: "rgba(240, 244, 248, 0.5)",
                    }}
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
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button
                className="sv-btn-primary"
                style={{ fontSize: "0.9rem", padding: "0.6rem 1.5rem" }}
                onClick={scrollToContact}
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
            Groningen & Noord-Nederland — DJ Tonicity
          </p>
        </div>
      </div>
    </footer>
  );
}
