from rank_bm25 import BM25Okapi
from app.services.vector_store import collection

def bm25_search(query: str, top_k: int = 3):
    results=collection.get()

    documents = results["documents"]

    tokenized_docs=[
        doc.lower().split()
        for doc in documents
    ]

    bm25 = BM25Okapi(tokenized_docs)

    tokenized_query= query.lower().split()

    scores = bm25.get_scores(tokenized_query)

    ranked_results = sorted(
        zip(documents, scores),
        key= lambda x:x[1],
        reverse=True
    )

    final_results = []

    for doc , score in ranked_results[:top_k]:
        final_results.append({
            "chunk":doc,
            "score": round(float(score), 3)
        })

    return final_results