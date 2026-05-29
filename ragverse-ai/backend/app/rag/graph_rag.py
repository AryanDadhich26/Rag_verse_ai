import time

from app.services.retrieval import retrieve_chunks
from app.services.generation import generate_response

from app.services.graph_builder import (build_graph,graph_search)

def graph_rag(query: str):
    start_time=time.time()
    chunks=retrieve_chunks(query=query,top_k=10)
    retrieval_time=round(time.time()-start_time,2)
    chunk_texts=[chunk["chunk"] for chunk in chunks]

    graph=build_graph(chunk_texts)

    matched_nodes=graph_search(
        graph,
        query
    )

    graph_context=[]

    for node in matched_nodes:
        neighbors=list(
            graph.neighbors(node)
        )

        graph_context.append(
            {
                "chunk":f"{node} is connected to {', '.join(neighbors)}"
            }
        )
    graph_context.extend(chunks[:3])
    generation_start=time.time()
    answer=generate_response(
        query,
        graph_context
    )
    generation_time=round(time.time()-generation_start,2)
    total_time=round(time.time()-start_time,2)
    node_count = len(
        graph.nodes
    )

    edge_count = len(
        graph.edges
    )
    return {
        "query":query,
        "matched_nodes":matched_nodes,
        "graph_context":graph_context,
        "retrieved_chunks":chunks,
        "answer":answer,
        "rag_type":"graph_rag",
        "metrics":{
            "retrieval_time":retrieval_time,
            "generation_time":generation_time,
            "total_time":total_time
        },
        "graph_stats":{
            "nodes":node_count,
            "edges":edge_count
        }
    }