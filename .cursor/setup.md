# TokenScope – Setup Guide

## Prerequisites
- Node.js v20+
- pnpm v8+
- Docker (for local Postgres)
- Git

## 1. Clone the Repository
```sh
git clone <repo-url>
cd tokenscope
```

## 2. Install Dependencies
```sh
pnpm install
```

## 3. Environment Variables
- Copy `.env.example` to `.env` and fill in required secrets (GitHub OAuth, database URL, etc.):
```sh
cp .env.example .env
```
- See comments in `.env.example` for details.

## 4. Database Setup (Local)
- Start Postgres (Docker recommended):
```sh
docker compose up -d db
```
- Run migrations and seed:
```sh
pnpm prisma migrate dev
pnpm db:seed
```

## 5. Running the App
- Start the Next.js app:
```sh
pnpm dev
```
- Visit [http://localhost:3000](http://localhost:3000)

## 6. Testing
- Run all tests:
```sh
pnpm test
```
- Run e2e tests:
```sh
pnpm test:e2e
```

## 7. Troubleshooting
- If you see database errors, check Postgres is running and `.env` is correct.
- For OAuth issues, verify GitHub app credentials and callback URL.
- For more, see project README or open an issue.