# VibeMeal AI (Next.js App Router)

A full-stack AI meal generation app with mood-based theming, glassmorphism visuals, and Minimax-backed API routes.

## Stack
- Next.js 14 (App Router)
- TailwindCSS
- Framer Motion
- Zustand state management
- API routes + Minimax abstraction layer

## Setup
```bash
cp .env.example .env.local
# add MINIMAX_API_KEY
npm install
npm run dev
```

## API Endpoints
- `POST /api/meal-ideas`
- `POST /api/ingredient-prediction`
- `POST /api/recipe`

If Minimax is unavailable or key is missing, endpoints return curated mock data so UI remains functional.
