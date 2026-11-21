import os
from functools import lru_cache
from typing import Any

import spacy
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Latin NLP service", version="0.1.0")
MODEL_NAME = os.getenv("LATINCY_MODEL", "la_core_web_lg")


class AnalyzeRequest(BaseModel):
    text: str = Field(min_length=1, max_length=2000)


@lru_cache(maxsize=1)
def load_model() -> Any:
    return spacy.load(MODEL_NAME)


@app.get("/health")
def health() -> dict[str, str]:
    try:
        load_model()
        model_status = "ready"
    except (OSError, ImportError):
        model_status = "not_installed"
    return {"status": "ok", "model": MODEL_NAME, "model_status": model_status}


@app.post("/analyze")
def analyze(request: AnalyzeRequest) -> dict[str, Any]:
    try:
        nlp = load_model()
    except (OSError, ImportError) as error:
        raise HTTPException(
            status_code=503,
            detail=f"LatinCy model '{MODEL_NAME}' is not installed. Install it before analyzing sentences.",
        ) from error

    doc = nlp(request.text)
    return {
        "provider": "spacy",
        "model": MODEL_NAME,
        "text": request.text,
        "tokens": [
            {
                "position": index,
                "text": token.text,
                "lemma": token.lemma_,
                "partOfSpeech": token.pos_,
                "morphology": str(token.morph),
                "dependency": token.dep_,
                "headPosition": token.head.i,
            }
            for index, token in enumerate(doc)
        ],
    }
