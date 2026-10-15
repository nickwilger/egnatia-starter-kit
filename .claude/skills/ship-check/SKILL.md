---
name: ship-check
description: Pre-demo checklist. Runs the build, reviews the changes and reports whether this is safe to show to an audience. Use before demoing, presenting or pushing, or when someone says "is this ready" or "can I show this".
argument-hint: "[the commit before this work, if you know it]"
disable-model-invocation: true
---

Run these three checks in order and report a single verdict at the end.

1. **It builds.** Use the `qa-runner` subagent to run `npm run build`. Report only failures.
2. **It is safe.** Use the `code-reviewer` subagent. If a commit was typed after `/ship-check`, pass it on so the reviewer covers everything since then; otherwise the reviewer covers uncommitted work only, and you must say so. Surface blockers only.
3. **It demos.** Read `docs/prototype-spec.md` and walk the click path against the actual code. Name any step the code cannot currently perform. Then tell the founder to click the path in the browser: reading code is not the same as using it.

If subagents are not available, follow `.claude/agents/qa-runner.md` and `.claude/agents/code-reviewer.md` yourself.

Then give one verdict:

- **SHIP** - the click path works end to end and there are no blockers.
- **SHIP WITH A CAVEAT** - it demos, but name the one thing to avoid clicking on stage.
- **DO NOT DEMO** - name the single thing to fix first, and estimate the fix in minutes.

SHIP means safe to show in a demo. It is not approval for a production release.

Be honest. A founder who demos a crash because you were polite loses more than one who cuts a feature.
