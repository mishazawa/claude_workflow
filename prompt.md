# Task

Bootstrap Vite with React, create Counter component, and add unit tests

Bootstrap a new Vite project with the react-ts template, implement a Counter component with full functionality, set up testing infrastructure, and write comprehensive unit tests.

Acceptance criteria:
- Run `npm create vite@latest . -- --template react-ts` to bootstrap the project with Vite and React TypeScript template
- Configure dev server: `npm run dev` starts the Vite dev server
- Configure build: `npm run build` builds to dist/
- Create `src/components/Counter.tsx` component with:
  - State tracking current count (initialized to 0)
  - Display of current count
  - Increment button (increases count by 1)
  - Decrement button (decreases count by 1)
  - Reset button (resets count to 0)
  - No minimum floor constraint on count (count can go negative)
- Install and configure Vitest and React Testing Library as dev dependencies
- Create `src/components/Counter.test.tsx` with unit tests covering:
  - Initial render displays count of 0
  - Clicking increment button increases count by 1
  - Clicking decrement button decreases count by 1
  - Clicking reset button returns count to 0
  - Verify count can go negative when decrementing (no minimum constraint)
- Tests must pass when run via npm test (configure vitest in package.json or vite.config.ts)
- No snapshot or smoke tests — only behavior assertions
- No E2E/integration testing tools (Playwright, Cypress, etc.)
- Component and test files must be co-located in src/components/

Part of #1

## Your job

Implement this subtask completely. Stay within the files and scope implied by
the task — do not modify unrelated areas of the codebase. Write working code,
not a plan or description.
