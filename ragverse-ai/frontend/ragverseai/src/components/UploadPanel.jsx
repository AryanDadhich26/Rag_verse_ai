import { useState } from "react";
import axios from "axios";

function UploadPanel() {

    const [file, setFile] = useState(null);

    const [message, setMessage] = useState("");



    const handleFileChange = (event) => {

        setFile(event.target.files[0]);

    };



    const handleUpload = async () => {

        if (!file) {

            setMessage("Please select a PDF file.");

            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            const response = await axios.post(
                "https://ominous-space-halibut-pjj5jqqq47g6h7gjw-8000.app.github.dev/upload",
                formData,
                {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                }
            );

            setMessage("Upload successful!");

            console.log(response.data);

        } catch (error) {

            console.error(error);

            setMessage("Upload failed!");

        }
    };



    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">
                Upload Documents
            </h2>

            <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="mb-4"
            />

            <button
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Upload PDF
            </button>

            <p className="mt-4 text-sm text-gray-600">
                {message}
            </p>

        </div>
    );
}

export default UploadPanel;