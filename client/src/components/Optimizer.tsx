import React, { useState, useEffect, useEffectEvent } from "react";
import { useResume } from "../context/ResumeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Optimizer = () => {
    const { file, setParsedData } = useResume();
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [jd, setJd] = useState("");
    const navigate = useNavigate();

    const handleEvaluate = async () => {
        if (!file) return;
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post(
                "http://localhost:8080/api/resumes/parse",
                formData,
            );

            setParsedData(response.data);
            navigate("/evaluate");
        } catch (e) {
            console.error("Parsing failed", e);
            alert("Failed to read CV. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [file]);
    return (
        <>
            <div className="mt-[50px] flex h-[calc(100vh-100px)] gap-6 p-4">
                <div className="flex-1 overflow-hidden rounded-lg border bg-gray-100 shadow-inner">
                    {fileUrl ? (
                        <iframe
                            src={fileUrl}
                            className="h-full w-full"
                            title="CV Preview"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            No CV uploaded
                        </div>
                    )}
                </div>
                <div className="flex w-1/3 flex-col gap-4">
                    <h2 className="font-montserrat text-2xl font-bold">
                        Paste Job Description
                    </h2>
                    <textarea
                        className="flex-1 rounded-lg border p-4 shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        placeholder="Paste the job description here..."
                        value={jd}
                        onChange={(e) => setJd(e.target.value)}
                    />
                    <button
                        onClick={handleEvaluate}
                        disabled={loading}
                        className="font-montserrat rounded bg-[#003ae7] py-3 font-medium text-white shadow-lg transition-transform hover:scale-105"
                    >
                        {loading
                            ? "AI is reading your CV..."
                            : "Let the AI evaluate"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Optimizer;
