import networkx as nx
import spacy
nlp=spacy.load(
    "en_core_web_sm"
)
def build_graph(chunks):
    graph=nx.Graph()
    for chunk in chunks:
        doc = nlp(chunk)

        entities = list(
            dict.fromkeys(
                [
                    ent.text.strip()
                    for ent in doc.ents
                ]
            )
        )

        for i in range(len(entities)-1):
            graph.add_edge(
                entities[i],entities[i+1]
            )
    return graph

def graph_search(graph,query):
    results=[]

    for node in graph.nodes:
        query_words=query.lower().split()
        for word in query_words:
            if word in node.lower():
                results.append(node)
                break
    return results