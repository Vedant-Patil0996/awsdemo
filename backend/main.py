from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

app = FastAPI()

# ⚠️ CRITICAL: Allow your React app to talk to this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all connections (Safe for Hackathon)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {
        "status": "Online",
        "message": "AWS Lambda is successfully connected to React!",
        "score_test": 0.99
    }

# This is the entry point for AWS Lambda
handler = Mangum(app)