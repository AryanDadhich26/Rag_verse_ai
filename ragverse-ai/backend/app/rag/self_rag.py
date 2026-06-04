import time

from app.services.retrieval import retrieve_chunks
from app.services.bm25_retrieval import bm25_search
from app.services.generation import generate_response


def self_rag(query: str):

    total_start = time.time()

    retrieval_start = time.time()

    pipeline_steps = []

    retrieved_chunks = retrieve_chunks(
        query=query,
        top_k=3
    )

    pipeline_steps.append(
        {
            "step": "Initial Retrieval",
            "data": {
                "chunks_found":
                len(retrieved_chunks)
            }
        }
    )

    retrieval_time = round(
        time.time() - retrieval_start,
        2
    )

    generation_start = time.time()

    answer = generate_response(
        query,
        retrieved_chunks
    )

    pipeline_steps.append(
        {
            "step": "Initial Generation",
            "data": "answer_generated"
        }
    )

    reflection = "accepted"

    second_attempt = False

    weak_phrases = [

        "i could not find",

        "not enough information",

        "no relevant information",

        "insufficient context",

        "cannot determine",

        "unable to answer"
    ]

    answer_lower = answer.lower()

    for phrase in weak_phrases:

        if phrase in answer_lower:

            second_attempt = True

            reflection = "retry_triggered"

            break

    pipeline_steps.append(
        {
            "step": "Self Reflection",
            "data": {
                "reflection":
                reflection,

                "retry_needed":
                second_attempt
            }
        }
    )

    if second_attempt:

        dense_results = retrieve_chunks(
            query=query,
            top_k=5
        )

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

        answer = generate_response(
            query,
            final_chunks
        )

        pipeline_steps.append(
            {
                "step":
                "Regeneration",

                "data":
                "second_answer_generated"
            }
        )

    else:

        final_chunks = (
            retrieved_chunks
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
        "self_rag",

        "reflection":
        reflection,

        "second_attempt_used":
        second_attempt,

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