# AGENTS.md — Codex instructions for vacant-house

This is **one** React + TypeScript + Vite application for Toyama community activities: **participate** (D00–D02) and **organize** (U01–U04). The repository name is historical. **Do not implement the old vacant-house matching concept.**

## First, read the appropriate sources
1. [docs/CODEX_START_HERE.md](docs/CODEX_START_HERE.md): the single start page for all contributors and Codex.
2. [docs/README.md](docs/README.md) and [docs/v3/README.md](docs/v3/README.md): curated current-document indexes. [docs/DOCUMENT_POLICY.md](docs/DOCUMENT_POLICY.md) identifies historical files; do **not** recursively read every file under docs/v3.
3. **The assigned GitHub Issue and its latest comments**, including scope, acceptance criteria, and dependencies.
4. Adopted design decisions: [ADR-029](docs/v3/ADR_029_JSON_V1_IDENTIFIERS_AND_DATE_ADOPTED.md), [ADR-030](docs/v3/ADR_030_TOYAMA_PARTICIPATE_AND_ORGANIZE_MVP_SCOPE_ADOPTED.md), [ADR-031](docs/v3/ADR_031_PARENT_TASK_PROGRESS_ONLY_NO_CHILD_CHECKS_ADOPTED.md), [ADR-032](docs/v3/ADR_032_TECHNICAL_V1_DATA_RECHECK_EQUIPMENT_AND_API_ADOPTED.md).
5. [Shared development rules](docs/v3/TEAM_SHARED_DEVELOPMENT_AND_UI_RULES_20261121.md) and [shared UI implementation](docs/v3/SHARED_UI_IMPLEMENTATION_AND_OWNERSHIP_20261121.md). Inspect the actual current `src/` files before modifying them.

**Priority when sources disagree:** newer expressly adopted ADRs and explicitly agreed current Issue requirements > current code contracts > newer current docs > historical design notes. Do not silently reinterpret an ADR; stop and flag the conflict in the Issue. File names and old status notes are not proof that a feature is implemented.

## Who owns what?
- **A @Gr3311Moonn**: #34 D00/D01 participation entry/list; then #35 D02.
- **B @unoyuyu0913-design**: #36 U02 event input; then #37 P01–P12 derivation and U03 read-only cards.
- **C @ynykrrc1219-stack**: #38 U03 parent-task progress; then #39 U04 edit/recheck.
- **D @milkyara**: #40 domain types/Repository contract; then #41 Dexie/U01 and #42 JSON backup.
- **E @kot5432**: #43 public-source review, #44 validation and #45 integration/review.

Collaborate on cross-feature boundaries before changing shared types, global styles, App.tsx, or other owners' files. Use existing components in `src/ui/components`. Do not create a second Vite app, another root lockfile, competing domain types, child-task checkboxes, a cloud database, or fictitious approved activities.

## For each request
1. Verify the current branch is **not main**, the working tree status, and which Issue is in scope. If a needed Issue/comment cannot be accessed, say so: do not invent requirements.
2. **Before editing**, summarize: goal and acceptance checks, exact files to change, dependencies, and ambiguous requirements. Request a decision for any material scope/ADR conflict.
3. Implement the **smallest reviewable change** in the assigned scope. Keep mocks unmistakably marked; never claim persisted data or verified live activity when not real.
4. Check `npm run typecheck`, `npm run build`, and relevant manual checks where executable. Report actual commands, results, and `not_run` items truthfully. The baseline `npm run doctor`/Node v26.13.1 and `npm ci` are documented in [docs/ALL_MEMBERS_PC_SETUP.md](docs/ALL_MEMBERS_PC_SETUP.md).
5. Summarize changed files, behavior, tests, open risks, and a PR description referencing the Issue. Do not commit secrets, real users' private data, or create/deploy cloud resources.
6. **Never push directly to main or merge your own PR.** Work on the Issue's feature branch; request a human review (A–D PRs: E; E PRs: A–D). PR submitted does not mean done.

**Allowed work in this phase:** local app implementation and local testing from 2026-11-23. **Not authorized without a new decision:** CI setup/execution, Vercel deploy/public previews, external surveys/outreach, publishing unapproved real activities, contest submission.

**Data safety:** Organizer events live locally via IndexedDB/Dexie; participation catalog is separate and read-only. Preserve parent P01–P12 progress only, strict JSON v1 contracts, revision conflict handling, and unknown/not-yet-verified states. No child `checkedItemIds`.
