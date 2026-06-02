function PipelineExplorer({ pipelineSteps }) {

    if (
        !pipelineSteps ||
        pipelineSteps.length === 0
    ) {
        return null;
    }

    return (

        <div className="bg-white p-6 rounded-xl shadow mt-6">

            <h2 className="text-2xl font-bold mb-4">

                Pipeline Explorer

            </h2>

            {
                pipelineSteps.map(
                    (step,index)=>(
                        <div
                            key={index}
                            className="border rounded-lg p-4 mb-4"
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                    w-8 h-8
                                    rounded-full
                                    bg-blue-500
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    "
                                >
                                    {index+1}
                                </div>

                                <h3 className="font-bold text-lg">

                                    {step.step}

                                </h3>

                            </div>

                            <div className="mt-3 bg-gray-50 p-3 rounded">

                                <pre className="whitespace-pre-wrap text-sm overflow-auto">

                                    {
                                        JSON.stringify(
                                            step.data,
                                            null,
                                            2
                                        )
                                    }

                                </pre>

                            </div>

                        </div>
                    )
                )
            }

        </div>

    );
}

export default PipelineExplorer;