# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

This is a React portfolio application built with Vite and TypeScript, deployed to Firebase Hosting via
an automated GitHub Actions pipeline. The pipeline uses Claude Code to plan and implement features
automatically, and the app includes a gallery with lightbox modal, shader background effects, hero
section, about section, and contact page.

## Project structure

```
├── src/
│   ├── main.tsx              # React entry point
│   ├── App.tsx              # Main app component with navigation
│   ├── App.css              # App styles
│   ├── index.css            # Global styles
│   ├── components/
│   │   ├── Hero.tsx         # Hero section component
│   │   ├── Hero.css
│   │   ├── Gallery.tsx      # Gallery grid component
│   │   ├── Gallery.css
│   │   ├── Lightbox.tsx     # Lightbox modal for gallery
│   │   ├── Lightbox.css
│   │   └── ShaderBackground.tsx  # Three.js shader effects
│   ├── assets/              # Static assets (images, SVGs)
│   └── *.test.ts(x)        # Component tests
├── public/                  # Static files (favicon, etc.)
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration with React plugin
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies: React, Three.js, Vite, Vitest
├── firebase.json           # Firebase Hosting config (SPA rewrites)
├── .firebaserc             # Firebase project config (harrrnesss-1414)
└── .github/
    ├── workflows/          # CI/CD pipeline
    └── prompts/            # Claude prompt templates
```

## Technologies and dependencies

**Core:** React 19, TypeScript ~6.0.2, Vite 8.2
**Graphics:** Three.js 0.160 (for shader effects)
**Testing:** Vitest 3.0, jsdom 25, @testing-library/react 16
**Linting:** Oxlint 1.75
**Build:** Vite with @vitejs/plugin-react

## Build and development

- `npm run dev` — start Vite dev server (port 5173)
- `npm run build` — compile TypeScript with `tsc -b`, then Vite builds to `dist/`
- `npm run lint` — run Oxlint
- `npm run preview` — preview production build locally
- `npm test` — run Vitest (jsdom environment, globals enabled)

## The automation pipeline

The pipeline is driven by `.github/workflows/*.yml` and templates in `.github/prompts/`:

1. **`planner.yml`** — triggered when an issue is labeled `needs-plan`. Creates an `integration/<issue#>`
   branch, runs Claude (via `.github/prompts/plan.md`) to break the issue into 3-5 independent subtasks
   as JSON, opens one GitHub issue per subtask labeled `subtask`, then dispatches `worker.yml` for each
   in parallel via a matrix.
2. **`worker.yml`** — for one subtask issue: branches off the integration branch as `feat/subtask-<n>`,
   runs Claude (via `.github/prompts/implement.md`) to implement it, commits, pushes, runs
   `run-tests.yml`, and opens a PR against the integration branch if tests pass (or comments on the
   issue on failure).
3. **`pr-check.yml`** — triggered on PR to `integration/**`. Runs `run-tests.yml` and auto-merges with
   `--squash` if tests pass.
4. **`merge.yml`** — triggered on push to `integration/**`. Once all subtask PRs are merged, runs tests
   on the integration branch and opens the "uber PR" against `main`.
5. **`run-tests.yml`** — reusable workflow: `npm ci && npm test`, outputs pass/fail status.
6. **`deploy.yml`** — triggered on push to `main`. Runs tests, then `npm ci && npm run build`, then
   deploys `dist/` to Firebase Hosting (project `harrrnesss-1414`, configured in `.firebaserc`).

Planner and worker runs use `--model haiku --effort low --permission-mode auto`; the planner also
passes `--disallowedTools Bash,Write,Edit` since it must only emit JSON, never touch files.

## Firebase deployment

- **Project ID:** `harrrnesss-1414` (in `.firebaserc`)
- **Hosting config:** Firebase rewrites all non-file routes to `/index.html` for SPA routing (see `firebase.json`)
- **Trigger:** Any push to `main` after passing tests
- **Secret:** `FIREBASE_SERVICE_ACCOUNT` service account key
- **Environment variable:** `FIREBASE_PROJECT_ID` (set to project ID)

## Editing the pipeline

- Prompt templates use simple `{{ISSUE_TITLE}}` / `{{ISSUE_BODY}}` substitution done via inline Python
  in the workflow (not a templating library) — keep placeholder names in sync between the workflow's
  `replace()` calls and the `.md` files in `.github/prompts/`.
- `plan.md` / `planner.yml` require the model's output to be valid JSON matching
  `{"subtasks":[{"title":...,"body":...}]}` — `jq` parses this directly in the workflow, so changes to
  the prompt must preserve that exact shape.
- The pipeline automatically exercises `npm test` on all PRs and before deploying, so any new test
  files added to `src/*.test.ts(x)` will be picked up automatically.
