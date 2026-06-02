import time

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from app.services.retrieval import retrieve_chunks
from app.services.generation import generate_response

rerank_model=SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def rerank_chunks(query,chunks):
    query_embedding=rerank_model.encode([query])
    scored_chunks=[]

    for chunk in chunks:
        chunk_embedding=rerank_model.encode(
            [chunk["chunk"]]
        )

        similarity=cosine_similarity(
            query_embedding,
            chunk_embedding
        )[0][0]

        chunk["rerank_score"]=float(
            round(similarity,3)
        )
        scored_chunks.append(chunk)

    scored_chunks.sort(
        key=lambda x: x["rerank_score"],

        reverse=True
    )

    return scored_chunks
def rerank_rag(query: str):
    total_start=time.time()
    retrieval_start = time.time()
    pipeline_steps=[]
    pipeline_steps.append(
        {
            "Step":"Original Query",
            "data":query
        }
    )

    # Retrieve more chunks initially

    retrieved_chunks = retrieve_chunks(

        query=query,

        top_k=8

    )

    pipeline_steps.append(
        {
            "step":"Initial Retrieval",
            "data":{
                "chunk_found":len(retrieved_chunks)
            }
        }
    )


    # Re-rank chunks

    reranked_chunks = rerank_chunks(

        query,

        retrieved_chunks

    )
    rerank_data=[]

    for chunk in reranked_chunks:
        rerank_data.append(
            {
                "score":chunk["rerank_score"],
                "preview":chunk["chunk"][:80]+"..."
            }
        )
    pipeline_steps.append(
        {
            "step":"Reranking Scores",
            "data":rerank_data
        }
    )


    # Take top reranked chunks

    final_chunks = reranked_chunks[:5]
    pipeline_steps.append(
        {
            "step":"Top Chunks Selected",
            "data":[
                {
                    "score":chunk["rerank_score"]
                }
                for chunk in final_chunks
            ]
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

        "retrieved_chunks": final_chunks,

        "answer": answer,

        "rag_type": "rerank_rag",
        "pipeline_steps":pipeline_steps,

        "metrics": {

            "retrieval_time": retrieval_time,

            "generation_time": generation_time,

            "total_time": total_time

        }

    }

