import time

from app.services.retrieval import retrieve_chunks
from app.services.generation import generate_response

def generate_followup_query(query):
    prompt = f"""
    User question:

    {query}

    Generate a related follow-up search query
    that would help retrieve additional information.
    Only return the query.
    """

    return generate_response(
        prompt,
        []
    ).strip()

def multihop_rag(query:str):
    total_start=time.time()
    retrieval_start=time.time()

    hop1_chunks=retrieve_chunks(
        query=query,
        top_k=3
    )

    followup_query=generate_followup_query(
        query
    )
    pipeline_steps=[]

    pipeline_steps.append({
        "step":"Original Query",
        "data":query
    })

    pipeline_steps.append(
        {
            "step":"Hop 1 retrieval",
            "data":{
                "chunks_found":len(hop1_chunks)
            }
        }
    )

    if (
        not followup_query
        or "could not find" in followup_query.lower()
    ):
        followup_query = (
            query +
            " architecture workflow implementation"
        )
    pipeline_steps.append(
        {
            "step":"Generated Follow-Up query",
            "data":followup_query
        }
    )
    hop2_chunks=retrieve_chunks(
        query=followup_query,
        top_k=3
    )
    pipeline_steps.append(
        {
            "step":"Hop 2 Retrieval",
            "data":{
                "chunks_found":len(hop2_chunks)
            }
        }
    )
    combined_chunks=hop1_chunks+hop2_chunks
    unique_chunks = {}

    for chunk in combined_chunks:

        text = chunk["chunk"]

        if text not in unique_chunks:

            unique_chunks[text] = chunk

    final_chunks = list(
        unique_chunks.values()
    )

    pipeline_steps.append(
        {
            "step":"Merged Context",
            "data":len(final_chunks)
        }
    )
    retrieval_time=round(time.time()-retrieval_start,3)
    generation_start=time.time()

    answer=generate_response(
        query,
        final_chunks
    )
    generation_time=round(time.time()-generation_start,2)
    total_time=round(time.time()-total_start,2)
    return {
        "query": query,
        "followup_query": followup_query,
        "hop1_chunks": len(hop1_chunks),
        "hop2_chunks": len(hop2_chunks),
        "retrieved_chunks": final_chunks,
        "answer": answer,
        "rag_type": "multihop_rag",
        "pipeline_steps":pipeline_steps,
        "metrics": {
            "retrieval_time": retrieval_time,

            "generation_time": generation_time,

            "total_time": total_time
        }
    }