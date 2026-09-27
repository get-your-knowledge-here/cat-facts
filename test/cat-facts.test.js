'use strict';

const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const catFacts = require('..');
const { randomFact, facts, factOfTheDay, search, allFacts, count } = catFacts;

const BIN = path.join(__dirname, '..', 'bin', 'cat-facts.js');

test('bundled facts are unique, non-empty and frozen', () => {
  assert.ok(count >= 100);
  assert.strictEqual(allFacts.length, count);
  assert.strictEqual(new Set(allFacts).size, count);
  assert.ok(allFacts.every((f) => typeof f === 'string' && f.trim().length > 10));
  assert.ok(Object.isFrozen(allFacts));
});

test('randomFact returns a bundled fact', () => {
  for (let i = 0; i < 50; i++) assert.ok(allFacts.includes(randomFact()));
});

test('facts(n) returns n unique facts', () => {
  const five = facts(5);
  assert.strictEqual(five.length, 5);
  assert.strictEqual(new Set(five).size, 5);
  assert.deepStrictEqual(facts(0), []);
  assert.strictEqual(facts().length, 1);
});

test('facts(n) caps at count', () => {
  const every = facts(count + 50);
  assert.strictEqual(every.length, count);
  assert.deepStrictEqual([...every].sort(), [...allFacts].sort());
});

test('facts(n) rejects bad input', () => {
  assert.throws(() => facts(-1), TypeError);
  assert.throws(() => facts(1.5), TypeError);
  assert.throws(() => facts('3'), TypeError);
});

test('factOfTheDay is stable within a UTC day and changes the next day', () => {
  const morning = factOfTheDay(new Date('2026-09-27T00:01:00Z'));
  const night = factOfTheDay('2026-09-27T23:59:00Z');
  const tomorrow = factOfTheDay(Date.parse('2026-09-28T12:00:00Z'));
  assert.strictEqual(morning, night);
  assert.notStrictEqual(morning, tomorrow);
  assert.ok(allFacts.includes(factOfTheDay()));
  assert.ok(allFacts.includes(factOfTheDay(new Date('1960-01-01'))));
});

test('factOfTheDay rejects invalid dates', () => {
  assert.throws(() => factOfTheDay('not a date'), TypeError);
});

test('search is case-insensitive', () => {
  const hits = search('PURR');
  assert.ok(hits.length > 0);
  assert.ok(hits.every((f) => f.toLowerCase().includes('purr')));
  assert.deepStrictEqual(search('   '), []);
  assert.deepStrictEqual(search('zzzxqj'), []);
  assert.throws(() => search(42), TypeError);
});

test('default export keeps the v1 callback API', (t, done) => {
  catFacts((err, fact) => {
    assert.strictEqual(err, null);
    assert.ok(allFacts.includes(fact.text));
    done();
  });
});

test('default export also returns a Promise', async () => {
  const fact = await catFacts();
  assert.ok(allFacts.includes(fact.text));
  assert.strictEqual(catFacts.default, catFacts);
});

test('ESM entry exposes the same API', async () => {
  const esm = await import('../index.mjs');
  assert.strictEqual(esm.default, catFacts);
  assert.strictEqual(esm.count, count);
  assert.strictEqual(typeof esm.factOfTheDay, 'function');
});

test('CLI prints n facts, the fact of the day, search results and JSON', () => {
  const run = (...args) => execFileSync(process.execPath, [BIN, ...args], { encoding: 'utf8' });
  assert.strictEqual(run('3').trim().split('\n').length, 3);
  assert.strictEqual(run('--today').trim(), `🐱 ${factOfTheDay()}`);
  assert.deepStrictEqual(JSON.parse(run('--search', 'whisker', '--json')), search('whisker'));
  assert.match(run('--help'), /Usage: cat-facts/);
});

test('CLI exits non-zero on bad input', () => {
  assert.throws(() => execFileSync(process.execPath, [BIN, '--nope'], { stdio: 'pipe' }));
  assert.throws(() => execFileSync(process.execPath, [BIN, '--search', 'zzzxqj'], { stdio: 'pipe' }));
});

test('docs playground uses the same facts as the package', () => {
  const html = require('node:fs').readFileSync(path.join(__dirname, '..', 'docs', 'index.html'), 'utf8');
  const match = html.match(/const FACTS = \/\*FACTS\*\/(.*);/);
  assert.ok(match, 'FACTS marker missing from docs/index.html');
  assert.deepStrictEqual(JSON.parse(match[1]), [...allFacts], 'run `pnpm sync-docs`');
});
