function PipelineVisualizer() {

    const steps = [
        "Query",
        "Embedding",
        "Vector Search",
        "Chunk Retrieval",
        "Prompt Builder",
        "LLM",
        "Generated Answer"
    ];

    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-6">
                RAG Pipeline Flow
            </h2>

            <div className="flex flex-wrap gap-4 items-center">

                {steps.map((step, index) => (

                    <div
                        key={index}
                        className="flex items-center gap-4"
                    >

                        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium shadow-sm">
                            {step}
                        </div>

                        {index !== steps.length - 1 && (
                            <span className="text-2xl text-gray-400">
                                →
                            </span>
                        )}

                    </div>

                ))}

            </div>

        </div>
    );
}

export default PipelineVisualizer;