import os

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

llm=ChatOpenAI(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    base_url=os.getenv("GROQ_BASE_URL"),
    temperature=0.3
)
