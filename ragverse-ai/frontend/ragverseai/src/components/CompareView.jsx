function CompareView({ comparisonData }) {

    if (!comparisonData) return null;

    const ragResults = Object.entries(
        comparisonData
    );

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {
                ragResults.map(
                    ([ragName, ragData]) => (

                        <div
                            key={ragName}
                            className="bg-white p-6 rounded-xl shadow"
                        >

                            <h2 className="text-2xl font-bold mb-4 text-blue-700">

                                {
                                    ragName.replaceAll(
                                        "_",
                                        " "
                                    )
                                }

                            </h2>

                            <p className="mb-4 text-gray-700">

                                {ragData.answer}

                            </p>

                            {/* Metadata */}

                            <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm">

                                {ragData.agent_decision && (
                                    <p>
                                        <strong>Agent Decision:</strong>
                                        {" "}
                                        {ragData.agent_decision}
                                    </p>
                                )}

                                {ragData.selected_strategy && (
                                    <p>
                                        <strong>Selected Strategy:</strong>
                                        {" "}
                                        {ragData.selected_strategy}
                                    </p>
                                )}

                                {ragData.query_type && (
                                    <p>
                                        <strong>Query Type:</strong>
                                        {" "}
                                        {ragData.query_type}
                                    </p>
                                )}

                                {ragData.followup_query && (
                                    <p>
                                        <strong>Follow-Up Query:</strong>
                                        {" "}
                                        {ragData.followup_query}
                                    </p>
                                )}

                                {ragData.reflection && (
                                    <p>
                                        <strong>Reflection:</strong>
                                        {" "}
                                        {ragData.reflection}
                                    </p>
                                )}

                                {
                                    ragData.second_attempt_used !== undefined && (
                                        <p>
                                            <strong>Retry Used:</strong>
                                            {" "}
                                            {
                                                String(
                                                    ragData.second_attempt_used
                                                )
                                            }
                                        </p>
                                    )
                                }

                                {ragData.retrieval_strategy && (
                                    <p>
                                        <strong>Retrieval Strategy:</strong>
                                        {" "}
                                        {ragData.retrieval_strategy}
                                    </p>
                                )}

                                {
                                    ragData.low_confidence_detected !== undefined && (
                                        <p>
                                            <strong>Low Confidence:</strong>
                                            {" "}
                                            {
                                                String(
                                                    ragData.low_confidence_detected
                                                )
                                            }
                                        </p>
                                    )
                                }

                                {ragData.fusion_method && (
                                    <p>
                                        <strong>Fusion Method:</strong>
                                        {" "}
                                        {ragData.fusion_method}
                                    </p>
                                )}

                            </div>

                            {/* Graph RAG */}

                            {
                                ragData.graph_stats && (

                                    <div className="bg-green-50 p-3 rounded-lg mb-4 text-sm">

                                        <p>
                                            <strong>Nodes:</strong>
                                            {" "}
                                            {ragData.graph_stats.nodes}
                                        </p>

                                        <p>
                                            <strong>Edges:</strong>
                                            {" "}
                                            {ragData.graph_stats.edges}
                                        </p>

                                        <p>
                                            <strong>Matched Nodes:</strong>
                                            {" "}
                                            {
                                                ragData.matched_nodes?.length || 0
                                            }
                                        </p>

                                    </div>
                                )
                            }

                            {/* MultiHop */}

                            {
                                ragData.hop1_chunks && (

                                    <div className="bg-yellow-50 p-3 rounded-lg mb-4 text-sm">

                                        <p>
                                            <strong>Hop 1 Chunks:</strong>
                                            {" "}
                                            {ragData.hop1_chunks}
                                        </p>

                                        <p>
                                            <strong>Hop 2 Chunks:</strong>
                                            {" "}
                                            {ragData.hop2_chunks}
                                        </p>

                                    </div>
                                )
                            }

                            {/* Rerank */}

                            {
                                ragData.initial_chunks && (

                                    <div className="bg-purple-50 p-3 rounded-lg mb-4 text-sm">

                                        <p>
                                            <strong>Initial Chunks:</strong>
                                            {" "}
                                            {ragData.initial_chunks}
                                        </p>

                                        <p>
                                            <strong>Final Chunks:</strong>
                                            {" "}
                                            {ragData.final_chunks}
                                        </p>

                                    </div>
                                )
                            }

                            {/* Timing */}

                            <div className="mb-4">

                                <p>
                                    Retrieval:
                                    {" "}
                                    {
                                        ragData.metrics?.retrieval_time
                                    }s
                                </p>

                                <p>
                                    Generation:
                                    {" "}
                                    {
                                        ragData.metrics?.generation_time
                                    }s
                                </p>

                                <p>
                                    Total:
                                    {" "}
                                    {
                                        ragData.metrics?.total_time
                                    }s
                                </p>

                            </div>

                            {/* Chunks */}

                            <div className="space-y-3">

                                {
                                    ragData.retrieved_chunks
                                    ?.slice(0, 3)
                                    .map(
                                        (
                                            chunk,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                className="border rounded-lg p-3 bg-gray-50"
                                            >

                                                <p className="text-sm text-blue-600 mb-2">

                                                    Score:
                                                    {" "}

                                                    {
                                                        chunk.score ||
                                                        chunk.hybrid_score ||
                                                        chunk.rerank_score ||
                                                        chunk.fusion_score ||
                                                        "N/A"
                                                    }

                                                </p>

                                                <p className="text-gray-700">

                                                    {
                                                        chunk.chunk
                                                    }

                                                </p>

                                            </div>
                                        )
                                    )
                                }

                            </div>

                        </div>
                    )
                )
            }

        </div>
    );
}

export default CompareView;