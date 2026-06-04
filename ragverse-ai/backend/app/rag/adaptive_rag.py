# //works on the basis of query complexity

from app.services.retrieval import retrieve_chunks
from app.services.generation import generate_response

from app.rag.naive_rag import run_naive_rag
from app.rag.fusion_rag import fusion_rag
from app.rag.multihop_rag import multihop_rag
import time

def classify_query(query:str):

    query=query.lower()

    if any(
        keyword in query
        for keyword in [
            "compare",
            "difference",
            "advantages",
            "disadvantages"
        ]
    ):
        return "complex"

    elif any(
        keyword in query
        for keyword in [
            "architecture",
            "workflow",
            "pipeline",
            "implementation",
            "steps",
            "process"
        ]
    ):
        return "medium"

    return "simple"
def adaptive_rag(query:str):

    start_time=time.time()

    query_type=classify_query(query)

    if query_type=="simple":

        result=run_naive_rag(query)

        selected_strategy="naive_rag"

    elif query_type=="medium":

        result=fusion_rag(query)

        selected_strategy="fusion_rag"

    else:

        result=multihop_rag(query)

        selected_strategy="multihop_rag"

    adaptive_steps=[

        {
            "step":"Query Analysis",
            "data":{
                "query_type":query_type
            }
        },

        {
            "step":"Strategy Selection",
            "data":selected_strategy
        }

    ]

    result["pipeline_steps"]=(
        adaptive_steps
        +
        result.get(
            "pipeline_steps",
            []
        )
    )

    result["selected_strategy"]=(
        selected_strategy
    )

    result["rag_type"]="adaptive_rag"

    result["adaptive_time"]=round(
        time.time()-start_time,
        2
    )

    return result