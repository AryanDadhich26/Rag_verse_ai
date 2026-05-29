import networkx as nx


def build_graph(chunks):
    graph=nx.Graph()
    for chunk in chunks:
        words=chunk.split()
        entities=[]
        for word in words:
            clean_words=word.strip(
                ".,;:!()[]{}"
            )

            if (
                clean_words.istitle()
                and len(clean_words)>3
            ):
                entities.append(clean_words)

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