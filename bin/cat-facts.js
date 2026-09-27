#!/usr/bin/env node
'use strict';

const { facts, factOfTheDay, search, count } = require('..');
const { version } = require('../package.json');

const HELP = `Usage: cat-facts [n] [options]

  n                 print n unique random facts (default 1)
  -t, --today       print the fact of the day
  -s, --search <q>  print every fact containing <q>
  -j, --json        output JSON
  -v, --version     print the version
  -h, --help        show this help

${count} facts bundled, works offline.`;

function main(argv) {
  let n = 1;
  let mode = 'random';
  let term = '';
  let json = false;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '-h' || arg === '--help') return print(HELP);
    if (arg === '-v' || arg === '--version') return print(version);
    if (arg === '-t' || arg === '--today') mode = 'today';
    else if (arg === '-j' || arg === '--json') json = true;
    else if (arg === '-s' || arg === '--search') {
      mode = 'search';
      term = argv[++i] || '';
    } else if (/^\d+$/.test(arg)) n = Number(arg);
    else return fail(`Unknown argument: ${arg}\n\n${HELP}`);
  }

  let out;
  if (mode === 'today') out = [factOfTheDay()];
  else if (mode === 'search') {
    if (!term) return fail('--search needs a term');
    out = search(term);
    if (!out.length && !json) return fail(`No facts match "${term}"`);
  } else out = facts(n);

  print(json ? JSON.stringify(out, null, 2) : out.map((f) => `🐱 ${f}`).join('\n'));
}

function print(text) {
  process.stdout.write(text + '\n');
}

function fail(text) {
  process.stderr.write(text + '\n');
  process.exitCode = 1;
}

main(process.argv.slice(2));
