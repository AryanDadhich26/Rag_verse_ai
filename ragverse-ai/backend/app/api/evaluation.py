from fastapi import APIRouter

from app.evaluation.evaluator import evaluate_response
from app.rag.naive_rag import run_naive_rag
from app.rag.hybrid_rag import hybrid_rag
from app.rag.fusion_rag import fusion_rag
from app.rag.graph_rag import graph_rag

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