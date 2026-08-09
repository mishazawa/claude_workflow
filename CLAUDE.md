# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This is not (yet) an application codebase — it's a GitHub Actions pipeline that uses Claude Code itself
to plan and implement work automatically, deploying the result to Firebase Hosting. There is no
`package.json`, `src/`, or build tooling checked in yet; `dist/index.html` is the untouched Firebase
Hosting placeholder page.

## The automation pipeline

The pipeline is driven entirely by `.github/workflows/*.yml` and templates in `.github/prompts/`:

1. **`planner.yml`** — triggers when an issue is labeled `needs-plan`. Creates an `integration/<issue#>`
   branch, runs Claude (via `.github/prompts/plan.md`) to break the issue into 3-5 independent subtasks
   as JSON, opens one GitHub issue per subtask labeled `subtask`, then dispatches `worker.yml` for each
   in parallel via a matrix.
2. **`worker.yml`** — for one subtask issue: branches off the integration branch as `feat/subtask-<n>`,
   runs Claude (via `.github/prompts/implement.md`) to implement it, commits, pushes, runs
   `run-tests.yml`, and opens a PR against the integration branch if tests pass (or comments on the
   issue on failure).
3. **`merge.yml`** — triggers on push to `integration/**`. Once all subtask PRs are merged, runs tests
   on the integration branch and opens the "uber PR" against `main`.
4. **`run-tests.yml`** — reusable workflow: `npm ci && npm test`, reports pass/fail.
5. **`deploy.yml`** — on push to `main`: `npm ci && npm run build`, then deploys `dist/` to Firebase
   Hosting (project id in `deploy.yml` is a placeholder — update `projectId` to match `.firebaserc`,
   which points at `harrrnesss-1414`).

Planner and worker runs use `--model haiku --effort low --permission-mode auto`; the planner also
passes `--disallowedTools Bash,Write,Edit` since it must only emit JSON, never touch files.

## Editing the pipeline

- Prompt templates use simple `{{ISSUE_TITLE}}` / `{{ISSUE_BODY}}` substitution done via inline Python
  in the workflow (not a templating library) — keep placeholder names in sync between the workflow's
  `replace()` calls and the `.md` files in `.github/prompts/`.
- `plan.md` / `planner.yml` require the model's output to be valid JSON matching
  `{"subtasks":[{"title":...,"body":...}]}` — `jq` parses this directly in the workflow, so changes to
  the prompt must preserve that exact shape.
- Since `worker.yml` and `merge.yml` both call `run-tests.yml`, once real app code and an `npm test`
  script exist, the pipeline will start exercising them automatically — there's no separate CI setup
  needed beyond adding the script to `package.json`.
