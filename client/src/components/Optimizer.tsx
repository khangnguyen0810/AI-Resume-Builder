import React, { useState, useEffect, useEffectEvent } from "react";
import { useResume } from "../context/ResumeContext";
import { useNavigate } from "react-router-dom";
import API from "../lib/axios";
import { AILoader } from "./AILoader";

const Optimizer = () => {
    // Inject setJd from context
    const { file, setParsedData, setJd } = useResume();
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [localJd, setLocalJd] = useState(
        "We are looking for a Senior Java Developer with 5+ years of experience in Spring Boot, microservices architecture, and cloud platforms (AWS/GCP). The ideal candidate has strong knowledge of REST API design, CI/CD pipelines, and agile methodologies.",
    ); // Rename local state to prevent naming conflict
    const navigate = useNavigate();

    const handleEvaluate = async () => {
        if (!file || !localJd.trim()) {
            alert("Please paste a job description first.");
            return;
        }
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await API.post("/api/resumes/parse", formData);

            setParsedData(response.data);
            setJd(localJd); // FIX: Save the JD globally so the next page can read it
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
    if (loading)
        return (
            <AILoader message="AI is reading and parsing your CV layers..." />
        );
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
                        value={localJd}
                        onChange={(e) => setLocalJd(e.target.value)}
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
