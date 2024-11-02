from fastapi import FastAPI
from transformers import pipeline
from pydantic import BaseModel
from const import MAX_TOKENS

app = FastAPI()
star_model = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-sentiment")
emotion_model = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")


class SentimentRequest(BaseModel):
    text: str


def truncate_text(text, max_tokens):
    tokens = text.split()  # Split by whitespace (simple tokenization)
    if len(tokens) > max_tokens:
        tokens = tokens[:max_tokens]  # Truncate to max_tokens
    return " ".join(tokens)


@app.post("/analyze-sentiment")
async def analyze_sentiment(request: SentimentRequest):
    truncated_text = truncate_text(request.text, MAX_TOKENS)
    
    # 1-5 star sentiment analysis:
    star_result = star_model(truncated_text)[0]
    print('star_rating:', star_result)

    # Emotion detection analysis:
    emotion_result = emotion_model(truncated_text)
    print('emotion:', emotion_result)

    return {
        "star_rating": star_result,
        "emotion": emotion_result
    }
