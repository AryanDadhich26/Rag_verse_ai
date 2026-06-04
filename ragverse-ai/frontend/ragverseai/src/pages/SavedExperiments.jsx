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
                "http://localhost:8000/experiments"
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

            <h1 className="text-3xl font-bold mb-6">

                Saved Experiments

            </h1>

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