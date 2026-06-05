import { useState } from "react";

import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import SavedExperiments from "./pages/SavedExperiments";
import DatasetManager from "./pages/DatasetManager";
function App() {

    const [activePage, setActivePage] =
        useState("Dashboard");

    const renderPage = () => {

        switch (activePage) {

            case "Saved Experiments":
                return <SavedExperiments />;

            case "Datasets":
                return <DatasetManager />;

            case "Dashboard":
            default:
                return <Dashboard />;
        }
    };

    return (

        <MainLayout
            activePage={activePage}
            setActivePage={setActivePage}
        >

            {renderPage()}

        </MainLayout>
    );
}

export default App;