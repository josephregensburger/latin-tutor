const dictionary = {
  Arma: { lemma: "arma, armorum", meaning: "arms, weapons", form: "neuter plural · accusative", note: "The object of the verb cano." },
  "virumque": { lemma: "vir, viri", meaning: "and the man", form: "masculine · accusative singular", note: "-que means ‘and’ and joins this word to arma." },
  cano: { lemma: "cano, canere, cecini", meaning: "I sing · I tell", form: "1st person singular · present", note: "The -o ending tells you ‘I’. This is the main verb." },
  Troiae: { lemma: "Troia, Troiae", meaning: "of Troy", form: "feminine · genitive singular", note: "The genitive often expresses ‘of’." },
  qui: { lemma: "qui, quae, quod", meaning: "who", form: "masculine · nominative singular", note: "This relative pronoun refers back to virum, ‘the man’." },
  primus: { lemma: "primus, -a, -um", meaning: "first", form: "masculine · nominative singular", note: "An adjective agreeing with the understood subject of venit." },
  ab: { lemma: "ab", meaning: "from, away from", form: "preposition + ablative", note: "Look for its object in the next word." },
  oris: { lemma: "ora, orae", meaning: "shores", form: "feminine · ablative plural", note: "With ab: ‘from the shores’." },
  Italiam: { lemma: "Italia, Italiae", meaning: "Italy", form: "feminine · accusative singular", note: "The accusative can mark a destination with verbs of motion." },
  fato: { lemma: "fatum, fati", meaning: "by fate", form: "neuter · ablative singular", note: "An ablative describing the means or cause." },
  profugus: { lemma: "profugus, -a, -um", meaning: "exiled · wandering", form: "masculine · nominative singular", note: "Describes the man who is traveling." },
  Laviniaque: { lemma: "Lavinia, Laviniae", meaning: "and Lavinian", form: "feminine · adjective, accusative plural", note: "-que joins this adjective to Italiam: Lavinian shores." },
  venit: { lemma: "venio, venire, veni", meaning: "he comes · he arrived", form: "3rd person singular · perfect", note: "The subject is the man described by qui." },
};
const vocab = [
  ["cano", "I sing · I tell", "CANERE"], ["vir", "man · hero", "VIRUM"], ["fatum", "fate · destiny", "FATO"],
  ["venio", "I come · arrive", "VENIT"], ["ora", "shore · coast", "ORIS"], ["profugus", "exiled · wandering", "PROFUGUS"],
];
const hints = [
  ["A small hint", "Look for <em>cano</em>. Its subject is hidden in the verb ending."],
  ["Notice the ending", "<em>Cano</em> ends in <em>-o</em>: the poet is saying ‘I sing’."],
  ["Build the first line", "<em>Arma</em> and <em>virum</em> are both what the poet sings about."],
  ["One possible rhythm", "Try: ‘Arms and the man I sing, who first…’ Keep the relative clause together."],
];
let hintIndex = 0;
const detail = document.querySelector("#word-detail");
document.querySelectorAll(".word").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".word").forEach((word) => word.classList.remove("selected"));
  button.classList.add("selected");
  const entry = dictionary[button.dataset.word];
  detail.innerHTML = `<div class="word-info"><strong>${button.dataset.word}</strong><em>${entry.lemma}</em><span>${entry.meaning}</span><small>${entry.form}</small></div><div style="font-size:10px;color:#85877e;margin:6px 0 0 1px">${entry.note}</div>`;
}));
document.querySelector("#clear-selection").addEventListener("click", () => {
  document.querySelectorAll(".word").forEach((word) => word.classList.remove("selected"));
  detail.innerHTML = '<div class="detail-prompt"><span class="cursor-mark">↖</span><span>Select any Latin word to explore its meaning and form.</span></div>';
});
const hintTitle = document.querySelector("#hint-title");
const hintCopy = document.querySelector("#hint-copy");
document.querySelector("#next-hint").addEventListener("click", () => {
  hintIndex = (hintIndex + 1) % hints.length;
  hintTitle.textContent = hints[hintIndex][0];
  hintCopy.innerHTML = hints[hintIndex][1];
});
const translation = document.querySelector("#translation");
const updateCount = () => {
  const count = translation.value.trim() ? translation.value.trim().split(/\s+/).length : 0;
  document.querySelector("#word-count").textContent = `${count} ${count === 1 ? "word" : "words"}`;
  localStorage.setItem("lingua-translation", translation.value);
};
translation.value = localStorage.getItem("lingua-translation") || "";
updateCount();
translation.addEventListener("input", updateCount);
document.querySelector("#check-button").addEventListener("click", () => {
  const feedback = document.querySelector("#feedback");
  if (!translation.value.trim()) {
    feedback.textContent = "Start with a rough first line. You can refine it as you go.";
    translation.focus();
  } else {
    feedback.textContent = "Nice start. Read it aloud, then check how each clause fits together.";
  }
});
const vocabList = document.querySelector("#vocab-list");
vocab.forEach(([lemma, meaning, form]) => {
  const item = document.createElement("div");
  item.className = "vocab-item";
  item.innerHTML = `<strong>${lemma}</strong><span>${meaning}</span><small>IN THIS PASSAGE · ${form}</small>`;
  vocabList.append(item);
});
const reflection = document.querySelector("#reflection");
reflection.value = localStorage.getItem("lingua-reflection") || "";
reflection.addEventListener("input", () => {
  localStorage.setItem("lingua-reflection", reflection.value);
  document.querySelector("#reflection-saved").textContent = reflection.value ? "Saved on this device." : "Your reflection stays private.";
});
document.querySelector("#audio-button").addEventListener("click", () => {
  const button = document.querySelector("#audio-button");
  button.innerHTML = '<span class="play-icon">♪</span> Read aloud';
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("Arma virumque cano, Troiae qui primus ab oris Italiam, fato profugus, Laviniaque venit");
    utterance.lang = "la";
    utterance.onend = () => { button.innerHTML = '<span class="play-icon">▶</span> Listen'; };
    speechSynthesis.speak(utterance);
  } else {
    button.title = "Speech playback is not supported in this browser.";
  }
});
