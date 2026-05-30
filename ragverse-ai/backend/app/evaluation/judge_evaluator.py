import json

from app.services.llm_service import llm

def evaluate_answer(question, answer, contexts):
    context_text="\n\n".join(contexts)
    prompt=f"""
    You are an expert evaluator for Retrieval-Augmented Generation (RAG) systems.

    Question:
    {question}

    Retrieved Context:
    {context_text}

    Generated Answer:
    {answer}

    Evaluate the answer on a scale of 1-10.

    Criteria:

    1. Relevance
    How well does the answer address the question?

    2. Faithfulness
    Does the answer stay grounded in the provided context?

    3. Completeness
    Does the answer cover the important information?

    Return ONLY valid JSON.
    Do not use markdown.
    Do not use ```json blocks.
    Do not provide explanations.

    Example:

    {{
        "relevance": 9,
        "faithfulness": 8,
        "completeness": 9,
        "overall_score": 8.7
    }}
    """

    response=llm.invoke(prompt)
    try:
        content=response.content.strip()
        if"```json" in content:
            content = content.replace(
            "```json",
            ""
            )

            content = content.replace(
                "```",
                ""
            )

        return json.loads(
            content.strip()
        )
    except Exception:
        return {
            "relevance": 0,

            "faithfulness": 0,

            "completeness": 0,

            "overall_score": 0,

            "raw_response":
            response.content
        }

def evaluate_quality_response(response):
    contexts=[
        chunk["chunk"]
        for chunk in response.get(
            "retrieved_chunks",
            []
        )
    ]

    scores=evaluate_answer(
        question=response["query"],
        answer=response["answer"],
        contexts=contexts
    )

    return {
        "rag_type":response["rag_type"],
        **scores
    }