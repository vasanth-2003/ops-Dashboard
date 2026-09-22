# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project purpose

Affiliate Ops Dashboard — an internal tool for running an affiliate marketing business. It centralizes link performance, niche/product research, content scheduling, and payout tracking so these don't live in separate spreadsheets.

The owner is a beginner learning Claude Code. Prefer clear, explained changes over clever/terse ones, and surface tradeoffs instead of silently picking one.

## Current technology stack

Confirmed (nothing else should be assumed or substituted without asking):
- Frontend: React
- Styling: Tailwind CSS
- Server-state / data fetching: TanStack Query
- Backend: Node.js + Express
- Database: MongoDB
- Version control: Git

Status: the repository has no code yet — no `package.json`, no source files, no commits. Build/lint/test/dev commands do not exist yet and must not be invented. The first time real scaffolding is added, this file must be updated with the actual commands (install, dev server, build, lint, test — including how to run a single test).

## Planned modules

1. **Link tracking & analytics** — create/manage affiliate links, capture clicks/conversions, report performance (clicks, conversions, EPC, revenue) per link, product, and niche.
2. **Niche/product research board** — evaluate potential niches/products before committing (e.g. researching → testing → active → dropped), tracking commission rates, competition, demand signals.
3. **Content calendar** — schedule content tied to specific products/links/campaigns, with publish status and dates.
4. **Payout tracker** — record affiliate network payouts (expected vs. received, dates, network, method), reconciled against revenue from link analytics.

## Planned architecture

- React (Tailwind for styling) talks to an Express API over HTTP; TanStack Query owns server-state caching/refetching on the frontend — avoid duplicating that state in component state or a separate global store.
- Express talks to MongoDB directly (driver or ODM choice — e.g. Mongoose — is not yet decided; ask before introducing one).
- Data model anchor: a **product/niche** document is the central entity. Links belong to a product, content pieces target a product, and payouts are attributed to a network/product rather than an individual link (a network payout is many-to-one against links/products, not one-to-one — don't model it as one-to-one).
- Changes to the product/niche schema likely ripple into links, content, and payouts — check all three before altering it.
- Click tracking implies a public-facing redirect endpoint (e.g. `/r/:linkId`) that logs an event and then redirects. This is unbuilt; when it's designed, document the chosen approach here.

## Coding conventions

- If a task requires introducing a new framework, database, state-management library, or major architectural dependency, stop before making that change and ask for approval.
- No comments that restate what code does. Only comment on non-obvious "why" (a workaround, a subtle constraint).
- No speculative abstractions, config flags, or "future-proofing" for modules that don't exist yet. Build what the current module needs.
- Keep monetary values as integers (smallest currency unit, e.g. cents) or a decimal-safe type — never plain floats — since this app tracks real payouts.
- Store timestamps in UTC; convert to local time only at display time (matters for click logs and the content calendar).

## Testing expectations

- No test framework is chosen yet. Before writing the first test, propose a framework (e.g. Vitest/Jest for unit, something for API integration tests) and confirm before adding it as a dependency.
- Once a framework exists, every new module (link tracking, research board, content calendar, payout tracker) should get tests for its core logic (analytics aggregation, payout reconciliation math, etc.) — these are the parts most likely to have subtle bugs and hardest to eyeball-check.
- Do not claim "tests pass" without actually having run them in this session.

## Git safety rules

- Never run destructive git commands (`push --force`, `reset --hard`, `checkout --`/`restore` that discards changes, `clean -f`, `branch -D`) unless explicitly asked for that specific action.
- Run `git status` before any command that could discard uncommitted work.
- Only commit when explicitly asked to. Never use `git add -A`/`git add .` blindly — review what's staged.
- Never skip hooks (`--no-verify`) or bypass signing.
- Never push to a remote unless explicitly asked.

## Security expectations

- Never commit secrets (API keys, DB connection strings, tokens). Use environment variables and a `.env` file that is gitignored.
- Validate and sanitize untrusted request input, and prevent user-controlled MongoDB operators from being passed directly into database queries.
- Validate and sanitize input at API boundaries (Express routes), especially anything that reaches MongoDB or gets rendered back in the frontend.
- The link redirect endpoint is public-facing — treat any input to it (link IDs, query params) as untrusted.

## Rules for making architectural changes

- Any change to the stack (new library, new service, new database, restructuring folders) must be proposed and explained before being made — not silently introduced mid-task.
- Any change to the product/niche data model must call out which of the other three modules (links, content, payouts) are affected, since they all reference it.
- Prefer the smallest change that solves the current task. Don't restructure unrelated code while implementing a feature.

## Rules for verifying work before claiming completion

- Before saying a feature "works," actually run it (dev server, relevant script, or test) — don't infer success from the code looking correct.
- Before saying "tests pass," run the tests in this session and show/report the result.
- If something can't be verified in this environment (e.g. no way to click through the UI), say so explicitly instead of asserting it works.
- When a task touches money (payout tracker) or public endpoints (redirect/click tracking), double-check edge cases (zero/negative amounts, missing link IDs) before calling it done.
- Frontend UI must be responsive across mobile, tablet, and desktop screen sizes. Use Tailwind responsive utilities and verify new UI behavior at multiple viewport widths before considering the UI complete.
- Keep frontend and backend code clearly separated and organize new code by feature/module where practical. Do not reorganize existing files or folders unless the current task explicitly requires it.
