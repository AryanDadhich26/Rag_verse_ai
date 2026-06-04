import axios from "axios";

function ResponseViewer({responseData}){
    const saveExperiment = async () => {

        if (!responseData) return;

        try {

            const experiment = {

                query: responseData.query,

                rag_type: responseData.rag_type,

                answer: responseData.answer,

                metrics: responseData.metrics,

                timestamp: new Date()
                    .toLocaleString()

            };

            await axios.post(
                "https://cuddly-pancake-v6w6wv4g59rfpj9g-8000.app.github.dev/save-experiment",
                experiment
            );

            alert(
                "Experiment Saved Successfully"
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed To Save Experiment"
            );
        }
    };
    if (!responseData){
        return (
            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-4">
                    Response Viewer
                </h2>

                <p>No response yet.</p>

            </div>
        );
    }
    return (
        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">
                Generated Answer
                
                <div className="grid grid-cols-3 gap-4 mb-6">

    <div className="bg-blue-50 p-4 rounded-xl">

        <h3 className="text-sm text-gray-500">
            Retrieval Time
        </h3>

        <p className="text-xl font-bold text-blue-700">

            {responseData.metrics.retrieval_time}s

        </p>

    </div>

    <div className="bg-green-50 p-4 rounded-xl">

        <h3 className="text-sm text-gray-500">
            Generation Time
        </h3>

        <p className="text-xl font-bold text-green-700">

            {responseData.metrics.generation_time}s

        </p>

    </div>

    <div className="bg-purple-50 p-4 rounded-xl">

        <h3 className="text-sm text-gray-500">
            Total Time
        </h3>

        <p className="text-xl font-bold text-purple-700">

            {responseData.metrics.total_time}s

        </p>

    </div>

</div>
                <div className="flex gap-4 text-sm text-gray-500 mb-4">

                    <p>
                        Chunks Retrieved:
                        {responseData.retrieved_chunks?.length||0}
                    </p>

                    <p>
                        RAG Type:
                        {responseData.rag_type}
                    </p>
                    {
                        responseData.agent_decision && (

                            <p className="text-purple-700 font-semibold">

                                Agent Selected:
                                {responseData.agent_decision}

                            </p>

                        )
                    }
                    {
                        responseData.retrieval_strategy && (

                            <p className="text-orange-600 font-semibold">

                                Retrieval Strategy:
                                {responseData.retrieval_strategy}

                            </p>

                        )
                    }
                    {
                        responseData.low_confidence_detected && (

                            <p className="text-red-600 font-semibold">

                                Low Confidence Detected → Retrieval Corrected

                            </p>

                        )
                    }
                    {
                        responseData.reflection && (

                            <p className="text-indigo-600 font-semibold">

                                Reflection Status:
                                {responseData.reflection}

                            </p>

                        )
                    }
                    {
                        responseData.second_attempt_used && (

                            <p className="text-red-600 font-semibold">

                                Self-RAG Triggered Retry Generation

                            </p>

                        )
                    }
                    {
                        responseData.query_variations && (

                            <div className="mt-4">

                                <h3 className="font-bold text-purple-700 mb-2">

                                    Query Variations Used

                                </h3>

                                <ul className="list-disc list-inside text-gray-700">

                                    {
                                        responseData.query_variations.map(
                                            (variation, index) => (

                                                <li key={index}>

                                                    {variation}

                                                </li>

                                            )
                                        )
                                    }

                                </ul>

                            </div>

                        )
                    }
                    {
                        responseData.rerank_score && (

                            <p className="text-purple-600">

                                Re-rank Score:
                                {responseData.rerank_score}

                            </p>

                        )
                    }
                    {
                        responseData.followup_query && (

                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">

                                <h3 className="font-bold text-blue-700">

                                    Follow-Up Query

                                </h3>

                                <p>

                                    {responseData.followup_query}

                                </p>

                            </div>

                        )
                    }
                    {
                        responseData.hop1_chunks && (

                            <div className="mt-4 p-3 bg-green-50 rounded-lg">

                                <h3 className="font-bold text-green-700">

                                    Multi-Hop Statistics

                                </h3>

                                <p>

                                    Hop 1 Chunks:
                                    {responseData.hop1_chunks}

                                </p>

                                <p>

                                    Hop 2 Chunks:
                                    {responseData.hop2_chunks}

                                </p>

                            </div>

                        )
                    }
                    {
                        responseData.fusion_method && (

                            <div className="mt-4 p-3 bg-purple-50 rounded-lg">

                                <h3 className="font-bold text-purple-700">

                                    Fusion Information

                                </h3>

                                <p>

                                    Fusion Method:
                                    {responseData.fusion_method}

                                </p>

                            </div>

                        )
                    }

                    {
                        responseData.query_variations && (

                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">

                                <h3 className="font-bold text-blue-700">

                                    Query Variations

                                </h3>

                                <ul className="list-disc ml-5">

                                    {
                                        responseData.query_variations.map(
                                            (variation,index)=>(
                                                <li key={index}>
                                                    {variation}
                                                </li>
                                            )
                                        )
                                    }

                                </ul>

                            </div>

                        )
                    }
                    {
                       responseData.fusion_score && (

                            <p className="text-purple-600">

                                Fusion Score:
                                {responseData.fusion_score}

                            </p>

                        )
                    }
                    {
                        responseData.graph_stats && (

                            <div className="mt-4 p-3 bg-purple-50 rounded-lg">

                                <h3 className="font-bold text-purple-700">

                                    Graph Statistics

                                </h3>

                                <p>

                                    Nodes:
                                    {" "}
                                    {responseData.graph_stats.nodes}

                                </p>

                                <p>

                                    Edges:
                                    {" "}
                                    {responseData.graph_stats.edges}

                                </p>

                            </div>

                        )
                    }
        
                    {
                        Array.isArray(responseData?.matched_nodes) && (

                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">

                                <h3 className="font-bold text-blue-700">

                                    Matched Graph Nodes

                                </h3>

                                <ul className="list-disc ml-5">

                                    {
                                        responseData?.matched_nodes?.map(
                                            (node,index)=>(
                                                <li key={index}>
                                                    {node}
                                                </li>
                                            )
                                        )
                                    }

                                </ul>

                            </div>

                        )
                    }

                </div>
            </h2>

            <p className="mb-6">
                {responseData.answer}
            </p>
            <div className="mb-6">

                <button
                    onClick={saveExperiment}
                    className="
                        bg-green-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-green-700
                    "
                >
                    💾 Save Experiment
                </button>

            </div>
            <h3 className="text-xl font-semibold mb-2">
                Retrieved Chunks
            </h3>
            <div className="space-y-4">

                {responseData?.retrieved_chunks?.map((chunk, index) => (

                    <div
                        key={index}
                        className="border rounded-xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
                    >

                        <div className="flex justify-between items-center mb-2">

                            <h4 className="font-semibold">
                                Chunk #{index + 1}
                            </h4>

                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                Retrieved
                            </span>

                        </div>

                        <div className="text-gray-700 leading-relaxed">

    <p className="text-sm text-blue-600 font-medium mb-2">
        Similarity Score:
        {chunk.score}
    </p>

    <span
        className={`text-xs px-2 py-1 rounded-full ${
            chunk.score > 0.7
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
        }`}
    >
        {chunk.score > 0.7
            ? "High Confidence"
            : "Medium Confidence"}
    </span>

    <p className="text-gray-700 leading-relaxed mt-2">
        {chunk.chunk}
    </p>

</div>
                    </div>

                ))}

            </div>

        </div>
    );
}

export default ResponseViewer;