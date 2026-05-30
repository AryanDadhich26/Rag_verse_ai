from fastapi import APIRouter

from app.evaluation.evaluator import evaluate_response
from app.rag.naive_rag import run_naive_rag
from app.rag.hybrid_rag import hybrid_rag
from app.rag.fusion_rag import fusion_rag
from app.rag.graph_rag import graph_rag
# from app.evaluation.ragas_evaluator import (evaluate_with_ragas)
from app.evaluation.judge_evaluator import evaluate_answer,evaluate_quality_response
from app.evaluation.benchmark_queries import (
    TEST_QUERIES
)
router = APIRouter()


@router.post("/evaluate-all")
def evaluate_all():

    query = "What is style transfer?"

    responses = [

        run_naive_rag(query),

        hybrid_rag(query),

        fusion_rag(query),

        graph_rag(query)

    ]

    results = [

        evaluate_response(response)

        for response in responses

    ]

    return results

# @router.post("/ragas-text")
# def ragas_test():
#     contexts=["Style transfer is a computer vision technique","NST uses deep neural networks."]
#     result=evaluate_with_ragas(
#         question="What is style transfer?",
#         answer="Style transfer is a technique that transfers artistic style from one image to another.",
#         contexts=contexts
#     )

#     return result

@router.post("/evalute-quality")
def evaluate_quality():

    response=run_naive_rag(
        "What is style transfer"
    )

    contexts=[
        chunk["chunk"]

        for chunk in response[
            "retrieved_chunks"
        ]
    ]

    result=evaluate_answer(
        question=response["query"],
        answer=response["answer"],
        contexts=contexts
    )

    return result

@router.post("/evaluate-quality-all")
def evaluate_quality_all():

    query = "What is style transfer?"

    responses = [

        run_naive_rag(query),

        hybrid_rag(query),

        fusion_rag(query),

        graph_rag(query)

    ]

    results = [

        evaluate_quality_response(
            response
        )

        for response in responses
    ]

    return results

def average_scores(results):

    count = len(results)

    return {

        "relevance":
        round(
            sum(r["relevance"] for r in results)
            / count,
            2
        ),

        "faithfulness":
        round(
            sum(r["faithfulness"] for r in results)
            / count,
            2
        ),

        "completeness":
        round(
            sum(r["completeness"] for r in results)
            / count,
            2
        ),

        "overall_score":
        round(
            sum(r["overall_score"] for r in results)
            / count,
            2
        )
    }

@router.post("/evaluate-quality-benchmark")
def evaluate_quality_benchmark():

    rag_functions = {

        "naive_rag":
        run_naive_rag,

        "hybrid_rag":
        hybrid_rag,

        "fusion_rag":
        fusion_rag,

        "graph_rag":
        graph_rag

    }

    leaderboard = []

    for rag_name, rag_function in rag_functions.items():

        query_results = []

        for query in TEST_QUERIES:

            response = rag_function(
                query
            )

            evaluation = (
                evaluate_quality_response(
                    response
                )
            )

            query_results.append(
                evaluation
            )

        avg_scores = average_scores(
            query_results
        )

        leaderboard.append({

            "rag_type":
            rag_name,

            **avg_scores

        })

    leaderboard.sort(

        key=lambda x:
        x["overall_score"],

        reverse=True
    )

    return leaderboard