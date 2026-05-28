import time

from app.services.retrieval import retrieve_chunks
from app.services.generation import generate_response

def generate_query_variations(query:str):
    variations=[
        query,
        f"What is {query}?",
        f"Explain {query}?",
        f"Detailed explanation of {query}?",
        f"{query} workflow"
    ]

    return variations

def fusion_rag(query: str):
    total_start=time.time()
    retrieval_start=time.time()
    query_variations=generate_query_variations(query)

    all_results=[]

    for q in query_variations:
        results=retrieve_chunks(
            query=q,
            top_k=2
        )

        all_results.extend(results)

    unique_chunks={}
    for item in all_results:

        chunk_text = item["chunk"]


        if chunk_text not in unique_chunks:

            unique_chunks[chunk_text] = item


    final_chunks = list(unique_chunks.values())


    retrieval_time = round(

        time.time() - retrieval_start,

        2

    )
    generation_start = time.time()


    answer = generate_response(

        query,

        final_chunks

    )


    generation_time = round(

        time.time() - generation_start,

        2

    )
    total_time = round(

        time.time() - total_start,

        2

    )


    return {

        "query": query,

        "query_variations": query_variations,

        "retrieved_chunks": final_chunks,

        "answer": answer,

        "rag_type": "fusion_rag",
         "metrics": {

            "retrieval_time": retrieval_time,

            "generation_time": generation_time,

            "total_time": total_time

        }
    }