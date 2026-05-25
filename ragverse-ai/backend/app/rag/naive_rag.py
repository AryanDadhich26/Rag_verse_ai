from app.services.retrieval import retrieve_chunks
from app.services.generation import generate_response

def run_naive_rag(query):
    retrieved_chunks=retrieve_chunks(query)

    answer=generate_response(
        query,
        retrieved_chunks
    )

    return {
        "query":query,
        "retrieved_chunks":retrieved_chunks,
        "answer":answer
    }