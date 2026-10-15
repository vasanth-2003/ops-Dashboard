# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project purpose

Affiliate Ops Dashboard — an internal tool for running an affiliate marketing business. It centralizes link performance, niche/product research, content scheduling, and payout tracking so these don't live in separate spreadsheets.

The owner is a beginner learning Claude Code. Prefer clear, explained changes over clever/terse ones, and surface tradeoffs instead of silently picking one.

## Technology stack

Confirmed (nothing else should be assumed or substituted without asking):
- Frontend: React + Vite, styled with Tailwind CSS
- Server state / data fetching: TanStack Query
- Backend: Node.js + Express
- Database: MongoDB via Mongoose
- Tests: Vitest + Supertest
- Version control: Git

Available scripts live in `package.json` — check it rather than assuming commands exist. Frontend and backend run as two separate dev processes; don't add a combined "run everything" script without asking.

## Modules

1. **Link tracking & analytics** — affiliate links, click/conversion capture, performance reporting.
2. **Niche/product research board** — evaluate niches/products before committing.
3. **Content calendar** — schedule content tied to products/links/campaigns.
4. **Payout tracker** — affiliate network payouts, reconciled against link revenue.

For what is currently implemented, read the code (`server/features/`, `src/`) — this file does not track feature status.

## Architecture

- React talks to an Express API over HTTP. TanStack Query owns server-state caching/refetching — don't duplicate that state in component state or a global store.
- The Vite dev server proxies `/api` and `/r` to the backend (see `vite.config.js`), so frontend code uses relative paths, not a hardcoded host/port. Don't add `cors` unless the deployment architecture changes — ask first.
- A **product/niche** document is the central entity: links belong to a product, content targets a product, and payouts are attributed to a network/product (many-to-one against links/products, never one-to-one). The product/niche model doesn't exist yet, so existing models may hold plain-string placeholders for it.
- Backend layout: `server/app.js` builds the Express app (import it in tests rather than duplicating setup), `server/index.js` is the entry point, `server/config/` holds env and DB setup. Each module gets its own `server/features/<name>/` folder (model, validation, controller, routes) — not flat `models/`/`routes/` folders.
- Configuration comes from environment variables. `.env` is local-only and gitignored; `.env.example` documents the required variables without real values.

## Coding conventions

- No comments that restate what code does. Only comment on a non-obvious "why" (a workaround, a subtle constraint).
- Keep monetary values as integers (smallest currency unit, e.g. cents) or a decimal-safe type — never plain floats.
- Store timestamps in UTC; convert to local time only at display time.
- Keep frontend and backend code clearly separated, and organize new code by feature/module.

## Testing

- Use Vitest for unit tests and Supertest for API tests against the app from `server/app.js`. Don't introduce another test framework without asking.
- Every module's core logic (analytics aggregation, payout reconciliation math, validation) should have tests — these are the parts most likely to hide subtle bugs.
- Do not claim "tests pass" without having run them in this session.

## Security

- Never commit secrets (API keys, DB connection strings, tokens).
- Treat all request input as untrusted. Validate and sanitize it at API boundaries, and never pass user-controlled MongoDB operators directly into queries.
- Public endpoints (e.g. the link redirect) need extra care: treat every path param and query param as hostile.

## Git safety

- Never run destructive git commands (`push --force`, `reset --hard`, `checkout --`/`restore` that discards changes, `clean -f`, `branch -D`) unless explicitly asked for that specific action. Run `git status` before any command that could discard uncommitted work.
- Only commit when explicitly asked. Never use `git add -A`/`git add .` blindly — review what's staged.
- Never push unless explicitly asked.
- Never skip hooks (`--no-verify`) or bypass signing.

## Architectural changes and scope

- Propose and explain before making any change to the stack (new framework, library, database, service, state-management tool, or folder restructuring) — never introduce one silently mid-task.
- Any change to the product/niche data model must call out which of the other modules (links, content, payouts) are affected.
- Prefer the smallest change that solves the current task. No speculative abstractions, config flags, or "future-proofing" for modules that don't exist yet, and don't restructure unrelated code.

## Verifying work

- Before saying a feature "works," actually run it (dev server, script, or tests) — don't infer success from the code looking correct. If something can't be verified in this environment (e.g. clicking through the UI), say so explicitly.
- For money (payout tracker) or public endpoints (redirect/click tracking), double-check edge cases such as zero/negative amounts and missing or malformed IDs.
- Frontend UI must be responsive across mobile, tablet, and desktop. Use Tailwind responsive utilities and verify new UI at multiple viewport widths before considering it complete.

## Maintaining this file

Update CLAUDE.md when a durable project rule, architectural decision, workflow convention, or important constraint changes. Do not use CLAUDE.md as a feature changelog or duplicate source of truth.
