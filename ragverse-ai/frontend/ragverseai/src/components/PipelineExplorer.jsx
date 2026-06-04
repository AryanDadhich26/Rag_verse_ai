function PipelineExplorer({ pipelineSteps }) {

    if (
        !pipelineSteps ||
        pipelineSteps.length === 0
    ) {
        return null;
    }

    const renderData = (data) => {

        if (
            typeof data === "string" ||
            typeof data === "number"
        ) {
            return (
                <p className="text-gray-700">
                    {data}
                </p>
            );
        }

        if (
            Array.isArray(data)
        ) {
            return (
                <ul className="list-disc ml-5 space-y-1">
                    {
                        data.map(
                            (item,index)=>(
                                <li key={index}>

{
    typeof item === "object"
    ? (
        <div className="ml-2">

            {
                Object.entries(item).map(
                    ([key,value])=>(
                        <div key={key}>

                            <span className="font-semibold">

                                {key}:

                            </span>

                            {" "}

                            {
                                Array.isArray(value)
                                ?
                                value.join(", ")
                                :
                                String(value)
                            }

                        </div>
                    )
                )
            }

        </div>
    )
    :
    item
}

</li>
                            )
                        )
                    }
                </ul>
            );
        }

        if (
            typeof data === "object"
        ) {
            return (
                <div className="space-y-2">
                    {
                        Object.entries(data).map(
                            ([key,value])=>(
                                <div key={key}>

                                    <span className="font-semibold">

                                        {key}:

                                    </span>

                                    {" "}

                                    <span>

                                        {String(value)}

                                    </span>

                                </div>
                            )
                        )
                    }
                </div>
            );
        }

        return null;
    };
    const getStepColor=(stepName)=>{

    if(stepName.includes("Query"))
        return "bg-blue-500";

    if(stepName.includes("Retrieval"))
        return "bg-purple-500";

    if(stepName.includes("Graph"))
        return "bg-green-500";

    if(stepName.includes("Fusion"))
        return "bg-orange-500";

    return "bg-gray-500";
}
    return (

        <div className="bg-white p-6 rounded-xl shadow mt-6">

            <h2 className="text-2xl font-bold mb-6">

                Pipeline Explorer

            </h2>

            {
                pipelineSteps.map(
                    (step,index)=>(

                        <div
                            key={index}
                            className="relative pl-12 pb-6"
                        >

                            {
                                index !==
                                pipelineSteps.length - 1 &&
                                (
                                    <div
                                        className="
                                        absolute
                                        left-4
                                        top-8
                                        w-0.5
                                        h-full
                                        ${getStepColor(step.step)}
                                            `}
                                        "
                                    />
                                )
                            }

                            <div
    className={`
    absolute
    left-0
    top-0
    w-8
    h-8
    rounded-full
    text-white
    flex
    items-center
    justify-center
    font-bold
    ${getStepColor(step.step)}
    `}
>
                                {index+1}
                            </div>

                            <div
                                className="
                                border
                                rounded-lg
                                p-4
                                bg-gray-50
                                "
                            >

                                <h3
                                    className="
                                    font-bold
                                    text-lg
                                    mb-2
                                    "
                                >
                                    {step.step}
                                </h3>

                                {
                                    renderData(
                                        step.data
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

export default PipelineExplorer;