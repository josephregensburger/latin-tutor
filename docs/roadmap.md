# Project development checklist

Use this page as the project tracker. Check an item only after its acceptance condition is true in the running app or repository. Add dates or notes beside items when a decision needs context.

## Current state

- [x] Move the original static lesson into `public/prototype/` so it remains available during the migration.
- [x] Add the Next.js App Router shell, `/student`, `/admin`, and `/api/health` routes.
- [x] Add the initial PostgreSQL/Prisma schema and database helper scaffold.
- [x] Add the Docker Compose services and Python Latin NLP API scaffold.
- [x] Document the architecture, grammar conventions, and human-reviewed truthing workflow.
- [x] Install dependencies and verify the scaffold starts successfully.

## Milestone 1 — Run the foundation locally

- [x] Install the required local tools: Node.js 22+, npm, Docker Desktop, and Git.
- [x] Copy `.env.example` to `.env` for commands run outside Docker.
- [x] Run `docker compose up --build` successfully.
- [x] Open the student prototype at `http://localhost:3000/student`.
- [x] Open the authoring overview at `http://localhost:3000/admin`.
- [x] Confirm `http://localhost:3000/api/health` returns `status: ok`.
- [X] Confirm PostgreSQL is healthy and the NLP service reports whether its model is installed.
- [x] Record any setup fixes in this checklist or README.

**Done when:** the web app, database, and NLP service start together on the development Mac, and the student screen and health endpoint load.

## Milestone 2 — Evaluate Latin NLP against real course material

- [ ] Select 20–30 representative sentences from the current Latin curriculum.
- [ ] Confirm the sources and reuse permissions for each sentence.
- [ ] Install LatinCy in the NLP service and record the model/version used.
- [ ] Run the sample sentences through LatinCy; save the token, morphology, and dependency output.
- [ ] Run the same sentences through Morpheus where available; preserve multiple candidate parses.
- [ ] Compare model outputs with a trusted answer for each sentence.
- [ ] Record errors and ambiguities by category: morphology, syntax, vocabulary, and translation.
- [ ] Decide which sentence types are safe to include in the first student set.

**Done when:** you know where the tools help, where they fail on your course material, and what a human reviewer must confirm.

## Milestone 3 — Establish the sentence database

- [ ] Generate the Prisma client from `prisma/schema.prisma`.
- [ ] Create and apply the first PostgreSQL migration.
- [ ] Add a small seed set of reviewed sentences and annotations.
- [ ] Represent tokens with positions, lemmas, parts of speech, morphology, and syntactic relations.
- [ ] Store literal and natural translations, alternate accepted translations, source, difficulty, and grammar topics.
- [ ] Store NLP/LLM analysis runs separately from approved annotations, including provider and model version.
- [ ] Enforce a publication status so only approved sentences are used in student practice.
- [ ] Confirm re-analysis creates a new proposal without silently replacing approved data.

**Done when:** a sentence and its approved token analysis can be saved, retrieved, and audited in PostgreSQL.

## Milestone 4 — Build sentence authoring and truthing

- [ ] Add an admin form for Latin text, source, translation, difficulty, and grammar topics.
- [ ] Call the Python service to propose tokenization, morphology, and dependencies.
- [ ] Display candidate analyses and make uncertainty or missing model output visible.
- [ ] Allow the reviewer to edit token forms, lemmas, morphology, roles, and word relationships.
- [ ] Allow the reviewer to preserve more than one valid analysis where Latin is ambiguous.
- [ ] Add literal and natural translation fields and record reviewer corrections.
- [ ] Add draft, in-review, approved, and archived transitions.
- [ ] Require explicit human approval before a sentence is available to students.
- [ ] Keep a review history when annotations or translations change.

**Done when:** an administrator can turn an unreviewed sentence into a human-approved exercise, and the complete proposal/review history is retained.

## Milestone 5 — Build the guided student exercise

- [ ] Replace the `/student` prototype iframe with native React components while preserving its visual design.
- [ ] Select only approved sentences, randomly or by chosen grammar topic.
- [ ] Implement **SCAN**: identify verbs, conjunctions, and clauses.
- [ ] Implement **LABEL**: identify word class and relevant morphology.
- [ ] Implement **LINK**: connect verbs, subjects, objects, adjectives, and phrases.
- [ ] Implement **TRANSLATE**: collect a natural English translation after analysis.
- [ ] Implement **CHECK**: review tense, agreement, cases, negation, conjunctions, and completeness.
- [ ] Show one step at a time and provide a way to revisit earlier work.
- [ ] Preserve a student's in-progress translation between refreshes.
- [ ] Make the workflow usable on the laptop and iPad-sized screens.

**Done when:** a student can complete a full exercise from an approved sentence without seeing the answer key before submitting their work.

## Milestone 6 — Deterministic grading and useful feedback

- [ ] Check objective morphology and role answers against approved annotations.
- [ ] Accept explicitly stored alternate answers and terminology variants.
- [ ] Avoid treating exact string comparison as proof that a free translation is wrong.
- [ ] Explain an error by pointing to the relevant Latin form or grammatical relationship.
- [ ] Add graduated hints that guide the student before revealing the answer.
- [ ] Save stage answers, final translation, completion time, and feedback events.
- [ ] Show a simple progress summary by grammar skill.
- [ ] Keep normal answer grading independent of NLP and LLM calls.

**Done when:** the app gives reliable feedback for structured answers, records attempts, and handles free translation with appropriate flexibility.

## Milestone 7 — First release acceptance checklist

- [ ] The app starts through Docker Compose.
- [ ] An administrator can enter a Latin sentence.
- [ ] The NLP service returns a proposed analysis for supported sentences.
- [ ] An administrator can correct and approve the analysis.
- [ ] Approved sentence data is stored in PostgreSQL.
- [ ] A student can receive an approved practice sentence.
- [ ] The student can complete all five translation stages.
- [ ] Incorrect structured answers receive useful feedback.
- [ ] Completed exercises are recorded and can be reviewed.
- [ ] Setup, architecture, grammar conventions, and truthing rules are documented.

**Done when:** all acceptance items above work in a fresh local setup using a small, human-reviewed sentence set.

## Later — Add only when the core workflow is working

- [ ] Add server-side LLM explanations and hints with API keys kept out of the browser.
- [ ] Add LLM-assisted sentence authoring, with generated content always requiring human approval.
- [ ] Generate controlled practice sentences from an explicit grammar and vocabulary specification.
- [ ] Add accounts if more than one student needs separate progress.
- [ ] Add adaptive sentence selection based on skill-level progress.
- [ ] Evaluate offline model options if local inference becomes a requirement.

## Session notes

Append a short dated note after each work session: what changed, what is now complete, what is blocked, and the next concrete task.

| Date | Completed | Decisions or blockers | Next task |
| --- | --- | --- | --- |
| 2026-11-21 | Milestone 1 complete. Verified `/student`, `/admin`, `/api/health`, and `/api/dbhealth`. The NLP health endpoint reports `la_core_web_lg` ready. | PostgreSQL responds to `SELECT 1` from the web app and is reachable from the terminal via `pgcli`. | Start Milestone 2 by saving the initial LatinCy analyses with their reviewed answers, then select 20–30 representative curriculum sentences. |
