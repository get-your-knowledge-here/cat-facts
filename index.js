'use strict';

const allFacts = require('./facts');

const count = allFacts.length;
const MS_PER_DAY = 86400000;

function randomIndex(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Returns one random cat fact.
 */
function randomFact() {
  return allFacts[randomIndex(count)];
}

/**
 * Returns `n` unique random cat facts (at most `count`).
 */
function facts(n = 1) {
  if (!Number.isInteger(n) || n < 0) {
    throw new TypeError('n must be a non-negative integer');
  }
  const pool = allFacts.slice();
  const size = Math.min(n, count);
  // Partial Fisher-Yates shuffle: only the first `size` slots are needed.
  for (let i = 0; i < size; i++) {
    const j = i + randomIndex(count - i);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, size);
}

/**
 * Returns the same fact for everyone on a given UTC day.
 */
function factOfTheDay(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) {
    throw new TypeError('date must be a valid Date, timestamp or date string');
  }
  const day = Math.floor(d.getTime() / MS_PER_DAY);
  return allFacts[((day % count) + count) % count];
}

/**
 * Returns every fact containing `term` (case-insensitive).
 */
function search(term) {
  if (typeof term !== 'string') {
    throw new TypeError('term must be a string');
  }
  const needle = term.trim().toLowerCase();
  if (!needle) return [];
  return allFacts.filter((fact) => fact.toLowerCase().includes(needle));
}

/**
 * v1-compatible default export. Resolves to `{ text }` and also calls the
 * optional Node-style callback.
 */
function catFacts(cb) {
  const result = { text: randomFact() };
  if (typeof cb === 'function') {
    process.nextTick(cb, null, result);
  }
  return Promise.resolve(result);
}

module.exports = catFacts;
module.exports.default = catFacts;
module.exports.catFacts = catFacts;
module.exports.randomFact = randomFact;
module.exports.facts = facts;
module.exports.factOfTheDay = factOfTheDay;
module.exports.search = search;
module.exports.allFacts = allFacts;
module.exports.count = count;
