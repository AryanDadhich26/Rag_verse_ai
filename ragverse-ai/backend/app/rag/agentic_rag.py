import time

from app.rag.naive_rag import run_naive_rag
from app.rag.hybrid_rag import hybrid_rag
from app.rag.adaptive_rag import adaptive_rag

def decide_strategy(query: str):

    query=query.lower()

    if any(word in query for word in [
        "compare",
        "difference",
        "architecture",
        "workflow",
        "pipeline"]):

        return "adaptive"
    elif any(word in query for word in [

        "exact",
        "define",
        "meaning",
        "term"

    ]):

        return "hybrid"   

    return "naive"  

def agentic_rag(query: str):
    total_start=time.time()

    selected_strategy=decide_strategy(query)
    pipeline_steps=[]

    pipeline_steps.append(
        {
            "step":"Task Analysis",
            "data":{"query":query}        }
    )

    pipeline_steps.append(
        {
            "step":"Strategy Decision",
            "data":{"selected_strategy":selected_strategy}
        }
    )
    if selected_strategy == "adaptive":

        result = adaptive_rag(query)


    elif selected_strategy == "hybrid":

        result = hybrid_rag(query)


    else:

        result = run_naive_rag(query)

    result["pipeline_steps"] = (
        pipeline_steps
        +
        result.get(
            "pipeline_steps",
            []
        )
    )

    total_time=round(time.time()-total_start,2)

    result["agent_decision"]=selected_strategy
    result["rag_type"]="agentic_rag"
    result["metrics"]["total_time"]=total_time

    return result


