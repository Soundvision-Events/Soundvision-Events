/**
 * SoundVision Events — Contact Section
 * Booking inquiry form and contact info
 */
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Instagram, Youtube } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    package: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success("Uw aanvraag is verstuurd! We nemen zo snel mogelijk contact met u op.", {
        duration: 5000,
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        package: "",
        message: "",
      });
      setSubmitting(false);
    },
    onError: (err) => {
      toast.error("Er ging iets mis. Probeer het opnieuw of neem direct contact op.");
      setSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    submitMutation.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      eventType: form.eventType || undefined,
      eventDate: form.eventDate || undefined,
      packageType: form.package || undefined,
      message: form.message || undefined,
    });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    color: "#f0f4f8",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
    >
      {/* 50% dark overlay — lets YouTube backdrop show through */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(8, 12, 16, 0.30)", pointerEvents: "none", zIndex: 0 }}
      />
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(0, 200, 255, 0.06) 0%, transparent 50%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 sv-fade-up">
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "#00c8ff",
              textTransform: "uppercase",
            }}
          >
            Contact
          </span>
          <h2
            className="mt-3"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "0.05em",
              lineHeight: 1.05,
              color: "#f0f4f8",
            }}
          >
            BOEK UW
            <span
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}DJ SHOW
            </span>
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1rem",
              color: "rgba(240, 244, 248, 0.6)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Vul het formulier in voor een vrijblijvende offerte. We reageren binnen 24 uur.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 sv-fade-up">
            <div className="space-y-6 mb-10">
              {[
                {
                  icon: <Phone size={18} color="#00c8ff" />,
                  label: "Telefoon",
                  value: "+31 6 12345678",
                  href: "tel:+31612345678",
                },
                {
                  icon: <Mail size={18} color="#00c8ff" />,
                  label: "E-mail",
                  value: "contact@soundvision.com",
                  href: "mailto:contact@soundvision.com",
                },
                {
                  icon: <MapPin size={18} color="#00c8ff" />,
                  label: "Regio",
                  value: "Groningen & Noord-Nederland",
                  href: undefined,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: "rgba(0, 200, 255, 0.08)",
                      border: "1px solid rgba(0, 200, 255, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.75rem",
                        color: "rgba(240, 244, 248, 0.45)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.95rem",
                          color: "#f0f4f8",
                          textDecoration: "none",
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.95rem",
                          color: "#f0f4f8",
                        }}
                      >
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(240, 244, 248, 0.45)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Volg Ons
              </div>
              <div className="flex gap-3">
                {[
                  {
                    icon: <Instagram size={18} />,
                    label: "Instagram",
                    href: "https://www.instagram.com/soundvisionevents",
                  },
                  {
                    icon: <Youtube size={18} />,
                    label: "YouTube",
                    href: "https://www.youtube.com/@SoundVisionEvents",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.6rem 1rem",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      color: "rgba(240, 244, 248, 0.7)",
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.8rem",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0, 200, 255, 0.4)";
                      e.currentTarget.style.color = "#00c8ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.color = "rgba(240, 244, 248, 0.7)";
                    }}
                  >
                    {social.icon}
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Logo banner */}
            <div
              className="mt-10 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(0, 200, 255, 0.15)",
              }}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/soundvision-logo-banner_upscaled_7472d161.jpg"
                alt="SoundVision Events Logo"
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 sv-fade-up">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
              }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(240, 244, 248, 0.6)",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Naam *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Uw volledige naam"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0, 200, 255, 0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(240, 244, 248, 0.6)",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="uw@email.nl"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0, 200, 255, 0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(240, 244, 248, 0.6)",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Telefoon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+31 6 XX XX XX XX"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0, 200, 255, 0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  />
                </div>

                {/* Event date */}
                <div>
                  <label
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(240, 244, 248, 0.6)",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Datum Evenement *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={form.eventDate}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, colorScheme: "dark" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0, 200, 255, 0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  />
                </div>

                {/* Event type */}
                <div>
                  <label
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(240, 244, 248, 0.6)",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Type Evenement *
                  </label>
                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0, 200, 255, 0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  >
                    <option value="" style={{ background: "#0a0f15" }}>Selecteer type</option>
                    <option value="bruiloft" style={{ background: "#0a0f15" }}>Bruiloft</option>
                    <option value="bedrijfsfeest" style={{ background: "#0a0f15" }}>Bedrijfsfeest</option>
                    <option value="verjaardag" style={{ background: "#0a0f15" }}>Verjaardag</option>
                    <option value="vrijgezellenfeest" style={{ background: "#0a0f15" }}>Vrijgezellenfeest</option>
                    <option value="schoolfeest" style={{ background: "#0a0f15" }}>Schoolfeest</option>
                    <option value="anders" style={{ background: "#0a0f15" }}>Anders</option>
                  </select>
                </div>

                {/* Package */}
                <div>
                  <label
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(240, 244, 248, 0.6)",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Gewenst Pakket
                  </label>
                  <select
                    name="package"
                    value={form.package}
                    onChange={handleChange}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0, 200, 255, 0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  >
                    <option value="" style={{ background: "#0a0f15" }}>Nog niet zeker</option>
                    <option value="small" style={{ background: "#0a0f15" }}>Small Show</option>
                    <option value="medium" style={{ background: "#0a0f15" }}>Medium Show</option>
                    <option value="large" style={{ background: "#0a0f15" }}>Large Show</option>
                  </select>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(240, 244, 248, 0.6)",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Bericht / Extra Informatie
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Vertel ons meer over uw evenement, locatie, aantal gasten en speciale wensen..."
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0, 200, 255, 0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="sv-btn-primary mt-6"
                style={{
                  width: "100%",
                  fontSize: "1.1rem",
                  padding: "1rem",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Versturen..." : "Vrijblijvende Offerte Aanvragen"}
              </button>

              <p
                className="mt-3 text-center"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(240, 244, 248, 0.35)",
                }}
              >
                Wij reageren binnen 24 uur op uw aanvraag.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
