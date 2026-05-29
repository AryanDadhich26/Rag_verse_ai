function ResponseViewer({responseData}){
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
                        {responseData.retrieved_chunks.length}
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
                                {chunk.rerank_score}

                            </p>

                        )
                    }

                </div>
            </h2>

            <p className="mb-6">
                {responseData.answer}
            </p>

            <h3 className="text-xl font-semibold mb-2">
                Retrieved Chunks
            </h3>
            <div className="space-y-4">

                {responseData.retrieved_chunks.map((chunk, index) => (

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

                        <p className="text-gray-700 leading-relaxed">
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
                            <p className="text-gray-700 leading-relaxed">

                                {chunk.chunk}

                            </p>
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ResponseViewer;