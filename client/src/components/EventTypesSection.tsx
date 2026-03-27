/**
 * SoundVision Events — Event Types Section
 * Shows the different types of events served
 */
const eventTypes = [
  {
    id: "wedding",
    title: "Bruiloft",
    subtitle: "Uw mooiste dag",
    description: "Van de ceremonie tot de laatste dans — ik zorg voor de perfecte muzikale begeleiding van uw trouwdag. Romantisch, elegant en onvergetelijk.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/wedding-dj-DqtALdSvgWVVw3zhZFPk6b.webp",
    color: "#00c8ff",
    icon: "💍",
  },
  {
    id: "corporate",
    title: "Bedrijfsfeest",
    subtitle: "Professioneel & stijlvol",
    description: "Teambuilding, jubileumfeest of bedrijfsgala — ik lever een professionele show die past bij uw bedrijfscultuur en uw gasten imponeren.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/corporate-event-Efxd4ZRCNusPmXbgkrD8mM.webp",
    color: "#0090ff",
    icon: "🏢",
  },
  {
    id: "party",
    title: "Verjaardag & Feest",
    subtitle: "Energie & plezier",
    description: "Verjaardag, vrijgezellenfeest of gewoon een geweldig feest — ik zorg dat de dansvloer vol blijft en uw gasten de nacht van hun leven hebben.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663484862365/6RH3PKVEJrkwHnmCKCLqmc/party-dj-2QDn4hBrwJPQD44Ji8JRhm.webp",
    color: "#ff5500",
    icon: "🎉",
  },
];

export default function EventTypesSection() {
  return (
    <section
      id="events"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#080c10" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(0, 200, 255, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(255, 85, 0, 0.06) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            Evenementen
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
            VOOR ELKE
            <span
              style={{
                background: "linear-gradient(135deg, #00c8ff, #0090ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}GELEGENHEID
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
            Of het nu een intieme bruiloft, een groot bedrijfsfeest of een energiek verjaardagsfeest is — ik pas mijn show volledig aan op uw evenement.
          </p>
        </div>

        {/* Event cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {eventTypes.map((event, i) => (
            <div
              key={event.id}
              className="sv-fade-up group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                animationDelay: `${i * 0.15}s`,
                border: "1px solid rgba(255, 255, 255, 0.07)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = `0 20px 60px rgba(${event.color === "#00c8ff" ? "0, 200, 255" : event.color === "#ff5500" ? "255, 85, 0" : "0, 144, 255"}, 0.2)`;
                e.currentTarget.style.borderColor = `${event.color}44`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.07)";
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(8,12,16,0.95) 0%, rgba(8,12,16,0.3) 60%, transparent 100%)",
                  }}
                />
                {/* Icon badge */}
                <div
                  className="absolute top-4 left-4"
                  style={{
                    background: "rgba(8, 12, 16, 0.75)",
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${event.color}44`,
                    borderRadius: "8px",
                    padding: "0.5rem 0.75rem",
                    fontSize: "1.25rem",
                  }}
                >
                  {event.icon}
                </div>
              </div>

              {/* Content */}
              <div
                className="p-6"
                style={{ background: "rgba(10, 15, 21, 0.95)" }}
              >
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    color: event.color,
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  {event.subtitle}
                </div>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.75rem",
                    letterSpacing: "0.05em",
                    color: "#f0f4f8",
                    marginBottom: "0.75rem",
                  }}
                >
                  {event.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.875rem",
                    color: "rgba(240, 244, 248, 0.6)",
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
