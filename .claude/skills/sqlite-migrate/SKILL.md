---
name: sqlite-migrate
description: Move a project from JSON-file storage to a local SQLite database. Use when a JSON data file is getting slow or large, when concurrent writes are losing data, or when preparing a prototype to become a real application.
---

Use `node:sqlite`, built into Node 24+. No npm install, no native build step:

```js
import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('data/app.db');
```

Work in this order and stop after each step for me to run it.

**1 · Read the shape.** Read the existing JSON file and the code that touches
it. List every distinct record type, its fields, and the relationships between
them. Show me this before writing any SQL.

**2 · Propose the schema.** One table per record type. Real column types,
`NOT NULL` where the data is genuinely always present, a `PRIMARY KEY` per
table, `FOREIGN KEY` for each relationship, and an index on every column
currently used to filter or join. Explain each index in terms of the query it
serves. Do not create indexes nothing queries.

**3 · Write the migration as a separate script.** `migrate.js`, reading the
JSON and writing the database. It must be safe to run twice. Wrap the inserts
in one transaction. Never modify or delete the JSON file — it is the backup.

**4 · Swap the read path first.** Replace queries one function at a time,
leaving writes on JSON. Run the app after each. Reads are reversible; this is
where you catch a wrong schema cheaply.

**5 · Swap the write path.** Use prepared statements with bound parameters,
never string concatenation. Wrap any multi-statement write in a transaction.

**6 · Prove it.** Report the row counts against the JSON record counts, and
time the slowest query before and after.

Rules throughout:

- Bound parameters only. A single string-concatenated query is a failed migration.
- Every multi-step write is a transaction, or the crash halfway through leaves
  the data wrong.
- If a JSON structure does not map cleanly to tables, say so and show me the
  options rather than inventing a JSON column to hide the problem.
