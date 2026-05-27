from app.rag.naive_rag import run_naive_rag
from app.rag.hybrid_rag import hybrid_rag

def compare_rags(query: str):
    naive_result=run_naive_rag(query)
    hybrid_result=hybrid_rag(query)

    return {
        "naive_rag":naive_result,
        "hybrid_rag":hybrid_result
    }