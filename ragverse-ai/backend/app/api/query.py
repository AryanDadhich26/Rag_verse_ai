from fastapi import APIRouter
from pydantic import BaseModel

from app.rag.naive_rag import run_naive_rag
from app.rag.hybrid_rag import hybrid_rag
from app.rag.compare_rags import compare_rags
from app.rag.adaptive_rag import adaptive_rag
router=APIRouter()

class QueryRequest(BaseModel):
    query: str

@router.post("/query")
async def query_rag(request: QueryRequest):
    result=run_naive_rag(
        request.query
    )

    return result

@router.post("/hybrid-query")

def hybrid_query(request: QueryRequest):

    result=hybrid_rag(request.query)
    return result

@router.post("/compare-rags")

def compare_rag_query(request: QueryRequest):
    result=compare_rags(request.query)
    return result
@router.post("/adaptive-query")

def adaptive_query(request: QueryRequest):
    result=adaptive_rag(request.query)
    return result