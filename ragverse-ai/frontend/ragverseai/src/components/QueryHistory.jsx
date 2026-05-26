function QueryHistory({ queryHistory }) {

    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">
                Recent Queries
            </h2>

            {queryHistory.length === 0 ? (

                <p className="text-gray-500">
                    No queries yet.
                </p>

            ) : (

                <div className="space-y-3">

                    {queryHistory.map((query, index) => (

                        <div
                            key={index}
                            className="border rounded-lg p-3 hover:bg-gray-50 transition-all duration-300"
                        >
                            {query}
                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default QueryHistory;