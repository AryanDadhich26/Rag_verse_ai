import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function BenchmarkCharts({ benchmarkData }) {

    if (
        !benchmarkData ||
        benchmarkData.length === 0
    ) {
        return null;
    }
    const bestOverall =
        benchmarkData.reduce(
            (a,b)=>
                a.overall_score >
                b.overall_score
                ? a
                : b
        );
    const mostRelevant =
    benchmarkData.reduce(
        (a,b)=>
            a.relevance >
            b.relevance
            ? a
            : b
    );

    const mostFaithful =
        benchmarkData.reduce(
            (a,b)=>
                a.faithfulness >
                b.faithfulness
                ? a
                : b
        );

    const mostComplete =
        benchmarkData.reduce(
            (a,b)=>
                a.completeness >
                b.completeness
                ? a
                : b
        );
    const renderChart = (
        title,
        dataKey
    ) => (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">

            <h3 className="text-lg font-bold mb-4">
                {title}
            </h3>

            <div className="h-72">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={benchmarkData}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="rag_type"
                        />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey={dataKey}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );

    return (

    <div className="bg-white p-6 rounded-xl shadow mt-6">

        <h2 className="text-2xl font-bold mb-6">
            Benchmark Analytics
        </h2>

        <div className="bg-green-50 p-4 rounded-lg mb-6">

            <h3 className="text-xl font-bold mb-3">
                🏆 Benchmark Summary
            </h3>

            <p>
                <strong>Best Overall:</strong>{" "}
                {bestOverall.rag_type}
                {" "}
                ({bestOverall.overall_score})
            </p>

            <p>
                <strong>Most Relevant:</strong>{" "}
                {mostRelevant.rag_type}
                {" "}
                ({mostRelevant.relevance})
            </p>

            <p>
                <strong>Most Faithful:</strong>{" "}
                {mostFaithful.rag_type}
                {" "}
                ({mostFaithful.faithfulness})
            </p>

            <p>
                <strong>Most Complete:</strong>{" "}
                {mostComplete.rag_type}
                {" "}
                ({mostComplete.completeness})
            </p>

        </div>

        {
            renderChart(
                "Overall Score",
                "overall_score"
            )
        }

        {
            renderChart(
                "Relevance",
                "relevance"
            )
        }

        {
            renderChart(
                "Faithfulness",
                "faithfulness"
            )
        }

        {
            renderChart(
                "Completeness",
                "completeness"
            )
        }

    </div>

);
}

export default BenchmarkCharts;