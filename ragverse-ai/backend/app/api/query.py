from fastapi import APIRouter
from pydantic import BaseModel

from app.rag.naive_rag import run_naive_rag
from app.rag.hybrid_rag import hybrid_rag
from app.rag.compare_rags import compare_rags
from app.rag.adaptive_rag import adaptive_rag
from app.rag.agentic_rag import agentic_rag
from app.rag.corrective_rag import corrective_rag
from app.rag.self_rag import self_rag
from app.rag.fusion_rag import fusion_rag
from app.rag.rerank_rag import rerank_rag
from app.rag.multihop_rag import multihop_rag
from app.rag.graph_rag import graph_rag
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
@router.post("/agentic-query")

def agentic_query(request: QueryRequest):
    result=agentic_rag(request.query)
    return result
@router.post("/corrective-query")

def corrective_query(request: QueryRequest):
    result=corrective_rag(request.query)
    return result
@router.post("/self-query")

def self_query(request: QueryRequest):
    result=self_rag(request.query)
    return result
@router.post("/fusion-query")

def fusion_query(request: QueryRequest):
    result=fusion_rag(request.query)
    return result
@router.post("/rerank-query")

def rerank_query(request: QueryRequest):
    result=rerank_rag(request.query)
    return result
@router.post("/multihop-query")

def multihop_query(request: QueryRequest):
    result=multihop_rag(request.query)
    return result
@router.post("/graph-query")

def graph_query(request: QueryRequest):
    result=graph_rag(request.query)
    return result