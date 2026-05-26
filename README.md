# Medcess

**Repository:** [github.com/Brinmeet123/medcess](https://github.com/Brinmeet123/medcess)

**Medcess** helps students practice clinical reasoning through interactive virtual patient cases. Interview patients, order tests, analyze symptoms, and build diagnoses in realistic medical simulations — in a safe, fictional environment built for high school and pre-med learners.

## Features

- **AI-Powered Patient Interactions**: Chat with AI patients that respond naturally to your questions
- **Physical Examination**: Review different body systems and gather findings
- **Diagnostic Testing**: Order tests and view results
- **Clinical Reasoning Practice**: Formulate differential diagnoses and receive detailed feedback
- **Educational Assessment**: Get comprehensive feedback on your performance
- **Demo Mode**: Mock responses with `DEMO_MODE=true` or on static GitHub Pages

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **AI**: **OpenAI** chat completions (`OPENAI_API_KEY`, optional `AI_MODEL` / `OPENAI_BASE_URL`)
- **Auth & data**: Auth.js (NextAuth v5) with Prisma + PostgreSQL for accounts and progress
- **Deployment**: Ready for Vercel, GitHub Pages, or similar

## Live Demo

🚀 **[Try the Live Demo](https://brinmeet123.github.io/VirtualDiagnosticSimulator.github.io/)**

The GitHub Pages demo uses mock responses (no server). For **real AI**, deploy to Vercel (or run locally) with `OPENAI_API_KEY` set, or use `DEMO_MODE=true` for mocks.

---

## Getting Started

### Prerequisites

- **Node.js 20+** and npm 9+ (specified in `package.json` engines)
- **PostgreSQL** for auth and saved progress (see `.env.example`; Supabase/Neon work well)
- **[OpenAI API key](https://platform.openai.com/api-keys)** for real AI locally (or set `DEMO_MODE=true` for mocks)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment template and fill in secrets:
```bash
cp .env.example .env.local
```

Minimum for local dev with auth and AI:
```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."   # same as DATABASE_URL if you use a direct connection
AUTH_SECRET="use-a-long-random-string-at-least-32-chars"
AUTH_URL="http://localhost:3001"

OPENAI_API_KEY="sk-..."
AI_MODEL="gpt-4o-mini"

# Mocks only (no OpenAI calls):
# DEMO_MODE=true
```

> **Env:** See `.env.example` for Resend (welcome email), admin usernames, and optional overrides. Check `/api/ai-status` when the app is running.

3. Apply database migrations (once per database):
```bash
npm run db:deploy
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3001](http://localhost:3001) in your browser.

### How to Get Real AI (Not Mocks)

| Where you run the app | How to get real AI |
|------------------------|---------------------|
| **Locally** | Set `OPENAI_API_KEY` in `.env.local`. Optional: `AI_MODEL` (default `gpt-4o-mini`), `OPENAI_BASE_URL`. |
| **Vercel / hosted** | Add `OPENAI_API_KEY` (or `OPENAI_API`) in project env vars, then redeploy. |
| **GitHub Pages** | Static only — mocks; use Vercel or the local app for OpenAI-backed AI. |

**Behavior:** If `DEMO_MODE=true`, all AI routes use mocks. Otherwise the app calls OpenAI at `OPENAI_BASE_URL` (default `https://api.openai.com/v1`) with `AI_MODEL` / `OPENAI_MODEL`.

### Demo Mode vs AI Mode

**Demo Mode** (`DEMO_MODE=true`):
- ✅ Works without OpenAI — good for static sites and demos
- ✅ Uses realistic mock responses
- 📝 Use for: GitHub Pages, quick demos, Vercel without an API key

**AI Mode** (default when `DEMO_MODE` is not `true`):
- ✅ Real patient chat, assessments, and term explanations via OpenAI
- 📝 Requires `OPENAI_API_KEY` (and a valid model id in `AI_MODEL`)

### Testing Your AI Connection

**Option 1: Test endpoint**
1. Run the app (`npm run dev`) and open [http://localhost:3001/api/test-key](http://localhost:3001/api/test-key)
2. You should see `"success": true` and `"provider": "OpenAI"` when the API key works

**Option 2: Test in a scenario**
1. Go to [http://localhost:3001/scenarios](http://localhost:3001/scenarios), open a scenario, and ask the patient a question
2. If you get an error, check `OPENAI_API_KEY` / `AI_MODEL` or set `DEMO_MODE=true` for mocks

**Common issues:**
- **Local:** Set `OPENAI_API_KEY` in `.env.local`, or use `DEMO_MODE=true`
- **Vercel/hosted:** Env vars must be set for the right environment (Production/Preview), then redeploy
- **GitHub Pages:** Demo/mock only; run locally or on Vercel for OpenAI

## Project Structure

```
project-root/
  app/
    layout.tsx              # Root layout, Medcess metadata
    page.tsx                # Landing page
    about/
      page.tsx              # About page with disclaimer
    scenarios/
      page.tsx              # Scenario list
      [id]/
        page.tsx            # Scenario player
    api/
      patient-chat/
        route.ts            # POST: AI responds as patient
      assess/
        route.ts            # POST: AI assessment
  components/
    MedcessLogo.tsx
    Navbar.tsx
    Footer.tsx
    ScenarioCard.tsx
    ScenarioList.tsx
    ScenarioPlayer.tsx
    ...
  lib/
    auth.ts                 # Auth.js config (middleware + API routes)
    branding.ts             # App name and marketing copy
    llm.ts                  # OpenAI client helpers
  pages/
    _error.tsx              # Minimal Pages Router error page (dev chunk resolution)
  data/
    scenarios.ts            # Scenario data and types
```

## Adding New Scenarios

Edit `data/scenarios.ts` and add new scenario objects to the `scenarios` array. Each scenario includes:

- Patient persona and background
- AI instructions for patient behavior
- Physical exam findings
- Available diagnostic tests
- Diagnosis options
- Teaching points

## Building for Production

```bash
# Generate Prisma client and build Next.js (does not run DB migrations)
npm run build

# Apply migrations separately when deploying a new schema
npm run db:deploy

npm start
```

## Deployment

### Deploy with Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Brinmeet123/medcess&env=DEMO_MODE%2COPENAI_API_KEY%2CAI_MODEL%2CDATABASE_URL%2CAUTH_SECRET&envDescription=DEMO_MODE%3Dtrue%20for%20mocks%3B%20otherwise%20set%20OPENAI_API_KEY%20and%20database%2Fauth%20vars%20from%20.env.example&envLink=https://github.com/Brinmeet123/medcess%23environment-variables)

**One-Click Deploy:**
1. Click the "Deploy with Vercel" button above
2. Connect your GitHub repository
3. Configure environment variables (see below)
4. Deploy!

**Manual Vercel Setup:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts
4. Set environment variables in Vercel dashboard

**Required Environment Variables for Vercel:**

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes (hosted) | — | PostgreSQL connection string |
| `AUTH_SECRET` | Yes (hosted) | — | Auth.js session signing secret |
| `OPENAI_API_KEY` | For real AI | — | OpenAI API key (alias: `OPENAI_API`) |
| `AI_MODEL` | No | `gpt-4o-mini` | Chat model id |
| `DEMO_MODE` | No | unset | `true` = mocks only, no OpenAI calls |

**Recommended Vercel Settings:**
- **Framework Preset:** Next.js (auto-detected)
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)
- **Node.js Version:** 20.x (specified in package.json)

**For real AI on Vercel:** set `OPENAI_API_KEY` for Production (and Preview if needed). Run `npm run db:deploy` when you ship schema changes (not during `next build`).

```env
OPENAI_API_KEY=sk-...
AI_MODEL=gpt-4o-mini
DATABASE_URL=postgresql://...
AUTH_SECRET=...
```

- **Redeploy** after changing env vars (Deployments → ⋮ → Redeploy).
- If `DEMO_MODE=true`, the app uses mocks and does not call OpenAI.

**Debug on your live site:** open `https://your-app.vercel.app/api/ai-status` — shows OpenAI config (no secrets).

**For demo-only:**
```env
DEMO_MODE=true
```

> **Note:** Copy `.env.example` to `.env.local` for local secrets. `npm install` runs `prisma generate` (no database required); run `npm run db:deploy` when the database is ready.

### Other Deployment Options

This project includes GitHub Actions workflows for automated deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

1. **Docker**: 
   - Use the included Dockerfile and GitHub Actions workflow
   - Set `DEMO_MODE=true` environment variable in Docker for public deployment

2. **Static Export**: 
   - Deploy as a static site (note: API routes won't work)
   - Good for GitHub Pages, but limited functionality
   - Set `NEXT_OUTPUT=export` environment variable

**⚠️ Important:** Set `DEMO_MODE=true` for mock-only deployment when you are not configuring OpenAI.

### GitHub Actions Workflows:

- `ci.yml`: Continuous Integration (lint, type check, build)
- `deploy-vercel.yml`: Deploy to Vercel production
- `deploy-preview.yml`: Preview deployments for PRs
- `docker-build.yml`: Build and push Docker images
- `test.yml`: Run tests and validations

See `.github/workflows/README.md` for more details.

## Important Disclaimer

**Medcess is for educational purposes only. All patients and scenarios are fictional. The site does not provide medical advice, diagnosis, or treatment. If you have health concerns, please see a licensed healthcare professional.**

## License

This project is for educational use only.
