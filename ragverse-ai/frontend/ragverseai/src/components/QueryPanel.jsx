import { useState } from "react";
import axios from "axios"

function QueryPanel({setResponseData,queryHistory,setQueryHistory,setComparisonData}){
    const [query, setQuery]=useState("");
    const [selectedRag, setSelectedRag]=useState("naive");
    const [loading, setLoading]=useState(false);
    const handleQuery=async()=>{
        if (!query) return;
        setLoading(true)
        try{
            const endpoint = selectedRag === "hybrid"

                                ? "https://congenial-chainsaw-4jjpj9995qvrcppg-8000.app.github.dev/hybrid-query"

                                : selectedRag === "compare"

                                ? "https://congenial-chainsaw-4jjpj9995qvrcppg-8000.app.github.dev/compare-rags"
                                
                                :selectedRag==="adaptive"
                                
                                ?"https://congenial-chainsaw-4jjpj9995qvrcppg-8000.app.github.dev/adaptive-query"
                                :selectedRag==="agentic"
                                ?"https://congenial-chainsaw-4jjpj9995qvrcppg-8000.app.github.dev/agentic-query"
                                :selectedRag==="corrective"
                                ?"https://congenial-chainsaw-4jjpj9995qvrcppg-8000.app.github.dev/corrective-query"
                                :selectedRag==="self"
                                ?"https://congenial-chainsaw-4jjpj9995qvrcppg-8000.app.github.dev/self-query"
                                :selectedRag==="fusion"
                                ?"https://congenial-chainsaw-4jjpj9995qvrcppg-8000.app.github.dev/fusion-query"

                                : "https://congenial-chainsaw-4jjpj9995qvrcppg-8000.app.github.dev/query";
            const response = await axios.post(endpoint,
                {
                    query: query
                }
            );
            console.log(response.data)
            if (selectedRag === "compare") {

                setComparisonData(response.data);

            } else {

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