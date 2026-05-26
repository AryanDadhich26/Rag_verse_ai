from sentence_transformers import SentenceTransformer
from app.services.vector_store import collection

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def retrieve_chunks(query:str, top_k: int=3):
    query_embedding = embedding_model.encode(query).tolist()

    results=collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    documents=results["documents"][0]
    distances=results["distances"][0]

    retrieved_chunks=[]
    for doc,distance in zip(documents, distances):
        similarity_score = round(1-distance, 3)

        retrieved_chunks.append({
            "chunk": doc,
            "score": similarity_score
        })
    return retrieved_chunks