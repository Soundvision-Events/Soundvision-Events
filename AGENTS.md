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
- **Hosting: mijn.host only. Never Manus.** DNS/deploy/FTP must go through mijn.host. Manus hosting/domains are explicitly forbidden — do not set up, extend, or migrate anything further onto Manus, even if existing docs or infra currently point there.
  > ⚠️ **Known bad state:** `DOMAIN_INFO.md` in this repo currently documents the site as live on Manus (with mijn.host listed as "being phased out"). That reflects an unwanted migration that happened and needs to be undone, not a target state — the direction of travel is *back* to mijn.host, away from Manus. Do not treat `DOMAIN_INFO.md`'s "current hosting" as something to preserve or build on top of.
- **Task tracking:** site tasks are tracked in Linear (team "Soundvision Events"). Prefer creating/updating issues there over ad-hoc TODOs when asked to track work.
- **Multi-agent workflow:** this repo may be worked on by different AI agents/tools (Cursor cloud agents, Codex, etc.) across different sessions. They don't share memory — this file and the git history are the shared source of truth. Keep decisions and conventions written down here rather than only in a chat.

## Recent updates / lessons learned

Append a short dated entry here at the end of a session or after a notable change/decision, so future agents (any tool) don't have to rediscover context.

- **2026-07-30** — Created this `AGENTS.md` so both Cursor and other coding agents (e.g. OpenAI Codex) share the same project conventions instead of relying solely on per-tool personal settings.
- **2026-07-30** — Confirmed with user: Manus hosting is explicitly rejected ("never Manus"). `DOMAIN_INFO.md` describing Manus as current hosting reflects an unwanted state to migrate away from, not a target — mijn.host is the only correct host going forward.
