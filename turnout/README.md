# Turnout — the debugging exercise

A small event RSVP tracker. It runs, it mostly works, and it has a number of
real bugs in it — the kind that survive a code review and show up as complaints
three weeks later.

**Your job is not to rewrite it.** It is to find out what is wrong, fix it, and
write down what you found. That is the actual job of maintaining a project an
AI helped you build.

## Run it

Node 24 or newer. No `npm install` — there are no dependencies.

```bash
node server.js
```

Open <http://localhost:3000>.

## What people have complained about

These are the reports as they came in, in the words they came in. Some are
precise, some are vague, and at least one of them is not actually a bug. Treat
them the way you would treat messages from real users.

1. *"The list only ever shows 9 events but it says there are 15."*
2. *"I RSVP'd from my phone and my laptop at the same time and one of them
   disappeared."*
3. *"It said an event was happening today, but it was actually tomorrow. It
   only seems to do this late at night."*
4. *"I typed the wrong event ID into the API and it told me it worked. It did
   not work."*
5. *"Somebody put weird text in the name field and now the page looks broken
   for everyone."*
6. *"It was fine in the first week. Now it takes about four seconds to load the
   page and it's getting worse."*
7. *"There's an `attendeeCount` field in our data file. Nobody wrote that. Why
   is it in there?"*

## Reproducing number 6

The app was fine with 15 events. It is not fine with a month of real usage.

```bash
cp data/events.json data/events.backup.json
node seed-large.js
node server.js
```

Load the page and time it. Then look at the size of `data/events.json`.

This is the most important bug in the exercise, because the fix is not a
one-line change — it is a change of approach.

## How to work through this

Do not paste the whole codebase into a chat and ask it to find the bugs. You
will get a list of plausible-sounding issues, some of which are not real, and
you will learn nothing about how to do this on the next project.

Work one report at a time:

1. **Reproduce it first.** If you cannot make the bug happen on purpose, you
   cannot know when you have fixed it. Write down the exact steps.
2. **Ask the agent to investigate, not to fix.** Use plan mode.
   *"Report 3 says the wrong day is shown late at night. Read server.js and
   explain what could cause that. Do not change anything yet."*
3. **Make it prove the diagnosis.** *"Show me the specific line, and tell me
   what input would trigger it."* A diagnosis you cannot test is a guess.
4. **Fix one thing, commit, move on.** One bug per commit, with the report
   number in the message. If a fix breaks something else you will know exactly
   which one.
5. **Write it down as you go** — see below.

## The deliverable

A file called `FINDINGS.md` in this folder. For each report:

| Field | What goes in it |
|---|---|
| Report | The number and the user's words |
| Real? | Yes, or no with an explanation |
| Root cause | The file, the line, and *why* it does the wrong thing |
| Trigger | The exact input or sequence that makes it happen |
| Fix | What you changed, in one sentence |
| Class | Which category of mistake it is — off-by-one, race, unescaped input, and so on |

That last column is the point of the whole exercise. Individual bugs are
forgettable. Categories are what you carry to the next project, and they are
what let you ask an agent a sharp question instead of "why is it broken".

## When you are done

Ask the agent to review your own `FINDINGS.md` against the code:

```
Read FINDINGS.md and verify each root cause against the actual code.
Tell me which ones are wrong or incomplete. Do not be generous.
```

If it disagrees with you, one of you is wrong, and finding out which is worth
more than the original fix.
