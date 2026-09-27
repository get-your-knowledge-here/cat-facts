# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-09-27

A full rewrite. v1 fetched facts from `cat-fact.herokuapp.com`, which no longer responds, so every call failed.

### Added
- 108 curated cat facts bundled with the package; works fully offline.
- `randomFact()`, `facts(n)`, `factOfTheDay(date?)`, `search(term)`, `allFacts` and `count`.
- `cat-facts` CLI: `npx @gykh/cat-facts [n] [--today] [--search term] [--json]`.
- ESM entry (`index.mjs`) and TypeScript types (`index.d.ts`).
- Test suite on the built-in Node test runner, CI on Node 18/20/22/24, provenance publishing.
- Web playground, README banner, favicons and social preview image.

### Changed
- Zero dependencies: removed `node-fetch`.
- The default export still accepts a Node-style callback and now also returns a Promise. It resolves to `{ text }`; other fields from the old API response are gone.
- Requires Node.js 18 or later.

## [1.0.2] - 2021

- Last release of the API-backed version.
