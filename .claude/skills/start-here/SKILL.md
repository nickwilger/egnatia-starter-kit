---
name: start-here
description: Load the project state at the beginning of a session. Use as the first message of a new chat on an existing project, or when resuming work after a break.
disable-model-invocation: true
---

Read, in this order, skipping any that do not exist:

1. `docs/handoff.md` — where the last session stopped
2. `docs/roadmap.md` — which stage we are in
3. `docs/design.md` — only the sections relevant to the next action

Then run `git status` and `git log --oneline -5`.

Reply with exactly this, and nothing else:

- **Where we are** — one sentence
- **Next action** — the one thing from the handoff
- **Anything that does not match** — where the handoff disagrees with the
  actual repository state. A handoff that says "clean" against a dirty tree
  means something happened outside the last session. Say so before we start.

Then stop and wait. Do not begin work.
