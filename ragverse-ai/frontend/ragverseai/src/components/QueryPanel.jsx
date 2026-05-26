import { useState } from "react";
import axios from "axios"

function QueryPanel({setResponseData,queryHistory,setQueryHistory}){
    const [query, setQuery]=useState("");
    const [loading, setLoading]=useState(false);

    const handleQuery=async()=>{
        if (!query) return;
        setLoading(true)
        try{
            const response = await axios.post("https://potential-space-dollop-x55g5qqq7wv7cv7qg-8000.app.github.dev/query",
                {
                    query: query
                }
            );

            setResponseData(response.data);
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