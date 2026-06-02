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
def reciprocal_rank_fusion(results_lists):
    fused_scores={}
    k=60

    for results in results_lists:
        for rank, item in enumerate(results):
            chunk=item["chunk"]

            if chunk not in fused_scores:
                fused_scores[chunk]=0

            fused_scores[chunk]+=1/(k+rank+1)
    return fused_scores

def fusion_rag(query: str):
    total_start=time.time()
    retrieval_start=time.time()
    query_variations=generate_query_variations(query)
    pipeline_steps=[]

    pipeline_steps.append(
        {
            "step":"Original Query",
            "data":query
        }
    )

    pipeline_steps.append(
        {
            "step":"Generated Query Variations",
            "data":query_variations
        }
    )

    results_lists=[]
    retrieval_logs=[]

    for q in query_variations:
        results=retrieve_chunks(
            query=q,
            top_k=2
        )

        results_lists.append(results)
        retrieval_logs.append({
            "query":q,
            "chunks_found":len(results),
            "top_score":round(results[0]["score"],3) if results else 0
        })
    fused_scores=reciprocal_rank_fusion(
        results_lists
    )
    pipeline_steps.append(
        {
            "step":"Retrieval Results",
            "data":retrieval_logs
        }
    )
    sorted_chunks=sorted(
        fused_scores.items(),
        key=lambda x:x[1],
        reverse=True
    )
    final_chunks=[]

    for chunk_text, score in sorted_chunks[:5]:
        final_chunks.append({
            "chunk":chunk_text,
            "fusion_score":round(score,4)
        })

    pipeline_steps.append(
        {
            "step":"RRF Ranking",
            "data":[
                {
                    "chunk_preview":chunk["chunk"][:80]+"...",

                    "funsion_score":chunk["fusion_score"]
                }

                for chunk in final_chunks
            ]
        }
    )
    # unique_chunks={}
    # for item in all_results:

    #     chunk_text = item["chunk"]


    #     if chunk_text not in unique_chunks:

    #         unique_chunks[chunk_text] = item


    # final_chunks = list(unique_chunks.values())
    pipeline_steps.append(
        {
            "step":"Final context chunks",
            "data":len(final_chunks)

        }
    )

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

        "fusion_method": "RRF",

        "retrieved_chunks": final_chunks,

        "answer": answer,

        "rag_type": "fusion_rag",
        "pipeline_steps":pipeline_steps,

        "metrics": {

            "retrieval_time": retrieval_time,

            "generation_time": generation_time,

            "total_time": total_time

        }
    }