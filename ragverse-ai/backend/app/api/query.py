from fastapi import APIRouter
from pydantic import BaseModel

from app.rag.naive_rag import run_naive_rag

router=APIRouter()

class QueryRequest(BaseModel):
    query: str

@router.post("/query")
async def query_rag(request: QueryRequest):
    result=run_naive_rag(
        request.query
    )

    return result