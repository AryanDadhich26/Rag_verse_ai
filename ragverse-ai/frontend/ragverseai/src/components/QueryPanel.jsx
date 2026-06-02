import { useState } from "react";
import axios from "axios"

function QueryPanel({setResponseData,queryHistory,setQueryHistory,setComparisonData,setEvaluationData, setBenchmarkData}){
    const [query, setQuery]=useState("");
    const [selectedRag, setSelectedRag]=useState("naive");
    const [loading, setLoading]=useState(false);
    const handleQuery=async()=>{
        if (!query) return;
        setLoading(true)
        try{
            const endpoint = selectedRag === "hybrid"

                                ? "https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/hybrid-query"

                                : selectedRag === "compare"

                                ? "https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/compare-rags"
                                
                                :selectedRag==="adaptive"
                                
                                ?"https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/adaptive-query"
                                :selectedRag==="agentic"
                                ?"https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/agentic-query"
                                :selectedRag==="corrective"
                                ?"https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/corrective-query"
                                :selectedRag==="self"
                                ?"https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/self-query"
                                :selectedRag==="fusion"
                                ?"https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/fusion-query"
                                :selectedRag==="rerank"
                                ?"https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/rerank-query"
                                :selectedRag==="multihop"
                                ?"https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/multihop-query"
                                :selectedRag==="graph"
                                ?"https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/graph-query"
                                :selectedRag==="evaluate"
                                ?"https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/evaluate-all"
                                :selectedRag==="benchmark"
                                ?"https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/evaluate-quality-benchmark"

                                :"https://ominous-computing-machine-699x9777xjj62r7qx-8000.app.github.dev/query";
            const response = await axios.post(endpoint,
                {
                    query: query
                }
            );
            console.log(response.data)
            if (selectedRag === "compare") {

                setComparisonData(response.data);

            } else if(selectedRag==="evaluate") {
                setEvaluationData(response.data);
            } else if(selectedRag==="benchmark") {
                console.log("Benchmark Data:");
                console.log(response.data);
                setBenchmarkData(response.data);
            }else {

                setResponseData(response.data);

            }
            setQueryHistory((prev)=>[
                query,
                ...prev
            ]);


        }catch(error){
            console.log(error)
        }
        setLoading(false);
    };
    return(
        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">
                Ask Questions
            </h2>
            <select
                value={selectedRag}
                onChange={(e) => setSelectedRag(e.target.value)}
                className="mb-4 p-2 border rounded-lg"
            >

                <option value="naive">
                    Naive RAG
                </option>

                <option value="hybrid">
                    Hybrid RAG
                </option>

                <option value="compare">
                    Compare RAGs
                </option>

                <option value="adaptive">
                    Adaptive RAG
                </option>
                <option value="agentic">
                    Agentic RAG
                </option>
                <option value="corrective">
                    Corrective RAG
                </option>
                <option value="self">
                    Self RAG
                </option>
                <option value="fusion">
                    Fusion RAG
                </option>
                <option value="rerank">
                    Rerank RAG
                </option>
                <option value="multihop">
                    Multi Hop RAG
                </option>
                <option value="graph">
                    Graph RAG
                </option>
                <option value="evaluate">
                    Evaluate All RAGs
                </option>
                <option value="benchmark">
                    Quality Benchmark
                </option>
            </select>
            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask something about the uploaded document..."
                className="w-full border rounded-lg p-3 mb-4"
                rows={4}
            />

            <button
                onClick={handleQuery}
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white transition-all duration-300 ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                    }`}
            >
                {loading ? "Generating Response..." : "Ask Question"}
            </button>

        </div>
    );
}

export default QueryPanel;