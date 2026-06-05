import { useEffect, useState } from "react";
import axios from "axios";

function SavedExperiments() {

    const [experiments, setExperiments] = useState([]);
    const [selectedExperiment, setSelectedExperiment] =
    useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchExperiments();

    }, []);

    const fetchExperiments = async () => {

        try {

            const response = await axios.get(
                "https://solid-pancake-4jjpj9995jxvc764-8000.app.github.dev/experiments"
            );

            setExperiments(
                response.data
            );

        } catch (error) {

            console.error(
                "Failed to load experiments",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return (

            <div className="p-6">

                Loading experiments...

            </div>

        );
    }
    console.log(
    "selectedExperiment:",
    selectedExperiment
);
    return (

        <div className="p-6">

            <div className="flex justify-between items-center mb-6">

    <h1 className="text-3xl font-bold">

        Saved Experiments

    </h1>
        
    <div className="flex gap-3">

        <a
            href="https://solid-pancake-4jjpj9995jxvc764-8000.app.github.dev/export/json"
            target="_blank"
            rel="noreferrer"
            className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-blue-700
            "
        >
            ⬇ Export JSON
        </a>

        <a
            href="https://solid-pancake-4jjpj9995jxvc764-8000.app.github.dev/export/csv"
            target="_blank"
            rel="noreferrer"
            className="
                bg-green-600
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-green-700
            "
        >
            ⬇ Export CSV
        </a>

    </div>

</div>
            {
    selectedExperiment && (

        <div
            className="
                bg-white
                p-6
                rounded-xl
                shadow
                mt-4
                mb-6
            "
        >

            <h2 className="text-2xl font-bold mb-4">
                Experiment Details
            </h2>

            <p>
                <strong>Query:</strong>
                {" "}
                {selectedExperiment.query}
            </p>

            <p className="mt-2">
                <strong>RAG Type:</strong>
                {" "}
                {selectedExperiment.rag_type}
            </p>

            <p className="mt-2">
                <strong>Answer:</strong>
            </p>

            <div
                className="
                    bg-gray-50
                    p-4
                    rounded
                    mt-2
                "
            >
                {selectedExperiment.answer}
            </div>

            <p className="mt-4">
                <strong>Total Time:</strong>
                {" "}
                {selectedExperiment.total_time}s
            </p>

            <button
                onClick={() =>
                    setSelectedExperiment(null)
                }
                className="
                    mt-4
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-lg
                "
            >
                Close
            </button>

        </div>
    )
}
            {
                experiments.length === 0 ? (

                    <div className="bg-white p-6 rounded-xl shadow">

                        No experiments found.

                    </div>

                ) : (

                    <div className="space-y-4">

                        {
                            experiments.map(
                                (experiment, index) => (

                                    <div
                                        key={index}
                                        className="
                                            bg-white
                                            p-5
                                            rounded-xl
                                            shadow
                                        "
                                    >

                                        <div className="flex justify-between">

                                            <div>

                                                <h2 className="font-bold text-lg">

                                                    {
                                                        experiment.query
                                                    }

                                                </h2>

                                                <p className="text-blue-600">

                                                    {
                                                        experiment.rag_type
                                                    }

                                                </p>

                                            </div>

                                            <div className="text-sm text-gray-500">

                                                {
                                                    experiment.timestamp
                                                }

                                            </div>

                                        </div>

                                        <div className="mt-3">

                                            <p>

                                                <strong>
                                                    Total Time:
                                                </strong>

                                                {" "}

                                                {
                                                    experiment.metrics?.total_time
                                                }

                                                s

                                            </p>

                                        </div>

                                        <div className="mt-4">

                                            <h3 className="font-semibold">

                                                Answer

                                            </h3>

                                            <p className="text-gray-700 mt-2">

                                                {
                                                    experiment.answer
                                                }

                                            </p>

                                        </div>
                                        <button
                                            onClick={() => {
                                                console.log(experiment);
                                                setSelectedExperiment(experiment);
                                            }}
                                            className="
                                                mt-4
                                                bg-blue-600
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                            "
                                        >
                                            View Details
                                        </button>

                                    </div>
                                )
                            )
                        }

                    </div>

                )
            }
            {/* {
    selectedExperiment && (

        <div className="
            bg-white
            p-6
            rounded-xl
            shadow
            mt-6
        ">

            <h2 className="text-2xl font-bold mb-4">

                Experiment Details

            </h2>

            <p>
                <strong>Query:</strong>
                {" "}
                {selectedExperiment.query}
            </p>

            <p className="mt-2">
                <strong>RAG:</strong>
                {" "}
                {selectedExperiment.rag_type}
            </p>

            <p className="mt-2">
                <strong>Timestamp:</strong>
                {" "}
                {selectedExperiment.timestamp}
            </p>

            <p className="mt-2">
                <strong>Answer:</strong>
            </p>

            <div className="
                bg-gray-50
                p-4
                rounded
                mt-2
            ">
                {selectedExperiment.answer}
            </div>

            <div className="mt-4">

                <h3 className="font-bold mb-2">

                    Metrics

                </h3>

                <p>
                    Retrieval:
                    {" "}
                    {
                        selectedExperiment
                        .metrics
                        ?.retrieval_time
                    }s
                </p>

                <p>
                    Generation:
                    {" "}
                    {
                        selectedExperiment
                        .metrics
                        ?.generation_time
                    }s
                </p>

                <p>
                    Total:
                    {" "}
                    {
                        selectedExperiment
                        .metrics
                        ?.total_time
                    }s
                </p>

            </div>

        </div>
    )
} */}
{
    selectedExperiment && (
        <div className="bg-red-500 text-white p-10 mt-6">
            DETAILS PANEL WORKING

            <br />

            {selectedExperiment.query}
        </div>
    )
}    <button
        onClick={() =>
            setSelectedExperiment(null)
        }
        className="
            mt-4
            bg-red-500
            text-white
            px-4
            py-2
            rounded-lg
        "
    >
        Close
    </button>
            </div>
    );
}

export default SavedExperiments;