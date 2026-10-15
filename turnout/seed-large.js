// Grow the dataset to something closer to a real month of usage.
//
//   node seed-large.js 500 20000
//
// Defaults to 500 events and 20,000 RSVPs. Run the app afterwards and see
// how it feels. Back up data/events.json first if you care about it.

import { writeFileSync, readFileSync } from 'node:fs';

const eventCount = Number(process.argv[2] || 500);
const rsvpCount = Number(process.argv[3] || 20000);

const titles = ['Meetup', 'Workshop', 'Demo Night', 'Roundtable', 'Coffee', 'Showcase', 'Sprint', 'Clinic'];
const places = ['UET Campus, Tirana', 'Destil Hostel', 'Coolab Tirana', 'Blloku, Tirana', 'Innospace'];
const first = ['Arben', 'Elira', 'Denis', 'Sara', 'Ilir', 'Ana', 'Endrit', 'Blerta', 'Klodian', 'Rina'];
const last = ['Hoxha', 'Bregu', 'Kola', 'Meta', 'Prifti', 'Dervishi', 'Cami', 'Nika', 'Shehu', 'Gjoka'];

const today = new Date();
const events = [];
for (let i = 0; i < eventCount; i++) {
  const d = new Date(today);
  d.setDate(today.getDate() + (i % 90) - 30);
  events.push({
    id: i + 1,
    title: `${titles[i % titles.length]} #${i + 1}`,
    date: d.toISOString().split('T')[0],
    location: places[i % places.length],
  });
}

const rsvps = [];
for (let i = 0; i < rsvpCount; i++) {
  rsvps.push({
    id: i + 1,
    eventId: (i % eventCount) + 1,
    name: `${first[i % first.length]} ${last[(i * 7) % last.length]}`,
    status: i % 6 === 0 ? 'no' : 'yes',
    createdAt: new Date(today.getTime() - i * 60000).toISOString(),
  });
}

writeFileSync('data/events.json', JSON.stringify({ events, rsvps }, null, 2));

const bytes = readFileSync('data/events.json').length;
console.log(`Wrote ${events.length} events and ${rsvps.length} RSVPs.`);
console.log(`data/events.json is now ${(bytes / 1024 / 1024).toFixed(1)} MB.`);
console.log('Now start the server and load the page. Time it.');
