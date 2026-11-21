# Lingua — Latin translation tutor

Lingua is a local-first Latin practice app. Its teaching workflow is **SCAN → LABEL → LINK → TRANSLATE → CHECK**. Student exercises are intended to use reviewed sentence annotations; Latin NLP and optional LLM assistance support the administrator's authoring and truthing work.

## Project structure

```text
latin-tutor/
├── app/                    # Next.js App Router: student, admin, and API routes
├── components/             # Shared React UI components
├── docs/                   # Architecture, grammar, truthing, and roadmap
├── lib/                    # Database access, exercise rules, and grading
├── prisma/                 # PostgreSQL schema and migrations
├── public/prototype/       # Preserved original static lesson prototype
├── services/latin-nlp/     # Python analysis API (spaCy / LatinCy)
├── docker-compose.yml
└── Dockerfile
```

The student route currently embeds the lesson prototype at `/prototype/index.html`; native React student and authoring flows are the next implementation milestone.

## Start with Docker

1. Copy `.env.example` to `.env` if you plan to run commands outside Docker.
2. Run `docker compose up --build`.
3. Open <http://localhost:3000/student>. The prototype is also at <http://localhost:3000/prototype/index.html> and the app health endpoint is <http://localhost:3000/api/health>.

The first run installs Node and Python dependencies. LatinCy model weights are not bundled in this repository; install the model in the NLP image before calling `/analyze`. Until then `/health` reports `model_status: not_installed`, and `/analyze` returns 503 rather than mock analysis.

## Database

The Compose stack starts PostgreSQL. With dependencies installed, generate the Prisma client and apply the initial development migration:

```sh
npm run db:generate
npm run db:migrate
```

The schema separates approved sentence/token data from analysis-run history and student attempts. NLP proposals must be reviewed before publication.

## Documentation

- [Architecture](docs/architecture.md)
- [Latin grammar conventions](docs/latin-grammar.md)
- [Sentence truthing workflow](docs/truthing-workflow.md)
- [Roadmap](docs/roadmap.md)
