# CookFlow AI

CookFlow AI is a high-performance, personalized daily cooking planner and budget calculator powered by Google Gemini API. It designs customized meal plans (Breakfast, Lunch, and Dinner) matching available ingredients, specific budget boundaries, dietary restrictions, and kitchen skills while coordinating a unified shopping list, ingredient substitution alternatives, and a synchronized timeline to prepare everything with minimal stress.

## Features

- **Personalized Cooking Plans**: Generates Breakfast, Lunch, and Dinner recommendations matching user constraint profile.
- **Checkable Shopping List**: Ingredients grouped by category (Produce, Pantry, Dairy, Meat) with estimated cost.
- **Synchronized Cooking Timeline**: Time-interval steps specifying actions to synchronize meal prep and cooking.
- **Ingredient Substitutions**: Clean table specifying alternative items and logical swap justifications.
- **Detailed Budget Cards**: Highlights overall cost calculations, per-person estimations, and smart money-saving advice.
- **Accessible & Premium Dark Mode**: High-contrast accessibility features, keyboard navigation, and micro-animations.

---

## Directory Structure

```
PromptWar/
├── backend/
│   ├── app/
│   │   ├── prompts/
│   │   │   └── prompt_builder.py
│   │   ├── routers/
│   │   │   └── planner.py
│   │   ├── schemas/
│   │   │   └── planner.py
│   │   ├── services/
│   │   │   └── gemini_service.py
│   │   ├── utils/
│   │   │   └── sanitization.py
│   │   ├── config.py
│   │   └── main.py
│   ├── tests/
│   │   ├── test_integration.py
│   │   └── test_unit.py
│   ├── requirements.txt
│   ├── .env.example
│   └── render.yaml
├── frontend/
│   ├── src/
│   │   ├── __tests__/
│   │   │   └── PlannerForm.test.tsx
│   │   ├── components/
│   │   │   ├── BudgetCard.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── CookingTimeline.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── LoadingIndicator.tsx
│   │   │   ├── MealCards.tsx
│   │   │   ├── PlannerForm.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── ShoppingList.tsx
│   │   │   ├── Substitutions.tsx
│   │   │   ├── Textarea.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── hooks/
│   │   │   └── usePlanner.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── test/
│   │   │   └── setup.ts
│   │   ├── types/
│   │   │   └── planner.ts
│   │   ├── utils/
│   │   │   ├── theme.ts
│   │   │   └── validation.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── vercel.json
│   └── .env.example
└── README.md
```

---

## Local Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Copy environment configuration and configure your Gemini API Key:
   ```bash
   cp .env.example .env
   # Open .env and populate GEMINI_API_KEY="your-gemini-key"
   ```
4. Start the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend server will run on `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install NodeJS packages:
   ```bash
   npm install
   ```
3. Copy environment configurations:
   ```bash
   cp .env.example .env
   ```
4. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   The frontend application will run on `http://localhost:5173`.

---

## Verification & Testing

### Backend Verification
Verify that both the unit and integration tests compile and run successfully:
```bash
cd backend
pytest
```

### Frontend Verification
Run component unit tests:
```bash
cd frontend
npm run test
```
Build production bundles to verify compilation sanity:
```bash
npm run build
```

---

## Deployment Instructions

### Deploy Frontend (Vercel)
The project includes a `vercel.json` routing configuration setup. You can deploy it using the Vercel CLI:
```bash
cd frontend
vercel
```
Ensure you add `VITE_API_BASE_URL` pointing to your deployed backend URL.

### Deploy Backend (Render)
The project includes a `render.yaml` configuration setup. In Render dashboard:
1. Create a new Web Service.
2. Link your GitHub repository.
3. Configure `GEMINI_API_KEY` and `ALLOWED_ORIGINS` environment variables.
4. Render automatically parses build and launch commands from the repository `render.yaml` blueprint.
