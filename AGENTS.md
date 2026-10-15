# AGENTS.md

The project facts for every AI tool in this folder. GitHub Copilot in VS Code
and Codex read this file directly. Claude Code reads it through `CLAUDE.md`,
which imports it. One file means the tools cannot disagree about your project.

Keep it short and keep it to facts. It goes with every request, so every line
here has a cost on every request. Procedures belong in `.claude/skills/`, which
load only when used.

## What this is

<One sentence. What the product does and who it is for.>

## Stack

- React 19 + Vite, plain JavaScript (no TypeScript in the prototype)
- Tailwind for styling, no component library
- No backend, no database yet. Sample data lives in `src/data.js`.
- Storage moves to SQLite (`node:sqlite`) at roadmap stage 3.

## Commands

- `npm run dev` - start the dev server on http://localhost:5173
- `npm run build` - production build

## Conventions

- Screens switch on a single `screen` state value in `App.jsx`, not a router.
- One component per file in `src/components/`.
- Sample data is realistic, never "Test User 1", and labelled as sample data.
- Never commit `.env` or anything with a key in it.

## Project memory

- `docs/requirements.md` - the product brief, written by `/write-prd`
- `docs/design.md` - what this is and how it is built
- `docs/roadmap.md` - the stages; one is in progress at a time
- `docs/handoff.md` - where the last session stopped. Read this first.

## How I want you to work

- Before a change that touches more than two files, propose a plan and wait for my go-ahead.
- Before starting anything substantial, check `git status`. If there is uncommitted work, say so and stop.
- After editing UI, tell me the exact click path to verify it. Do not tell me it works.
- Prefer small, reviewable diffs. Do not add a dependency without saying what breaks without it.
- If you are guessing, say you are guessing.
- If the conversation is summarised, keep the screen list, the data shapes and any bug we have not fixed yet.
