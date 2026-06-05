import { useEffect, useState } from "react";
import axios from "axios";

function DatasetManager() {

    const [datasets, setDatasets] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchDatasets();

    }, []);

    const fetchDatasets = async () => {

        try {

            const response =
                await axios.get(
                    "https://solid-pancake-4jjpj9995jxvc764-8000.app.github.dev/datasets"
                );

            setDatasets(
                response.data
            );

        } catch (error) {

            console.error(
                error
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return (
            <div>
                Loading datasets...
            </div>
        );
    }

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Dataset Manager

            </h1>

            {
                datasets.length === 0 ? (

                    <div className="bg-white p-6 rounded-xl shadow">

                        No datasets found.

                    </div>

                ) : (

                    <div className="space-y-4">

                        {
                            datasets.map(
                                (
                                    dataset,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className="
                                            bg-white
                                            p-5
                                            rounded-xl
                                            shadow
                                        "
                                    >

                                        <h2 className="text-xl font-bold">

                                            {
                                                dataset.filename
                                            }

                                        </h2>

                                        <p className="mt-2">

                                            <strong>
                                                Upload Date:
                                            </strong>

                                            {" "}

                                            {
                                                dataset.upload_date
                                            }

                                        </p>

                                        <p>

                                            <strong>
                                                Chunks:
                                            </strong>

                                            {" "}

                                            {
                                                dataset.chunks
                                            }

                                        </p>

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

export default DatasetManager;