import time

from app.services.retrieval import retrieve_chunks
from app.services.bm25_retrieval import bm25_search
from app.services.generation import generate_response


def corrective_rag(query: str):

    total_start = time.time()

    retrieval_start = time.time()

    pipeline_steps = []

    dense_results = retrieve_chunks(
        query=query,
        top_k=3
    )

    pipeline_steps.append(
        {
            "step": "Dense Retrieval",
            "data": {
                "chunks_found":
                len(dense_results)
            }
        }
    )

    retrieval_method = "dense"

    low_confidence = False

    for chunk in dense_results:

        if chunk["score"] < 0.3:

            low_confidence = True

            break

    pipeline_steps.append(
        {
            "step": "Confidence Check",
            "data": {
                "low_confidence":
                low_confidence
            }
        }
    )

    if low_confidence:

        bm25_results = bm25_search(
            query
        )

        combined_results = (
            dense_results +
            bm25_results
        )

        unique_chunks = {}

        for item in combined_results:

            chunk_text = item["chunk"]

            if (
                chunk_text
                not in unique_chunks
            ):
                unique_chunks[
                    chunk_text
                ] = item

        final_chunks = list(
            unique_chunks.values()
        )

        retrieval_method = (
            "corrective_hybrid"
        )

        pipeline_steps.append(
            {
                "step":
                "Corrective Retrieval",

                "data": {

                    "dense_chunks":
                    len(dense_results),

                    "bm25_chunks":
                    len(bm25_results),

                    "final_chunks":
                    len(final_chunks)
                }
            }
        )

    else:

        final_chunks = dense_results

    retrieval_time = round(
        time.time() -
        retrieval_start,
        2
    )

    generation_start = time.time()

    answer = generate_response(
        query,
        final_chunks
    )

    pipeline_steps.append(
        {
            "step":
            "Answer Generation",

            "data":
            retrieval_method
        }
    )

    generation_time = round(
        time.time() -
        generation_start,
        2
    )

    total_time = round(
        time.time() -
        total_start,
        2
    )

    return {

        "query": query,

        "retrieved_chunks":
        final_chunks,

        "answer": answer,

        "rag_type":
        "corrective_rag",

        "retrieval_strategy":
        retrieval_method,

        "low_confidence_detected":
        low_confidence,

        "pipeline_steps":
        pipeline_steps,

        "metrics": {

            "retrieval_time":
            retrieval_time,

            "generation_time":
            generation_time,

            "total_time":
            total_time
        }
    }