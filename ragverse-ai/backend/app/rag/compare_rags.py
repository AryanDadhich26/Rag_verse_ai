from app.rag.naive_rag import run_naive_rag
from app.rag.hybrid_rag import hybrid_rag
from app.rag.fusion_rag import fusion_rag
from app.rag.graph_rag import graph_rag
from app.rag.multihop_rag import multihop_rag
from app.rag.rerank_rag import rerank_rag
from app.rag.adaptive_rag import adaptive_rag
from app.rag.agentic_rag import agentic_rag
from app.rag.self_rag import self_rag
from app.rag.corrective_rag import corrective_rag

def compare_rags(query:str):

    results = {}

    rag_systems = {

        "naive_rag": run_naive_rag,

        "hybrid_rag": hybrid_rag,

        "fusion_rag": fusion_rag,

        "graph_rag": graph_rag,

        "multihop_rag": multihop_rag,

        "rerank_rag": rerank_rag,

        "adaptive_rag": adaptive_rag,

        "agentic_rag": agentic_rag,

        "self_rag": self_rag,

        "corrective_rag": corrective_rag
    }

    for rag_name, rag_function in rag_systems.items():

        try:

            results[rag_name] = rag_function(query)

        except Exception as e:

            results[rag_name] = {
                "answer": f"ERROR: {str(e)}",
                "retrieved_chunks": [],
                "metrics": {
                    "retrieval_time": 0,
                    "generation_time": 0,
                    "total_time": 0
                }
            }

    return results