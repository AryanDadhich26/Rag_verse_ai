from app.services.llm_service import llm
def generate_response(query, retrieved_chunks):
    context="\n\n".join([item["chunk"] for item in retrieved_chunks])
    prompt = f"""
        You are an intelligent AI assistant.

        Answer ONLY from the provided context.

        If the answer is not present in the context,
        say:
        "I could not find relevant information."

        Context:
        {context}

        Question:
        {query}

        Answer:
        """
    response=llm.invoke(prompt)
    return response.content