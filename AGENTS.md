# AGENTS.md — Soundvision Events

Instructions for any AI coding agent (Cursor, OpenAI Codex, or otherwise) working in this repository. Read this before making changes. Keep it in sync — see "Recent updates / lessons learned" at the bottom.

## Project

Soundvision Events is a DJ / events-booking website (DJ Tonicity et al.), built as a Node/TypeScript full-stack app.

- **Frontend:** React 19 + Vite + Tailwind CSS 4, in `client/`
- **Backend:** Express + tRPC, in `server/`
- **Database:** MySQL via Drizzle ORM, schema in `shared/`, migrations in `drizzle/`
- **Package manager:** `pnpm` (pinned in `package.json` — do not use `npm`/`yarn`)

## Common commands

```bash
pnpm install          # install dependencies
pnpm dev               # local dev server (tsx watch)
pnpm build             # production build (vite + esbuild)
pnpm start             # run production build
pnpm check             # TypeScript type-check (tsc --noEmit)
pnpm format            # prettier --write .
pnpm test              # vitest run
pnpm db:push           # drizzle-kit generate + migrate
```

## Project conventions ("Algemene regels")

These apply to this repo and to Sound Vision sites generally:

- **UI copy is Dutch.** All user-facing text on the site must be in Dutch.
- **"DJ Tonicity"** — always this casing/spacing (not "Dj Tonicity" or variants), sitewide.
- **Preview locally before shipping.** Use `pnpm dev` (optionally with a `?domain=…` query param when testing multi-domain behavior) to verify changes before any deploy.
- **Do not deploy/build for small copy or CSS edits** unless the user explicitly asks to "deploy" or "go live". Small edits should stay local until requested otherwise.
- **Hosting: mijn.host only.** Per explicit project rule, DNS/deploy/FTP should go through mijn.host — do not set up or move hosting/domains to Manus without the user's explicit confirmation.
  > ⚠️ **Open discrepancy:** `DOMAIN_INFO.md` in this repo currently states the *opposite* — that hosting is on Manus and mijn.host is being phased out. This has not been reconciled. Do **not** act on hosting/DNS/deploy changes based on either source alone — confirm the current, correct setup with the user first.
- **Task tracking:** site tasks are tracked in Linear (team "Soundvision Events"). Prefer creating/updating issues there over ad-hoc TODOs when asked to track work.
- **Multi-agent workflow:** this repo may be worked on by different AI agents/tools (Cursor cloud agents, Codex, etc.) across different sessions. They don't share memory — this file and the git history are the shared source of truth. Keep decisions and conventions written down here rather than only in a chat.

## Recent updates / lessons learned

Append a short dated entry here at the end of a session or after a notable change/decision, so future agents (any tool) don't have to rediscover context.

- **2026-07-30** — Created this `AGENTS.md` so both Cursor and other coding agents (e.g. OpenAI Codex) share the same project conventions instead of relying solely on per-tool personal settings. Flagged an unresolved conflict between the "mijn.host only" hosting rule and `DOMAIN_INFO.md` (which currently describes Manus as the live host) — needs user confirmation before any hosting/DNS work.
