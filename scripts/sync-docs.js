'use strict';

// Inlines facts.js into docs/index.html so the playground works as a static page.
const fs = require('node:fs');
const path = require('node:path');
const facts = require('../facts');

const file = path.join(__dirname, '..', 'docs', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const out = html.replace(/const FACTS = \/\*FACTS\*\/.*;/, () => `const FACTS = /*FACTS*/${JSON.stringify(facts)};`);
fs.writeFileSync(file, out);
