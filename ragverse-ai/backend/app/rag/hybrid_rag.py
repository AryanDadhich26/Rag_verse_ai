import time
from app.services.retrieval import retrieve_chunks
from app.services.bm25_retrieval import bm25_search
from app.services.generation import generate_response

def hybrid_rag(query: str):
    total_start=time.time()
    retrival_start=time.time()
    dense_results = retrieve_chunks(query)
    bm25_results = bm25_search(query)

    combined_results=dense_results+bm25_results

    unique_chunks={}
    for item in combined_results:
        chunk_text=item["chunk"]
        if chunk_text not in unique_chunks:
            unique_chunks[chunk_text]=item

        final_chunks=list(unique_chunks.values())
        retrieval_time=round(time.time()-retrival_start,2)
        generation_start=time.time()
        answer=generate_response(
            query,
            final_chunks
        )
        generation_time=round(time.time()-generation_start,2)
        total_time=round(time.time()-total_start,2)
        return {
            "query":query,
            "retrieved_chunks":final_chunks,
            "answer":answer,
            "rag_type":"hybrid_rag",
            "metrics":{
                "retrieval_time": retrieval_time,

                "generation_time": generation_time,

                "total_time": total_time
            }
        }