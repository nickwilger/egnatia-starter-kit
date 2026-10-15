# Handoff

<!--
  Overwritten at the end of every session by /handoff. Always the present, never
  a log. If you read only one file when starting a session, read this one.
-->

## Where we are

Stage 2 of the roadmap, partway. RSVPs persist but duplicates are not handled.

## What changed this session

- Added `saveRsvp()` in `src/store.js`, writing to localStorage
- Detail screen now reads the live count instead of the seeded one
- Renamed `attendees` to `rsvps` throughout for consistency with the design doc

## Working state

Runs. `npm run dev`, then <http://localhost:5173>. Click path works end to end.

## Uncommitted work

Clean. Last commit `a3f10c2 stage 2: persist rsvps to localStorage`.

## Next action

In `src/store.js`, make `saveRsvp()` update the existing record when the name
already exists for that event, instead of pushing a second one. Roadmap stage 2,
second box.

## Open questions and traps

- Name matching is case-sensitive right now, so "arben" and "Arben" are two
  people. Decide whether that is a bug before fixing it — it may be the correct
  behaviour for a demo.
- **Already got this wrong once:** the count on the List screen reads from the
  seeded array, not from storage. If you change the shape of a stored RSVP,
  change `getCount()` in `src/data.js` at the same time or the two silently
  disagree.
