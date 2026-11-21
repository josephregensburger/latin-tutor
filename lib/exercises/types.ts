export type ExerciseStage = "SCAN" | "LABEL" | "LINK" | "TRANSLATE" | "CHECK";

export const EXERCISE_STAGES: readonly ExerciseStage[] = ["SCAN", "LABEL", "LINK", "TRANSLATE", "CHECK"];

export type SentenceToken = {
  position: number;
  word: string;
  lemma: string;
  partOfSpeech: string;
  morphology: Record<string, string | number | boolean>;
  syntacticRole?: string;
  headPosition?: number;
};
