from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from youtube_script import get_youtube_script

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check_handler():
    return {"ping": "pong"}

@app.get("/youtube/{video_id}")
def youtube_script(video_id: str):
    script = get_youtube_script(video_id)
    return script