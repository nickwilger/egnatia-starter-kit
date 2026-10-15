---
name: weekly-plan
description: Turn the current state of the project into a realistic plan for the coming week. Use on Monday mornings, or when the founder does not know what to work on next.
argument-hint: "[hours available this week]"
---

Establish the real state first. Do not ask the founder what they did.

1. Run `git log --since="7 days ago" --oneline` and read `docs/requirements.md`.
2. Compare what shipped against the v1 scope list. State the gap in one line.
3. If a plan from last week exists at `docs/plan-*.md`, open with one honest paragraph on what slipped and why.
4. Produce a plan for the coming week, assuming the number of hours typed after `/weekly-plan` (10 if none was given):
   - **One outcome** - the single thing that must be true by Friday
   - **Three tasks maximum** - each with an hour estimate, summing to less than the hours available
   - **What you are not doing** - pulled from the v1 list, explicitly deferred
   - **The risk** - the one thing most likely to eat the week

Write to `docs/plan-<YYYY-MM-DD>.md`.

Be conservative. A plan that assumes everything goes right is not a plan. Leave at least 30 percent of the available hours unallocated.
