function CompareView({comparisonData}){
    if(!comparisonData) return null;
    const naive = comparisonData.naive_rag;
    const hybrid = comparisonData.hybrid_rag;

    return (
        <div className="grid grid-cols-2 gap-6 mt-6">

            {/* Naive RAG */}

            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-4 text-blue-700">

                    Naive RAG

                </h2>

                <p className="mb-4 text-gray-700">

                    {naive.answer}

                </p>

                <div className="mb-4">

                    <p>
                        Retrieval:
                        {naive.metrics.retrieval_time}s
                    </p>

                    <p>
                        Generation:
                        {naive.metrics.generation_time}s
                    </p>

                    <p>
                        Total:
                        {naive.metrics.total_time}s
                    </p>

                </div>

                <div className="space-y-3">

                    {naive.retrieved_chunks.map((chunk, index) => (

                        <div
                            key={index}
                            className="border rounded-lg p-3 bg-gray-50"
                        >

                            <p className="text-sm text-blue-600 mb-2">

                                Score:
                                {chunk.score}

                            </p>

                            <p className="text-gray-700">

                                {chunk.chunk}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

            {/* Hybrid RAG */}

            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-4 text-green-700">

                    Hybrid RAG

                </h2>

                <p className="mb-4 text-gray-700">

                    {hybrid.answer}

                </p>

                <div className="mb-4">

                    <p>
                        Retrieval:
                        {hybrid.metrics.retrieval_time}s
                    </p>

                    <p>
                        Generation:
                        {hybrid.metrics.generation_time}s
                    </p>

                    <p>
                        Total:
                        {hybrid.metrics.total_time}s
                    </p>

                </div>

                <div className="space-y-3">

                    {hybrid.retrieved_chunks.map((chunk, index) => (

                        <div
                            key={index}
                            className="border rounded-lg p-3 bg-gray-50"
                        >

                            <p className="text-sm text-green-600 mb-2">

                                Score:
                                {chunk.score}

                            </p>

                            <p className="text-gray-700">

                                {chunk.chunk}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default CompareView;