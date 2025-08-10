from fastapi import FastAPI
from fastapi import HTTPException
from pydantic import BaseModel
import openai
from dotenv import load_dotenv
import os
from openai import OpenAI
import logging
from fastapi.middleware.cors import CORSMiddleware

# Logging = keeping track of input/output to debug better 
logging.basicConfig(
    filename="app.log",                        # Log file name
    level=logging.INFO,                        # Log INFO and above
    format="%(asctime)s - %(levelname)s - %(message)s"  # Log format
)
# Load the API key from the .env file
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any frontend for now. Change to specific domain later. allow_origins=["http://localhost:3000", "https://yourdomain.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the expected input from the user
class SymptomInput(BaseModel):
    symptoms: str

# Define an endpoint to process the symptoms
@app.post("/diagnose")
def diagnose(input: SymptomInput):
    logging.info(f"User input: {input.symptoms}")
    if not input.symptoms.strip():
        raise HTTPException(status_code=400, detail="Symptoms cannot be empty.")
    prompt = f"Given these symptoms: {input.symptoms}, what are some possible health conditions or suggestions? Explain clearly, and do not act as a doctor. First give some possible conditions with more detailed symptoms, then give some suggestions to feel better, finally explain which doctor or what medical help they should seek."

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful health assistant. You do not diagnose or replace a doctor."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.5,
        max_tokens=1000
    )

    result = response.choices[0].message.content
    logging.info(f"GPT response: {result}")
    return { "symptoms": input.symptoms,
        "ai_summary": result,
        "disclaimer": "This is AI-generated health information and not a medical diagnosis."
    }
