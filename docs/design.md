# Design — <PROJECT NAME>

<!--
  What the thing IS and how it is built. Changes rarely.
  Not loaded automatically — the agent reads it when it needs it, which is why
  it can be long without costing you tokens on every message.
  When you and the agent disagree about how something works, fix this file.
-->

## The one-liner

<Product> helps <specific user> <do specific job> without <the annoying part of
what they do today>.

## Data shapes

The two to four objects the app moves around. Written as types, because the
agent will follow them exactly.

```ts
type Event  = { id: number; title: string; date: string; location: string }
type Rsvp   = { id: number; eventId: number; name: string; status: 'yes' | 'no' }
```

## Screens

| Screen | Shows | Clickable |
|---|---|---|
| List | All upcoming events | Any row → Detail |
| Detail | One event, its attendees | RSVP → Confirmation |
| Confirmation | The payoff | Back to List |

## Click path

The sequence a demo watcher follows. If a change breaks this, it is a blocker.

1. Land on List
2. Click the first event
3. Enter a name, click RSVP
4. See the count go up on Confirmation

## Decisions and their reasons

Record the *why*, not just the what. This is the section that stops an agent
undoing a deliberate choice because it looked wrong out of context.

- **No router.** One `screen` state value. A router is three dependencies and a
  build config for a three-screen demo.
- **No auth in v1.** Nothing in the click path needs a logged-in user.
- **JSON storage until the hackathon, then SQLite.** JSON is fine at demo size
  and stops being fine somewhere in the low thousands of records.

## Known limits

What it deliberately does not do. Being explicit here stops both you and the
agent from treating a decision as a bug.
