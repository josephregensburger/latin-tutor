# Architecture

## Product shape

Lingua is a local-first Latin tutor with two workflows. Student practice uses reviewed, stored sentence analyses and deterministic answer checks. Sentence authoring can call linguistic tools to propose analyses; a human reviews and approves every sentence before publication.

## Services

- **Next.js / TypeScript** (`app/`, `components/`, `lib/`) serves the student and authoring interfaces and API routes.
- **PostgreSQL / Prisma** (`prisma/`, `lib/database/`) stores sentences, token annotations, analysis runs, and attempts.
- **Latin NLP service** (`services/latin-nlp/`) provides a Python API for local spaCy/LatinCy analysis. Candidate output is never treated as approved ground truth.
- **LLM assistance** is an optional server-side authoring and tutoring capability. It is not part of routine answer grading.

## Data flow

Sentence authoring → NLP candidates → human correction and approval → approved sentence store → guided SCAN / LABEL / LINK / TRANSLATE / CHECK practice → recorded attempt.

## Current state

The existing single-lesson prototype remains at `/prototype/index.html` and is presented from `/student`. The app routes, persistence models, and NLP service are foundations; authentication, sentence authoring, migrations, and native React student components remain roadmap items.

## Local development

Copy `.env.example` to `.env`, then use Docker Compose to start PostgreSQL, the web app, and the NLP API. Install the LatinCy model in the NLP image before using `/analyze`. Create the database schema with `npm run db:migrate` after dependencies are installed.
