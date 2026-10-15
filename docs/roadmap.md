# Roadmap — <PROJECT NAME>

<!--
  Every feature, broken into stages, in the order you will build them.
  ONE stage in progress at a time. The agent reads this to know what is next
  and — more importantly — what is not next.
  Update the status boxes as you go. This file is the source of truth for
  "where are we", and /handoff reads it.
-->

Status: `[ ]` not started · `[~]` in progress · `[x]` done · `[-]` cut

## Stage 1 — It renders

- [x] Vite + React project runs, `npm run dev`
- [x] Three screens exist and switch on one state value
- [x] Realistic sample data in `src/data.js`

**Done means:** you can click the whole path start to finish without an error.

## Stage 2 — It holds data

- [ ] RSVPs persist across a page reload
- [ ] Duplicate names update instead of duplicating
- [ ] Empty state when nobody has RSVP'd

**Done means:** you can close the tab, reopen it, and your data is still there.

## Stage 3 — It survives being real

- [ ] Move storage from JSON to SQLite (`/sqlite-migrate`)
- [ ] Index the columns actually used for filtering
- [ ] Concurrent writes do not lose records

**Done means:** 20,000 records and the page still loads in under a second.

## Stage 4 — Someone else can use it

- [ ] User input escaped on the way out
- [ ] Errors shown to the user rather than swallowed
- [ ] Dates handled in local time, not UTC

**Done means:** a stranger uses it for ten minutes without you sitting next to them.

## Not doing

Write it down when you decide, or you will re-litigate it every week.

- Accounts and login — not until someone asks twice
- Mobile layout below 640px — the demo is on a laptop
- Email notifications — a whole product on its own
