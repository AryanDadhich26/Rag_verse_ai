# //works on the basis of query complexity

from app.services.retrieval import retrieve_chunks
from app.services.generation import generate_response
import time

def classify_query(query: str):
    query=query.lower()

    complex_keyword=["compare",
        "difference",
        "architecture",
        "advantages",
        "disadvantages",
        "explain in detail",
        "pipeline",
        "workflow"
        ]
    for keyword in complex_keyword:
         if keyword in query:
            return "complex"
    return "simple"
def adaptive_rag(query:str):
    start_time=time.time()
    query_type=classify_query(query)

    retrieval_start=time.time()

    if query_type=="simple":
        top_k=2
    else:
        top_k=5
    retrieved_chunks=retrieve_chunks(
        query=query,
        top_k=top_k
    )

    retrieval_end=time.time()
    generation_start=time.time()

    

    answer=generate_response(
        query=query,
        retrieved_chunks=retrieved_chunks
    )

    generation_end=time.time()

    total_end=time.time()

    return {
        "query":query,
        "query_type":query_type,
        "chunks_used":top_k,
        "retrieved_chunks":retrieved_chunks,
        "answer":answer,
        "rag_type":"adaptive_rag",
        "metrics": {

            "retrieval_time": round(
                retrieval_end - retrieval_start,
                2
            ),

            "generation_time": round(
                generation_end - generation_start,
                2
            ),

            "total_time": round(
                total_end - start_time,
                2
            )
        }

    }
