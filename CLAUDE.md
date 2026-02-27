# CLAUDE.md — Silk AI

## Governance Header

- This file is the primary instruction set for this repository
- MASTER_CLAUDE.md is a restricted reference library — only listed section IDs may be accessed
- AGENT.BENCHMARK.V2.md is mandatory and always applies
- Read no more than 200 lines from MASTER_CLAUDE.md total
- If scope is unclear, ask ONE clarifying question before proceeding

## Allowed MASTER_CLAUDE Sections

- A2. Debugging Workflow Framework
- B1. Testing Discipline and Test-First Strategy
- C1. Risk Containment Strategy
- G1. Security and Configuration Protection Protocol

## Benchmark Compliance

- AGENT.BENCHMARK.V2.md rules are mandatory
- Definition of Done must be satisfied before finishing
- Max 5 debug iterations, max 40 tool calls per task
- Prohibited behaviors override all other instructions
- Do not duplicate benchmark content — reference only

---

## Product

Silk AI is an AI-powered case strategy advisor for senior lawyers, barristers, QCs,
law firm partners, and in-house counsel.

This is NOT a simulation tool. This is NOT a debate platform.
Trial Chamber is where you practice. Silk AI is where you plan.

Core value proposition: Upload a case brief, get deep strategic intelligence before
you ever step into a courtroom or a simulation.

**What it does:**
1. Argument Style Advisor — recommends which senior barrister (Silk) argument style
   to adopt based on case type, jurisdiction, and facts
2. Judge Ruling Prediction — predicts how a judge might rule based on precedent,
   known judicial reasoning patterns, and case law analysis
3. Argument Strength Scoring — scores each argument, flags weaknesses, recommends pivots
4. Known Barrister Profiles — surfaces famous barristers known for this case type,
   their argument styles, and what lawyers can learn from them
5. Case Strategy Report — structured output: recommended approach, likely opposition
   arguments, risk areas, and actionable preparation steps

Target users: Senior barristers and QCs, law firm partners and senior associates,
in-house legal counsel. Premium pricing across all tiers.

**Positioning in the Nicrinze Tech legal suite:**
- Trial Chamber — enterprise simulation, law firms (where you practice)
- Lex Arena — education, law students, gamified debate (where you learn)
- Silk AI — intelligence and strategy, senior lawyers (where you plan)
- Silk AI is potentially the umbrella brand that sits over the entire legal suite

---

## Architecture (8 lines max)

- Backend: FastAPI + Python, PostgreSQL on Railway
- Frontend: React + Tailwind, deployed on Vercel
- Core engine: Claude Opus for all intelligence endpoints — non-negotiable premium tier
- Case law and precedent: RAG with pgvector for precedent-based judge ruling prediction
- Anonymization: two-pass spaCy NER + Claude verification before any AI call
- Auth: JWT + bcrypt
- Environment variables: DATABASE_URL, JWT_SECRET, ANTHROPIC_API_KEY, APP_ENV
- remotion-main-2 copy/ is a separate video generation project — do NOT modify it

---

## Build Phases

**Phase 1 (build now):**
- Case brief upload and anonymization
- Argument style analysis and barrister profile matching
- Judge ruling prediction based on precedent patterns
- Argument strength scoring with weakness flagging
- Case strategy report generation (PDF export)
- Premium dashboard: case history, strategy reports, argument scores

**Phase 2 (Stripe — do not build yet):**
- Stripe integration — account already exists, integrate only, do not create new
- Tiered pricing: Silk Basic / Silk Pro / Silk Enterprise
- White-label deployment for law firms

**Phase 3 (future — do not build yet):**
- Jurisdiction-specific intelligence (Australian, Nigerian, UK common law)
- Judge profiling database
- Opposing counsel analysis
- API access for enterprise firms

All Phase 2 and 3 ideas go to BACKLOG.md immediately. Do not implement them.

---

## Environment Variables

```
ANTHROPIC_API_KEY=
DATABASE_URL=
JWT_SECRET=
APP_ENV=production
LOG_LEVEL=INFO
```

---

## Commands

```bash
# Backend
cd silk-ai-backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd silk-ai-frontend
npm install
npm run dev

# Tests
pytest
npm test -- --watchAll=false
```

---

## Minimal Change Rule

Prefer the smallest patch that satisfies tests. Avoid broad refactors unless
strictly required. All new ideas go to BACKLOG.md immediately without implementing.

---

## Hard Constraints

- Never modify .env or secrets
- Never delete tests to force a pass
- Never install new dependencies without confirmation
- Claude Opus only for all intelligence endpoints — this is the premium tier
- All case data must pass through the anonymization layer before any AI call
- Do not touch remotion-main-2 copy/ — it is a separate project
