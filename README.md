# VibeMeal AI (Next.js App Router)

A full-stack AI meal generation app with mood-based theming, cuisine-first recommendations, glassmorphism visuals, and Minimax-backed API routes.

## Stack
- Next.js 14 (App Router)
- TailwindCSS
- Framer Motion
- Zustand state management
- API routes + Minimax abstraction layer

## Features
- Mood selector with dynamic visual theme (`cozy`, `spicy`, `light`, `energy`)
- Cuisine selector chips (Indian, Arabian, Chinese, Italian, etc.)
- Guided placeholders for budget/diet/time/ingredients so users discover input options quickly
- AI meal idea generation + missing ingredient prediction + recipe steps
- Interactive meal cards and animated recipe modal

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
