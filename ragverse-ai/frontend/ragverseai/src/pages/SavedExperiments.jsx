import { useEffect, useState } from "react";
import axios from "axios";

function SavedExperiments() {

    const [experiments, setExperiments] = useState([]);

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

                                    </div>
                                )
                            )
                        }

                    </div>

                )
            }

        </div>
    );
}

export default SavedExperiments;