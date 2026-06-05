import {useEffect, useState} from "react";
import axios from "axios";
function Architecture() {

    const stages = [

        "PDF Upload",

        "PDF Loader",

        "Text Chunking",

        "Embedding Generation",

        "Chroma Vector Store",

        "RAG Retrieval",

        "LLM Generation",

        "Evaluation Engine",

        "Experiment Manager",

        "Export Engine"
    ];
    const [stats, setStats] = useState(null);
    useEffect(() => {

    fetchStats();

}, []);

const fetchStats = async () => {

    try {

        const response =
            await axios.get(
                "https://solid-pancake-4jjpj9995jxvc764-8000.app.github.dev/stats"
            );

        setStats(
            response.data
        );

    } catch (error) {

        console.error(error);

    }
};

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">

                RAGVerse AI Architecture

            </h1>

            <div className="bg-white p-6 rounded-xl shadow">

                <div className="flex flex-wrap items-center gap-4">

                    {
                        stages.map(
                            (stage,index)=>(
                                <div
                                    key={index}
                                    className="flex items-center gap-4"
                                >

                                    <div
                                        className="
                                        bg-blue-100
                                        text-blue-700
                                        px-4
                                        py-3
                                        rounded-xl
                                        font-medium
                                        "
                                    >
                                        {stage}
                                    </div>

                                    {
                                        index !==
                                        stages.length - 1 && (

                                            <span
                                                className="
                                                text-2xl
                                                text-gray-400
                                                "
                                            >
                                                →
                                            </span>
                                        )
                                    }

                                </div>
                            )
                        )
                    }

                </div>

            </div>
                        <div className="grid grid-cols-4 gap-6 mt-6">

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="text-lg font-bold">
                        RAG Architectures
                    </h3>

                    <p className="text-3xl font-bold text-blue-600">
                        {
                            stats?.rag_count || 0
                        }
                    </p>

                </div>

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="text-lg font-bold">
                        Dataset Manager
                    </h3>

                    <p className="text-3xl font-bold text-green-600">
                        {
                            stats?.dataset_count || 0
                        }
                    </p>

                </div>

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="text-lg font-bold">
                        Experiment Tracking
                    </h3>

                    <p className="text-3xl font-bold text-purple-600">
                        {
                            stats?.experiment_count || 0
                        }
                    </p>

                </div>

                <div className="bg-white p-6 rounded-xl shadow">

                    <h3 className="text-lg font-bold">
                        Export Engine
                    </h3>

                    <p className="text-3xl font-bold text-orange-600">
                        {
                            stats?.export_count || 0
                        }
                    </p>

                </div>

            </div>
            <div className="bg-white p-6 rounded-xl shadow mt-6">

    <h2 className="text-2xl font-bold mb-4">

        Implemented RAG Architectures

    </h2>

    <div className="grid grid-cols-2 gap-4">

        <div>✓ Naive RAG</div>
        <div>✓ Hybrid RAG</div>
        <div>✓ Fusion RAG</div>
        <div>✓ Graph RAG</div>
        <div>✓ MultiHop RAG</div>
        <div>✓ ReRank RAG</div>
        <div>✓ Adaptive RAG</div>
        <div>✓ Agentic RAG</div>
        <div>✓ Self RAG</div>
        <div>✓ Corrective RAG</div>

    </div>

</div>
        </div>
    );
}

export default Architecture;