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

    retrieved_chunks=results["documents"][0]
    return retrieved_chunks