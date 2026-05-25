#store embeddings in chroma DB
import chromadb
client=chromadb.PersistentClient(path='./chroma_db')#database stored locally on disk
collection=client.get_or_create_collection(
    name='ragverse_documents'
)#created a table inside chromadb
def store_embeddings(chunks,embeddings):
    ids = [str(i) for i in range(len(chunks))]

    embeddings = embeddings.tolist()

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings
    )