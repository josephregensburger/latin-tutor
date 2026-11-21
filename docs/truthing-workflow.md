# Sentence truthing workflow

1. Enter an authentic source sentence or a controlled, generated sentence. Record provenance when available.
2. Tokenize the sentence and gather candidate morphology from a Latin analyzer.
3. Request a proposed dependency analysis from LatinCy or another configured parser. Preserve the provider and model version.
4. Optionally ask an LLM to explain alternatives or draft literal and semantic translations. Treat this as another proposal.
5. Review every token, relationship, and translation. Correct errors and retain genuine ambiguity where appropriate.
6. Approve the sentence. Only approved records can be selected for student exercises.

Student exercise grading reads the stored approved answer data. It does not call an NLP parser or LLM. LLM feedback may explain a known grading result, but it does not decide whether the answer is correct.

Analysis runs are historical records. Re-running a newer model creates a new proposal and must not overwrite the approved annotation until a reviewer approves the change.
