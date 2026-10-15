---
name: handoff
description: Write docs/handoff.md so the next session can continue without you re-explaining anything. Use at the end of any working session, before starting a new chat, before closing the laptop, or when the conversation is getting long.
argument-hint: "[optional note about where you stopped]"
---

Write `docs/handoff.md`. Overwrite whatever is there — this file is always
about the present, never a log.

Establish the real state first. Do not ask me what I did.

1. Run `git status`, `git log --oneline -10` and `git diff --stat`.
2. Read `docs/roadmap.md` if it exists, to see which stage we are in.
3. Note anything typed after `/handoff`, and anything the founder said this
   session that is not yet written down anywhere.

Then write exactly these sections:

## Where we are
Two sentences. The current stage from the roadmap, and whether it is finished.

## What changed this session
Bullets, newest first. What was built, not what was discussed.

## Working state
Does it run? Name the exact command and what you should see. If it is broken,
say so first and say how.

## Uncommitted work
From `git status`. If the tree is dirty, list the files and say whether the
changes are finished or mid-thought. If clean, say "clean".

## Next action
**One** thing. The specific next step, precise enough to start on without
re-reading anything else. Not a list of options.

## Open questions and traps
Decisions that were deferred, things that surprised us, anything a fresh
session would get wrong by making a reasonable assumption. This section earns
its keep more than any other — write down the mistake that was already made
once.

Be concrete. "Refactored the data layer" is useless. "Moved the RSVP writes
from data.js into store.js; the read path still points at the old file" is a
handoff.

Keep the whole file under 60 lines. If it is longer, the roadmap is doing too
little work.
