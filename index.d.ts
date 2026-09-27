/** v1-compatible: resolves to `{ text }` and calls the optional callback. */
declare function catFacts(cb?: (err: Error | null, fact: catFacts.CatFact) => void): Promise<catFacts.CatFact>;

declare namespace catFacts {
  interface CatFact {
    text: string;
  }
  /** Returns one random cat fact. */
  function randomFact(): string;
  /** Returns `n` unique random facts (capped at `count`). Defaults to 1. */
  function facts(n?: number): string[];
  /** Returns the same fact for everyone on a given UTC day. */
  function factOfTheDay(date?: Date | number | string): string;
  /** Returns every fact containing `term`, case-insensitive. */
  function search(term: string): string[];
  /** Every bundled fact, frozen. */
  const allFacts: readonly string[];
  /** Number of bundled facts. */
  const count: number;
  /** Same as the default export. */
  function catFacts(cb?: (err: Error | null, fact: CatFact) => void): Promise<CatFact>;
}

export = catFacts;
