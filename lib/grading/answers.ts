/** Normalize spacing and case while preserving punctuation for human review. */
export function normalizeAnswer(answer: string): string {
  return answer.trim().replace(/\s+/g, " ").toLocaleLowerCase("en");
}

/** Compare against reviewed translations; semantic equivalence remains a human decision. */
export function matchesAcceptedTranslation(answer: string, accepted: string[]): boolean {
  const normalized = normalizeAnswer(answer);
  return normalized.length > 0 && accepted.some((candidate) => normalizeAnswer(candidate) === normalized);
}
