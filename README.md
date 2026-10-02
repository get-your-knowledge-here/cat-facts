<p align="center">
  <a href="https://gykh.sylvesterdas.com/cat-facts/"><img src="https://raw.githubusercontent.com/get-your-knowledge-here/cat-facts/main/docs/assets/banner.jpg" alt="cat-facts: Random · Daily · Search · CLI" width="100%" /></a>
</p>

# @gykh/cat-facts

> Zero-dependency, offline cat facts for Node.js. Get a random fact, a fact of the day, or search 108 curated facts, from code or the command line.

[![npm version](https://img.shields.io/npm/v/@gykh/cat-facts.svg?style=flat-square)](https://www.npmjs.com/package/@gykh/cat-facts)
[![npm downloads](https://img.shields.io/npm/dm/@gykh/cat-facts.svg?style=flat-square)](https://www.npmjs.com/package/@gykh/cat-facts)
[![CI Tests](https://img.shields.io/github/actions/workflow/status/get-your-knowledge-here/cat-facts/test.yml?branch=main&label=tests&style=flat-square)](https://github.com/get-your-knowledge-here/cat-facts/actions)
[![node version](https://img.shields.io/node/v/@gykh/cat-facts.svg?style=flat-square)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](./index.d.ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=flat-square)](./package.json)
[![Live Demo](https://img.shields.io/badge/demo-live-58a6ff.svg?style=flat-square)](https://gykh.sylvesterdas.com/cat-facts/)
[![MiniFyn](https://img.shields.io/badge/by-MiniFyn-7c3aed.svg?style=flat-square)](https://www.minifyn.com)

**▶ [Try it live in your browser](https://gykh.sylvesterdas.com/cat-facts/)**: random facts, the fact of the day and search, with no install.

**▶ [Watch the 49-second demo](https://youtube.com/shorts/Eu_HYvdBSn4)** on YouTube. More short package videos on [@gykhdev](https://www.youtube.com/@gykhdev). All packages: [@gykh on npm](https://www.npmjs.com/org/gykh).

```bash
npx @gykh/cat-facts
🐱 A group of cats is called a clowder.
```

---

## Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [CLI](#cli)
- [API Reference](#api-reference)
- [Upgrading from v1](#upgrading-from-v1)
- [Interactive Demo](#interactive-demo)
- [More from the Author: MiniFyn](#more-from-the-author-minifyn)
- [Developer](#developer)
- [License](#license)

---

## Features

- 🚀 **Zero Dependencies**: Pure JavaScript, nothing else to install.
- 📴 **Works Offline**: 108 curated facts ship inside the package. No API, no rate limits, no outages.
- 🎲 **Unique Random Picks**: `facts(5)` never repeats a fact.
- 📅 **Fact of the Day**: The same fact for everyone on a given UTC day, perfect for bots and dashboards.
- 🔎 **Search**: Case-insensitive search across every fact.
- 💻 **CLI**: `npx @gykh/cat-facts` for a quick fact in your terminal or shell greeting.
- 📘 **TypeScript Ready**: Bundled type definitions, CommonJS and ESM entries.
- ♻️ **v1 Compatible**: The default export still takes a callback, and now returns a Promise too.

---

## Install

```bash
# pnpm
pnpm add @gykh/cat-facts

# npm
npm install @gykh/cat-facts

# yarn
yarn add @gykh/cat-facts
```

Requires Node.js 18 or later.

---

## Usage

```js
// ESM
import { randomFact, facts, factOfTheDay, search, count } from '@gykh/cat-facts';

// CommonJS
const { randomFact, facts, factOfTheDay, search, count } = require('@gykh/cat-facts');

randomFact();
// 'Cats have a third eyelid, called the nictitating membrane, that helps protect the eye.'

facts(3);
// three different facts

factOfTheDay();
// the same fact all day (UTC), a new one tomorrow

search('purr');
// every fact that mentions purring

count; // 108
```

The v1 default export still works:

```js
import catFacts from '@gykh/cat-facts';

const { text } = await catFacts();

catFacts((err, fact) => console.log(fact.text));
```

---

## CLI

```bash
npx @gykh/cat-facts              # one random fact
npx @gykh/cat-facts 5            # five unique facts
npx @gykh/cat-facts --today      # fact of the day
npx @gykh/cat-facts --search tail
npx @gykh/cat-facts 3 --json     # JSON array, handy for scripts
```

Install it globally (`npm i -g @gykh/cat-facts`) and add `cat-facts` to your `~/.zshrc` or `~/.bashrc` for a fact every time you open a terminal.

| Option | Description |
| --- | --- |
| `n` | Print `n` unique random facts (default 1) |
| `-t`, `--today` | Print the fact of the day |
| `-s`, `--search <q>` | Print every fact containing `<q>` |
| `-j`, `--json` | Output JSON |
| `-v`, `--version` | Print the version |
| `-h`, `--help` | Show help |

---

## API Reference

### `randomFact()`
Returns one random fact.
* **Returns**: `string`

### `facts(n = 1)`
Returns `n` unique random facts. Asking for more than `count` returns every fact, shuffled.
* **`n`** (`number`, non-negative integer): How many facts to return.
* **Returns**: `string[]`
* **Throws**: `TypeError` if `n` is not a non-negative integer.

### `factOfTheDay(date = new Date())`
Returns a deterministic fact for the UTC day of `date`. Everyone gets the same fact on the same day.
* **`date`** (`Date | number | string`): Any value `new Date()` accepts.
* **Returns**: `string`
* **Throws**: `TypeError` for an invalid date.

### `search(term)`
Returns every fact containing `term`, ignoring case. A blank term returns `[]`.
* **`term`** (`string`): Text to look for.
* **Returns**: `string[]`

### `allFacts`
Every bundled fact, as a frozen array (`readonly string[]`).

### `count`
The number of bundled facts (`number`).

### `catFacts(callback?)` (default export)
The v1 API. Resolves to `{ text }` and, if given, calls `callback(null, { text })`.
* **Returns**: `Promise<{ text: string }>`

---

## Upgrading from v1

v1 fetched facts from `cat-fact.herokuapp.com`. That API no longer responds, so v1 fails on every call. v2 bundles the facts instead.

- `catFacts(cb)` still works. The result now only has a `text` field; other fields from the old API response are gone.
- `node-fetch` is no longer installed.
- Node.js 18 or later is required.

---

## Interactive Demo

**Live playground:** [https://gykh.sylvesterdas.com/cat-facts/](https://gykh.sylvesterdas.com/cat-facts/)

Draw random facts, see today's fact, search every fact and share your favorite, entirely in your browser. To run it offline, open [`docs/index.html`](./docs/index.html) locally.

---

## More from the Author: MiniFyn

If you find this library useful, check out **[MiniFyn](https://www.minifyn.com)**, *the simplest way to shorten, share, and track your links*, and its family of privacy-focused tools:

| Product | What it does | Link |
| --- | --- | --- |
| 🔗 **MiniFyn** | Shorten, share and track links with the short `mnfy.in` domain | [minifyn.com](https://www.minifyn.com) |
| 🧩 **MiniFyn API** | Add link shortening and analytics to your own apps | [API docs](https://www.minifyn.com/docs/api) |
| 🛡️ **ScamGuard** | Check links and QR codes for scams, phishing and malware | [minifyn.com/scamguard](https://www.minifyn.com/scamguard) · [Chrome extension](https://chromewebstore.google.com/detail/scamguard-link-checker/cendbppkhplamddjfnbhgbejnpmfmlbi) |
| 🙈 **CensorFyn** | Offline, on-device AI redaction for photos and videos | [minifyn.com/censorfyn](https://www.minifyn.com/censorfyn) |
| 🎬 **ClipFyn** | Trim and prepare videos for sharing | [minifyn.com/clipfyn](https://www.minifyn.com/clipfyn) |

---

## Developer

- **Sylvester Das** — [Website](https://www.sylvesterdas.com) • [MiniFyn](https://www.minifyn.com) • [Buy Me A Coffee](https://www.buymeacoffee.com/sylvester.das)

---

## License

[MIT](./LICENSE) © 2021-2026 [get-your-knowledge-here](https://github.com/get-your-knowledge-here)
