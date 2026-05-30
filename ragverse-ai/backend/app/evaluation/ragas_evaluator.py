# from datasets import Dataset
# from ragas import evaluate

# from ragas.metrics import (answer_relevency,context_precision,context_recall,faithfulness)

# def evaluate_with_ragas(question, answer, contexts):
#     dataset=Dataset.from_dict({
#         "question":[question],
#         "answer":[answer],
#         "contexts":[contexts]
#     })

#     result=evaluate(dataset,metrics=[answer_relevency,context_precision,context_recall,faithfulness])
#     return result