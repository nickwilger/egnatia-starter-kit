---
name: prototype-spec
description: Turn a requirements document into a screen-by-screen clickable prototype spec. Use after requirements exist and before building any UI, or when someone asks for a prototype, mockup or demo of their idea.
---

Read `docs/requirements.md`. If it does not exist, stop and say so.

Write `docs/prototype-spec.md` containing exactly:

1. **Screens** - 3 to 5 only. For each: name, purpose in one line, what is on it, what is clickable.
2. **Click path** - the single sequence a demo watcher follows from the first screen to the "aha" moment. Number each click.
3. **Sample data** - realistic fake data as a JSON array, 5 to 8 records. Real-sounding names, plausible numbers. No "Lorem ipsum", no "Test User 1".
4. **State** - the handful of values that change as the user clicks, and where each lives.
5. **Out of scope** - no auth, no backend, no persistence, no routing library, no responsive work below 640px, unless the requirements explicitly demand one.

Constraints:

- Screens switch on a single `screen` state value, not a router.
- Everything runs in the browser with no server.
- The whole prototype must be demoable in 90 seconds.

Stop after writing the file. Do not build anything yet.
