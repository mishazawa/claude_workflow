# Task

{{ISSUE_TITLE}}

{{ISSUE_BODY}}

## Your job

Break this task into subtasks that can be implemented independently and in parallel.

Before splitting, decide whether splitting is even appropriate:

- If the task is small enough that one agent can complete it in a single pass
  (e.g. a component plus its own tests, a single config change, one bootstrap step),
  output it as ONE subtask. Do not split just to produce multiple subtasks.
- Only split into multiple subtasks when the pieces are genuinely independent —
  each one could be implemented by a different agent, starting from the same
  base commit, with no knowledge of what the other subtasks are doing, and still
  succeed.

Rules for splitting:

- Never separate an implementation from the tests that verify it — they are one
  subtask. A test-writing subtask cannot see code produced by another subtask,
  since all subtasks start from the same base and run in parallel.
- Never split a task where one piece requires a file, export, or interface that
  another piece would create. If subtask B needs something subtask A produces,
  they are not independent — merge them into one subtask.
- Prefer splitting along clearly separate features, files, or areas of the
  codebase with no shared dependencies (e.g. "unrelated Widget component" is
  a good candidate to split from "Counter component"; "Counter component" and
  "Counter component's tests" are not).
- If in doubt, don't split. A single well-scoped subtask is always safer than
  an incorrectly parallelized one.

## Output format

Do not wrap it in markdown code fences or backticks.
Do not include any text before or after the JSON object.
Output ONLY valid and raw JSON, no prose, in this exact shape:
{"subtasks":[{"title":"short title","body":"full description with acceptance criteria"}]}
