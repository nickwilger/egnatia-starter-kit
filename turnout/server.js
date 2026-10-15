// Turnout — a tiny event RSVP tracker.
// Node built-ins only. No npm install. Run with:  node server.js
//
// It works. Mostly. See README.md for what people have been complaining about.

import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'data', 'events.json');
const PORT = 3000;
const PAGE_SIZE = 10;

// ---------------------------------------------------------------------------
// Storage. Everything lives in one JSON file.
// ---------------------------------------------------------------------------

let cache = null;

async function load() {
  if (cache) return cache;
  const raw = await readFile(DATA_FILE, 'utf8');
  cache = JSON.parse(raw);
  return cache;
}

async function save(db) {
  cache = db;
  await writeFile(DATA_FILE, JSON.stringify(db, null, 2));
}

// ---------------------------------------------------------------------------
// Business logic
// ---------------------------------------------------------------------------

function todayString() {
  return new Date().toISOString().split('T')[0];
}

async function listEvents(page) {
  const db = await load();
  const start = page * PAGE_SIZE;
  const pageItems = db.events.slice(start, start + PAGE_SIZE - 1);

  // Attach the attendee count for each event.
  for (const event of pageItems) {
    let count = 0;
    for (const rsvp of db.rsvps) {
      if (rsvp.eventId === event.id && rsvp.status === 'yes') count++;
    }
    event.attendeeCount = count;
  }

  return { events: pageItems, total: db.events.length, page };
}

async function eventsToday() {
  const db = await load();
  const today = todayString();
  return db.events.filter(e => e.date === today);
}

async function addRsvp(eventId, name, status) {
  const db = await load();

  const event = db.events.find(e => e.id === eventId);
  if (!event) throw new Error(`No event with id ${eventId}`);

  const existing = db.rsvps.find(r => r.eventId === eventId && r.name === name);
  if (existing) {
    existing.status = status;
  } else {
    db.rsvps.push({
      id: db.rsvps.length + 1,
      eventId,
      name,
      status,
      createdAt: new Date().toISOString(),
    });
  }

  await save(db);
  return { ok: true };
}

async function attendeesFor(eventId) {
  const db = await load();
  return db.rsvps.filter(r => r.eventId === eventId && r.status === 'yes');
}

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

function json(res, code, body) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString() || '{}');
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  try {
    if (url.pathname === '/') {
      const html = readFileSync(join(__dirname, 'public', 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(html);
    }

    if (url.pathname === '/api/events') {
      const page = Number(url.searchParams.get('page') || 0);
      return json(res, 200, await listEvents(page));
    }

    if (url.pathname === '/api/events/today') {
      return json(res, 200, await eventsToday());
    }

    if (url.pathname === '/api/attendees') {
      const eventId = Number(url.searchParams.get('eventId'));
      return json(res, 200, await attendeesFor(eventId));
    }

    if (url.pathname === '/api/rsvp' && req.method === 'POST') {
      const { eventId, name, status } = await readBody(req);
      try {
        const result = await addRsvp(Number(eventId), name, status);
        return json(res, 200, result);
      } catch (err) {
        // Don't let one bad RSVP take down the whole server.
        return json(res, 200, { ok: true });
      }
    }

    json(res, 404, { error: 'not found' });
  } catch (err) {
    console.error(err);
    json(res, 500, { error: 'server error' });
  }
});

server.listen(PORT, () => {
  console.log(`Turnout running at http://localhost:${PORT}`);
});
