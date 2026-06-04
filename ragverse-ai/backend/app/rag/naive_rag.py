import time
from app.services.retrieval import retrieve_chunks
from app.services.generation import generate_response

def run_naive_rag(query):
    start_time=time.time()
    retrival_start=time.time()
    retrieved_chunks=retrieve_chunks(query)
    retrieval_end=time.time()
    retrieval_time=round(retrieval_end-retrival_start,2)
    pipeline_steps=[]
    pipeline_steps.append({
        "step":"Original Query",
        "data":query
    })
    pipeline_steps.append(
        {
            "step":"Chunk Retrieval",
            "data":{
                "chunks_found":len(retrieved_chunks),
                "top_score":retrieved_chunks[0]["score"] if retrieved_chunks else 0
            }
        }
    )
    generation_start=time.time()
    answer=generate_response(
        query,
        retrieved_chunks
    )
    generation_end=time.time()
    generation_time=round(generation_end-generation_start,2)
    total_time=round(time.time()-start_time,2)
    return {
        "query":query,
        "retrieved_chunks":retrieved_chunks,
        "answer":answer,
        "rag_type":"naive_rag",
        "pipeline_steps":pipeline_steps,
        "metrics":{
            "retrieval_time":retrieval_time,
            "generation_time":generation_time,
            "total_time":total_time
        }
    }