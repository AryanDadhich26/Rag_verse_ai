from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.upload import router as upload_router
from app.api.query import router as query_router
from app.api.evaluation import router as evaluation_router
app=FastAPI(title='RAGVerse AI')
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)
@app.get("/")
def home():
    return {"message": "RAGVerse AI Backend Running"}
app.include_router(upload_router)
app.include_router(query_router)
app.include_router(evaluation_router)