# TokenScope Development Logs

> This file records progress as mandated by `.cursor/implementation-plan.md`.

## Logging Format
```
## YYYY-MM-DD HH:MM – <commit hash>
- scope: <type>(scope)
- summary: short description
- tests: ☑️ / ❌
- docs: updated files list
- notes: blockers / next actions
```

## 2025-07-16 00:00 – INIT
- scope: chore(repo)
- summary: Bootstrap logs file and templates
- tests: N/A
- docs: .cursor/logs.md created
- notes: begin Phase 0 once repo scaffolding starts.

## 2025-07-16 01:05 – 2eda9d2
- scope: chore(repo)
- summary: initialise monorepo with pnpm workspace, base dirs, README, gitignore
- tests: N/A
- docs: README.md, .gitignore
- notes: Phase 0 step 1 complete. Next: set up GitHub Actions CI (step 2).

## 2025-07-16 01:15 – cb5734a
- scope: ci(github)
- summary: add base GitHub Actions workflow (install, lint, test, build) using pnpm cache
- tests: N/A (workflow only)
- docs: none
- notes: Phase 0 step 2 complete. Proceed to Phase 1 scaffold.

## 2025-07-16 01:30 – b9a2541
- scope: feat(web)
- summary: scaffold Next.js 15 app with Tailwind, basic page component, configs
- tests: N/A (app skeleton)
- docs: none yet
- notes: Phase 1 step 3 complete. Next: add NextAuth and tRPC setup.

## 2025-07-16 01:50 – 199ed9d
- scope: feat(web)
- summary: add NextAuth.js GitHub provider and full tRPC v10 setup (router, API route, client provider) with hello query demo
- tests: manual compile OK (no tests yet)
- docs: none yet (to update auth & trpc guide later)
- notes: Phase 1 steps 4 & 5 complete. Next: add Playwright smoke test (step 6).

## 2025-07-16 02:05 – c2cc881
- scope: test(web)
- summary: add Playwright config and homepage smoke e2e test; script `test:e2e`
- tests: playwright test passes locally (manual run)
- docs: none yet
- notes: Phase 1 step 6 complete. Phase 1 finished.

## 2025-07-16 02:20 – e407181
- scope: build(db)
- summary: added Prisma schema (User, Portfolio, Holding, Alert) and root deps scripts
- tests: N/A (schema only)
- docs: to create docs/database-schema.md later
- notes: Phase 2 step 7 done. Next: seed script.