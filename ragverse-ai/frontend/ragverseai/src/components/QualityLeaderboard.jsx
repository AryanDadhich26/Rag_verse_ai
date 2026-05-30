function QualityLeaderboard({benchmarkData}){
    
    if (!benchmarkData) return null;
    return(
      <div className="bg-white p-6 rounded-xl shadow mt-6">

            <h2 className="text-2xl font-bold mb-4">
                RAG Quality Leaderboard
            </h2>

            <table className="w-full border">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="border p-2">
                            Rank
                        </th>

                        <th className="border p-2">
                            RAG
                        </th>

                        <th className="border p-2">
                            Overall
                        </th>

                        <th className="border p-2">
                            Relevance
                        </th>

                        <th className="border p-2">
                            Faithfulness
                        </th>

                        <th className="border p-2">
                            Completeness
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        benchmarkData.map(
                            (item,index)=>(
                                <tr key={index}>

                                    <td className="border p-2 text-center">

                                        {
                                            index===0
                                                ? "🥇"
                                                : index===1
                                                ? "🥈"
                                                : index===2
                                                ? "🥉"
                                                : index+1
                                        }

                                    </td>

                                    <td className="border p-2">

                                        {item.rag_type}

                                    </td>

                                    <td className="border p-2 font-bold text-green-600">

                                        {item.overall_score}

                                    </td>

                                    <td className="border p-2">

                                        {item.relevance}

                                    </td>

                                    <td className="border p-2">

                                        {item.faithfulness}

                                    </td>

                                    <td className="border p-2">

                                        {item.completeness}

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

export default QualityLeaderboard;