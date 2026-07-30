# SoundVision Events — Domain & Hosting Reference

> ⚠️ **Correction (2026-07-30):** the "Manus" hosting referenced below is an unwanted state, not a target. Explicit rule: **never Manus** — hosting/DNS/deploy/FTP must be mijn.host only. Treat everything below as "what to migrate away from", not as infra to build on or extend. See `AGENTS.md`.

## Domeinen

| Domein | Status | Verhuiscode | Notitie |
|---|---|---|---|
| soundvisionevents.nl | Actief (Manus hosting) | `gqzBfew9A8uj` | Primair domein |
| djgroningen.nl | Actief (Manus hosting) | `zHYukVpxbVyK` | Alias domein |
| soundvisionevents.eu | In behandeling | Nog niet beschikbaar | Registrar werkt eraan |
| debruiloft-dj.nl | Beschikbaar | — | Nog vast te leggen |

## E-mail

- **Provider:** Zoho Mail
- **Zakelijk adres:** info@soundvisionevents.nl
- **Persoonlijk adres:** bert_sv@icloud.com
- **IMAP/SMTP info:** https://www.zoho.com/nl/mail/help/imap-access.html
- **Zoho SMTP server:** smtp.zoho.eu (poort 465 SSL / 587 TLS)

## Hosting

- **Huidige hosting:** Manus platform (soundvision-6rh3pkve.manus.space)
- **Oude hosting:** Vervalt (mijn.host) — website en mailbox overzetten naar Zoho/Manus

## Notities

- Mailbox migratie: verbinding maken via IMAP met Zoho (zie link hierboven)
- SMTP toegang in Zoho moet worden ingeschakeld voor e-mail notificaties vanuit de website
