import { useState } from "react";

import UploadPanel from "../components/UploadPanel";
import QueryPanel from "../components/QueryPanel";
import ResponseViewer from "../components/ResponseViewer";
import PipelineVisualizer from "../components/PipelineVisualizar";
import QueryHistory from "../components/QueryHistory";
import CompareView from "../components/CompareView";
import EvaluationDashboard from "../components/EvaluationDashboard";
import QualityLeaderboard from "../components/QualityLeaderboard";
import PipelineExplorer from "../components/PipelineExplorer";
import BenchmarkCharts from "../components/BenchmarkCharts";
function Dashboard(){
    const[responseData, setResponseData] = useState(null);
    const[queryHistory, setQueryHistory] = useState([]);
    const [comparisonData, setComparisonData] = useState(null);
    const [evaluationData, setEvaluationData] = useState(null);
    const [benchmarkData,setBenchmarkData]=useState(null);
    return (
        <div>
        
          <h1 className="text-3xl font-bold mb-6">
          RAG Comparison Dashboard
          </h1>

                <div className="grid grid-cols-2 gap-6 mb-6">

                    <UploadPanel />

                    <QueryPanel
                        setResponseData={setResponseData}
                        setComparisonData={setComparisonData}
                        queryHistory={queryHistory}
                        setQueryHistory={setQueryHistory}
                        setEvaluationData={setEvaluationData}
                        setBenchmarkData={setBenchmarkData}
                    />

                </div>

              <ResponseViewer
                  responseData={responseData}
              />
              <PipelineExplorer
                  pipelineSteps={
                    responseData?.pipeline_steps
                  }
              />
              <CompareView
                comparisonData={comparisonData}
              />
              <EvaluationDashboard
                evaluationData={evaluationData}
              />
              <QualityLeaderboard
                benchmarkData={benchmarkData}
              />
              <BenchmarkCharts
                benchmarkData={benchmarkData}
              />
              <div className="mt-6">
                <PipelineVisualizer />
              </div>
                <div className="mt-6">
                    <QueryHistory
                        queryHistory={queryHistory}
                    />
                </div>
        </div>


    );
}

export default Dashboard;