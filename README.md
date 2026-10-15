# Egnatia Ventures × UET — AI Engineering Starter Kit

Everything in this folder is meant to be **copied into your own project**, not
read as documentation. It is the set of agents and skills we use during the
workshop, ready to go.

It is written for **GitHub Copilot in VS Code on the free plan**. The same files
also work in Claude Code if you pay for Claude. Codex reads `AGENTS.md`.

## What is in here

```
AGENTS.md                Project facts. Copilot and Codex read it on every request.
CLAUDE.md                One line that points Claude Code at AGENTS.md.
.claude/
  agents/                Specialist agents: separate workers with their own instructions and tools.
    requirements-analyst.md    SDLC 1 — Requirements
    solution-architect.md      SDLC 2 — Design (read-only)
    qa-runner.md               SDLC 4 — Test (keeps long logs out of your chat)
    code-reviewer.md           SDLC 5 — Review (no edit tool)
    growth-marketer.md         SDLC 7 — Go-to-market (read-only)
  skills/                Skills: procedures that load only when used. Type / in Chat.
    start-here/            /start-here     Load project state at session start
    handoff/               /handoff        Write state to disk at session end
    write-prd/             /write-prd      Idea → interview → docs/requirements.md
    prototype-spec/        /prototype-spec Requirements → screens + click path
    ship-check/            /ship-check     Pre-demo verdict
    sqlite-migrate/        /sqlite-migrate JSON storage → local SQLite
    positioning/           /positioning    What is this, who for, why switch
    launch-copy/           /launch-copy    Landing page, launch post, outreach
    weekly-plan/           /weekly-plan    Ship state → a realistic week
  settings.json          Claude Code only: its allow and deny lists. Copilot does not use this file.
docs/                    The project's memory. Filled-in examples — replace them.
  design.md                What it is and how it is built. Changes rarely.
  roadmap.md               Every feature in stages. One stage in progress.
  handoff.md               Where the last session stopped. Overwritten each time.
fallback/prototype.html  Zero-install prototype starter. Double-click to run (needs internet).
```

Why `.claude/` and not `.github/`? Copilot's own folders are `.github/agents/`
and `.github/skills/`, but VS Code also reads `.claude/agents/` and
`.claude/skills/`. Keeping them in `.claude/` means one copy serves Copilot and
Claude Code.

## The loop these are built around

```
git init  →  design.md  →  roadmap.md  →  build a stage  →  commit
                ↑                                             ↓
           /start-here  ←──────  handoff.md  ←──────  /handoff
```

Git first, always, before anything is generated — it is the only thing that
makes an agent's mistakes cheap. Then the three documents carry the project
across sessions, so a new chat starts productive instead of re-reading your
codebase to work out what you were doing.

## Install it

From your `egnatia` folder, the one that holds `prototype`, clone the kit:

```bash
git clone https://github.com/nickwilger/egnatia-starter-kit.git
```

You now have `egnatia/prototype` and `egnatia/egnatia-starter-kit` side by
side. If you have the kit on a USB stick or as a zip instead, unzip it inside
`egnatia` so the folder is called `egnatia-starter-kit`.

Then copy it into your project. Open the terminal in VS Code (it starts in your
project folder) and run:

```bash
cp -R ../egnatia-starter-kit/.claude ../egnatia-starter-kit/docs ../egnatia-starter-kit/AGENTS.md ../egnatia-starter-kit/CLAUDE.md .
```

Windows PowerShell:

```powershell
Copy-Item -Recurse ..\egnatia-starter-kit\.claude, ..\egnatia-starter-kit\docs, ..\egnatia-starter-kit\AGENTS.md, ..\egnatia-starter-kit\CLAUDE.md .
```

Do not copy the kit's `.gitignore` over your project's. Instead, check that
your project's `.gitignore` covers `.env` before you ever put a key in one.

Then check, without spending a request:

- Open the agent picker under the Chat box. The five agents are listed.
- Type `/` in the Chat box. `/write-prd`, `/handoff` and the other skills are listed.

Nothing listed? VS Code only loads these from a **trusted** folder. Run
**Workspaces: Manage Workspace Trust** from the Command Palette, trust the
folder, and reload the window. Every skill also works as a plain request:
"Follow `.claude/skills/write-prd/SKILL.md`. The idea is: …"

If we tell you the kit has changed, run `git pull` inside
`egnatia-starter-kit`, then run the copy command again. The copy overwrites the
kit's files in your project, so commit your own edits first.

## On the free plan

Copilot Free has a monthly allowance for Chat and agent requests, and GitHub
does not publish it as a fixed number of messages. See what you have used in
the Copilot status dashboard: select the Copilot icon in the Status Bar.

- Each message you send uses some of it, and so does each specialist agent a
  skill calls. `/write-prd` and `/ship-check` call agents.
- Put everything in one message: the goal, the files, what not to touch, and
  how you will check it.
- When it runs out, inline code suggestions keep working until the monthly
  reset. A new chat does not refill it.
- Auto picks the model on the free plan, so these agents do not name one.

## Where these files can live

| Path | Applies to | Use for |
|---|---|---|
| `AGENTS.md` | this project | facts every tool should know |
| `.claude/agents/` · `.claude/skills/` | this project only | anything project-specific; commit it so your team gets it |
| `~/.copilot/agents/` · `~/.copilot/skills/` (or the `~/.claude/` equivalents) | every project you open | how *you* work — your reviewer, your planner, your writing voice |

Start personal, promote to project once a teammate needs it.

## The rule that decides which one to write

- A **fact** that is always true about your project → `AGENTS.md`
- A **procedure** you keep repeating → a **skill**
- Work that is **verbose**, or needs **different tools or permissions** → a
  **specialist agent**

Getting this wrong is the most common and most expensive mistake. Everything in
`AGENTS.md` is sent with every request. A skill's full instructions load only
when it is used.

## Before you use any of these

Open each file and change it. These are written for a generic early-stage
product; the value is in the parts you make specific to yours. An agent that
does not know your users is worse than no agent.

Read-only is an instruction, not a lock. The reviewer and the QA runner have no
edit tool, but they can run terminal commands, and VS Code asks you before it
runs anything that is not read-only. Read what you approve.
