---
name: write-prd
description: Turn a one-line idea into a structured requirements document at docs/requirements.md. Use when starting a new project or feature, or when someone says "I have an idea for...".
argument-hint: "[one-line description of the idea]"
---

The idea is the text typed after `/write-prd`. If there is none, ask for the idea in one sentence and stop.

**Step 1 - interview.** In one message, ask these four questions, numbered, and nothing else. Tell the founder to answer all four in a single reply. Then stop and wait.

1. Who exactly is the user? Name one person or role you could talk to this week.
2. What do they do today instead, and what is bad about it?
3. After a short demo, what would "working" look like to them?
4. What is explicitly out of scope for the first version?

**Step 2 - write.** Once the founder has answered, use the `requirements-analyst` subagent to write `docs/requirements.md`. Give it the idea and the four answers word for word; it cannot see this conversation. If subagents are not available, read `.claude/agents/requirements-analyst.md` and follow it yourself.

When it is done, print only the v1 scope list and the cut list. Do not print the whole document back into the conversation - the founder can open the file.
