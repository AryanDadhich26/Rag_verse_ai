import time

from app.services.retrieval import retrieve_chunks
from app.services.bm25_retrieval import bm25_search
from app.services.generation import generate_response

def self_rag(query: str):
    total_start=time.time()
    retrieval_start=time.time()

    retrieved_chunks=retrieve_chunks(
        query=query,
        top_k=3
    )

    retrieval_time=round(time.time()-retrieval_start,2)

    generation_start=time.time()

    answer=generate_response(
        query,
        retrieved_chunks
    )

    reflection="accepted"
    second_attempt=False

    weak_phrases=[
        "i could not find",

        "not enough information",

        "no relevant information"
    ]

    answer_lower=answer.lower()

    for phrase in weak_phrases:
        if phrase in answer_lower:
            second_attemp=True
            reflection="retry_triggered"
            break

    if second_attempt:
        dense_results=retrieve_chunks(
            query=query,
            top_k=5
        )

        bm25_results=bm25_search(query)

        combined_results=dense_results+bm25_results
        unique_chunks = {}


        for item in combined_results:

            chunk_text = item["chunk"]


            if chunk_text not in unique_chunks:

                unique_chunks[chunk_text] = item


        final_chunks = list(unique_chunks.values())


        answer = generate_response(

            query,
            final_chunks
        )
    else:
        final_chunks=retrieved_chunks
    generation_time=round(time.time()-generation_start,2)
    total_time=round(time.time()-total_start,2)

    return{
        "query": query,

        "retrieved_chunks": final_chunks,

        "answer": answer,

        "rag_type": "self_rag",

        "reflection": reflection,

        "second_attempt_used": second_attempt,

        "metrics": {

            "retrieval_time": retrieval_time,

            "generation_time": generation_time,

            "total_time": total_time
        }
    }
