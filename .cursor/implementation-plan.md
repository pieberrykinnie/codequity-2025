# Implementation Plan – TokenScope

This document defines every actionable step required to deliver the TokenScope MVP, expressed as discrete Conventional Commits. Each numbered item is a **single Git commit**.

All commits follow this template:
```
<type>(scope): short imperative summary

BODY (optional) – rationale or context

TEST PLAN:
1. …
2. …

DOCS:
- File(s) to update
```
`type` = feat | fix | chore | docs | refactor | build | ci | perf | test | BREAKING CHANGE.

Progress must be recorded in `.cursor/logs.md` immediately after each commit. Logs include: date, commit hash, scope, status, follow-ups. Older logs are condensed when no longer relevant.

---
## Phase 0 – Repo & Workspace Setup

1. **chore(repo): initialise monorepo with pnpm-workspace & readme skeleton**
   TEST PLAN: `pnpm --version` runs; repo installs with `pnpm install`.
   DOCS: `README.md` outline.

2. **ci(github): add base GitHub Actions for install + lint + test + build**
   TEST PLAN: workflow passes on PR.
   DOCS: `docs/ci.md`.

---
## Phase 1 – Frontend Scaffold (Next.js)

3. **feat(web): scaffold Next.js 15 app with Tailwind & shadcn/ui**
   TEST PLAN:
   1. `pnpm dev` renders default page at http://localhost:3000.
   2. `pnpm build` succeeds.
   DOCS: `docs/frontend/setup.md`.

4. **feat(web): configure NextAuth.js with GitHub provider (dev only)**
   TEST PLAN: Sign-in works locally using `.env.development` creds.
   DOCS: update auth section in frontend docs.

5. **feat(web): integrate tRPC & zod for type-safe API routes**
   TEST PLAN: Example `hello` procedure returns JSON in browser + type safety enforced.
   DOCS: tRPC usage guide.

6. **test(web): add Playwright e2e smoke spec for homepage render & auth redirect**
   TEST PLAN: `pnpm test:e2e` passes in CI.
   DOCS: mention test command.

---
## Phase 2 – Backend & DB

7. **build(db): add Prisma schema with User, Portfolio, Holding, Alert tables**
   TEST PLAN: `pnpm prisma migrate dev` creates tables locally.
   DOCS: `docs/database-schema.md` ER diagram.

8. **feat(db): seed script with mock user & holdings**
   TEST PLAN: `pnpm db:seed` populates 1 user, 3 holdings.
   DOCS: update seed guide.

9. **build(api): create Next.js Edge functions for portfolio CRUD**
   TEST PLAN: Postman calls return 200 & manipulate DB; Playwright e2e extended.
   DOCS: API reference.

---
## Phase 3 – AI Agent Engine (VoltAgent Package)

10. **feat(agent): initialise VoltAgent package with basic supervisor & ping task**
    TEST PLAN: `pnpm agent:dev` starts VoltAgent server & returns ping.
    DOCS: `docs/agents/overview.md`.

11. **feat(agent): implement Token Fetcher agent with CoinGecko & Covalent adapters**
    TEST PLAN: unit test mocks API and asserts JSON shape.
    DOCS: agent spec file.

12. **feat(agent): implement Treasury Fetcher agent (Robinhood mock, Erebor mock)**
    TEST PLAN: jest tests + manual run prints holdings.
    DOCS: update adapters section.

13. **feat(agent): add Risk Analyzer agent (volatility, concentration calc)**
    TEST PLAN: Pass sample dataset to analyzer, expect computed metrics.
    DOCS: risk formulas page.

14. **feat(agent): add Summarizer agent with gpt-3.5-turbo**
    TEST PLAN: given metrics, returns markdown summary; snapshot test.
    DOCS: summarizer usage.

15. **feat(agent): wire Supervisor workflow & memory (pgvector)**
    TEST PLAN: End-to-end run (`npm run demo`) fetches, analyzes, summarises.
    DOCS: sequence diagram in `docs/architecture.md`.

16. **perf(agent): enable Langfuse exporter for observability**
    TEST PLAN: traces visible in Langfuse dashboard; CI smoke test.
    DOCS: observability guide.

17. **test(agent): add jest test suite for all agent modules (85% coverage goal)**
    TEST PLAN: `pnpm test:unit` passes & coverage threshold enforced.
    DOCS: testing strategy.

---
## Phase 4 – Frontend ↔ Agent Integration

18. **feat(web): add WebSocket bridge to VoltAgent supervisor**
    TEST PLAN: chat UI sends prompt, receives summary; Playwright test simulates user query.
    DOCS: integration guide.

19. **feat(web): dashboard UI with holdings table, exposure charts, alerts sidebar**
    TEST PLAN: visual regression via @playwright/test-snapshots; manual QA.
    DOCS: screenshots in README.

20. **feat(alerts): cron Edge function triggers Alert Manager agent & pushes Toast + email**
    TEST PLAN: jest fake timers + email stub; Playwright verifies toast display.
    DOCS: alert configuration doc.

---
## Phase 5 – DevEx & Docs Cleanup

21. **docs(root): populate README with setup, run, deploy instructions & visuals**
    TEST PLAN: markdown lint passes.

22. **docs(slides): create Marimo notebook slides with live code cells**
    TEST PLAN: `marimo run slides/demo.py` shows deck; export to PDF for judges.

23. **chore(env): add .env.example with placeholders & instructions**
    TEST PLAN: `cp .env.example .env && pnpm dev` boots.

24. **ci(vercel): configure prod & preview deployments**
    TEST PLAN: push to `main` triggers Vercel build success.

---
## Phase 6 – Demo & Polish

25. **feat(web): add demo mode toggle with mock data for offline presentation**
    TEST PLAN: `NEXT_PUBLIC_DEMO=1` renders static charts.

26. **perf(build): tree-shake agent package & split chunks for faster cold start**
    TEST PLAN: `pnpm build` bundle size < 2 MB.

27. **fix(a11y): run axe-core audit, address color contrast & aria labels**
    TEST PLAN: `pnpm test:a11y` passes.

28. **test(e2e): final full user-journey test (sign in → connect wallet → ask query)**
    TEST PLAN: Playwright run green in CI.

29. **docs(readme): add badges, demo GIF, pitch video link**
    TEST PLAN: manual preview.

30. **build(version): bump to v0.1.0 & tag for submission**
    TEST PLAN: `git tag v0.1.0` exists; CHANGELOG generated.

---
### Ongoing Logging Procedure (.cursor/logs.md)
* After each git commit, append an entry:
  ```
  ## YYYY-MM-DD hh:mm – <commit hash>
  - scope: <type>(scope)
  - summary: …
  - tests: ☑️ / ❌
  - docs: updated files
  - notes: blockers / next actions
  ```
* Every morning compress resolved items into a single synopsis to keep the file concise (<300 lines).

---
## Testing Matrix Summary
| Layer          | Tool        | Trigger             |
|----------------|------------|---------------------|
| Unit           | Vitest/Jest| `pnpm test:unit`    |
| DB migrations  | Prisma     | CI step            |
| Agent logic    | Jest       | Step 17            |
| API            | tRPC tests | CI                 |
| E2E            | Playwright | Steps 6,18,28      |
| Accessibility  | axe-playwright | Step 27 |
| Lint/Format    | ESLint + Prettier | pre-commit hook |

---
## Documentation Strategy
Only 10 files allowed in `docs/` by end-state. We will maintain:
1. `docs/architecture.md`
2. `docs/frontend/setup.md`
3. `docs/database-schema.md`
4. `docs/agents/overview.md`
5. `docs/agents/adapters.md`
6. `docs/observability.md`
7. `docs/ci.md`
8. `docs/testing.md`
9. `docs/security.md`
10. `docs/deployment.md`
If a new doc is needed, refactor/merge to keep ≤10.

---
## Deployment Guarantee
Following all steps ensures:
* `pnpm dev`, `pnpm lint`, `pnpm build`, `pnpm test`, `pnpm test:e2e` all pass locally & in CI.
* Vercel preview/production environments deploy without error.
* VoltAgent server boots and responds under Vercel Edge Function.
* Marimo slides render on GitHub Pages (static export).

---
_Adhering to this implementation plan will produce a fully functioning, observable, and documented TokenScope MVP ready for CodeQuity2025 submission._