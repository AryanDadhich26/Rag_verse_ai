import UploadPanel from "../components/UploadPanel";
function Dashboard(){
    return (
        <div>
        <h1 className="text-3xl font-bold mb-6">
        RAG Comparison Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">

        {/* <div className="bg-white p-6 rounded-xl shadow"> */}

          {/* <h2 className="text-xl font-semibold mb-4">
            Upload Documents
          </h2>

          <p>
            Upload PDFs and datasets for RAG comparison.
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Query System
          </h2>

          <p>
            Ask questions and compare RAG outputs.
          </p>

        </div> */}
        <UploadPanel />

      </div>

    </div>


    );
}

export default Dashboard;