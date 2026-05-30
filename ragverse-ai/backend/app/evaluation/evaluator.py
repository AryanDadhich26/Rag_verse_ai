from app.evaluation.metrics import calculate_latency_score

def evaluate_response(response):
    metrics=response["metrics"]
    latency_score=calculate_latency_score(metrics["retrieval_time"],metrics["generation_time"])
    answer_length=len(response.get("answer",""))
    chunk_count=len(response.get("retrieved_chunks",[]))

    return {
        "rag_type":response["rag_type"],
        "latency_score":
        latency_score,
        "answer_length":answer_length,
        "chunk_count":chunk_count,

        "retrieval_time":
        metrics["retrieval_time"],

        "generation_time":
        metrics["generation_time"],

        "total_time":
        metrics["total_time"]
    }