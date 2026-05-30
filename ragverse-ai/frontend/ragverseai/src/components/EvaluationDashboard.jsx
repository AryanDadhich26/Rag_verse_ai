function EvaluationDashboard({evaluationData}){
    if(!evaluationData) return null;

    return(
       <div className="bg-white p-6 rounded-xl shadow mt-6">

            <h2 className="text-2xl font-bold mb-4">

                Evaluation Dashboard

            </h2>

            <table className="w-full border">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="border p-2">RAG</th>
                        <th className="border p-2">Latency</th>
                        <th className="border p-2">Chunks</th>
                        <th className="border p-2">Answer Length</th>
                        <th className="border p-2">Time</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        evaluationData.map(
                            (item,index)=>(
                                <tr key={index}>

                                    <td className="border p-2">
                                        {item.rag_type}
                                    </td>

                                    <td className="border p-2">
                                        {item.latency_score}
                                    </td>

                                    <td className="border p-2">
                                        {item.chunk_count}
                                    </td>

                                    <td className="border p-2">
                                        {item.answer_length}
                                    </td>

                                    <td className="border p-2">
                                        {item.total_time}s
                                    </td>

                                </tr>
                            )
                        )
                    }

                </tbody>

            </table>

        </div>

    );
}

export default EvaluationDashboard;