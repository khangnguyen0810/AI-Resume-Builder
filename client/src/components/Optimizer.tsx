import { useState, useEffect } from "react";
import { useResume } from "../context/ResumeContext";
import { useNavigate, Link } from "react-router-dom";
import API from "../lib/axios";
import { AILoader } from "./AILoader";

const Optimizer = () => {
    const { file, setParsedData, setJd } = useResume();
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [localJd, setLocalJd] = useState("");
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
            setJd(localJd);
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

    if (loading) {
        return (
            <AILoader message="AI is reading and parsing your CV layers..." />
        );
    }

    const wordCount = localJd.trim() ? localJd.trim().split(/\s+/).length : 0;
    const charCount = localJd.length;

    return (
        <div className="animate-fade-in flex flex-col gap-6 lg:flex-row lg:h-[calc(100vh-140px)]">
            {/* Left Panel: PDF Preview Shell */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0d121d] shadow-2xl">
                {/* Custom Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs">
                            PDF
                        </div>
                        <span className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider hidden sm:inline">
                            Original CV Preview
                        </span>
                        {file && (
                            <>
                                <span className="text-slate-700 hidden sm:inline">•</span>
                                <span className="font-mono text-xs text-emerald-400/90 truncate max-w-[180px] sm:max-w-[260px]">
                                    {file.name}
                                </span>
                            </>
                        )}
                    </div>

                    {fileUrl && (
                        <div className="flex items-center gap-2">
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/70 px-3 py-1 font-mono text-xs font-medium text-slate-300 transition-all hover:border-emerald-500/50 hover:bg-slate-800 hover:text-white"
                                title="Open PDF in new tab"
                            >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <span>Full View</span>
                            </a>
                            <Link
                                to="/"
                                className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 font-mono text-xs font-medium text-slate-400 transition-all hover:border-slate-700 hover:text-slate-200"
                            >
                                Change File
                            </Link>
                        </div>
                    )}
                </div>

                {/* PDF Content Area */}
                <div className="relative flex-1 bg-[#090d16] p-2 sm:p-4 overflow-hidden flex justify-center">
                    {fileUrl ? (
                        <div className="h-full w-full max-w-4xl overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950 shadow-2xl">
                            <iframe
                                src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                                className="h-full w-full border-none bg-slate-950"
                                title="Original Resume PDF Preview"
                            />
                        </div>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-600">
                                <svg
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-heading text-lg font-semibold text-slate-300">
                                    No PDF Uploaded
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Upload a PDF resume from the home screen first.
                                </p>
                            </div>
                            <Link
                                to="/"
                                className="mt-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                            >
                                Back to Upload
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Job Description Input Canvas */}
            <div className="flex w-full flex-col gap-4 lg:w-96 xl:w-[420px]">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-heading text-xl font-bold text-white">
                            Target Job Description
                        </h2>
                        <p className="text-xs text-slate-400">
                            Paste the job posting to analyze keyword gaps
                        </p>
                    </div>
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
                        STEP 2/3
                    </span>
                </div>

                {/* Textarea Editor Shell */}
                <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0d121d] shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-4 py-2.5 text-xs font-mono text-slate-400">
                        <span>INPUT_JD.TXT</span>
                        <span>{wordCount} words | {charCount} chars</span>
                    </div>

                    <textarea
                        className="flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                        placeholder="Paste the full job description here (e.g. key responsibilities, required qualifications, technical stack)..."
                        value={localJd}
                        onChange={(e) => setLocalJd(e.target.value)}
                    />
                </div>

                {/* Action CTA Button */}
                <button
                    onClick={handleEvaluate}
                    disabled={loading || !localJd.trim()}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 font-heading font-semibold text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span>{loading ? "AI is reading your CV..." : "Let the AI Evaluate & Optimize"}</span>
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Optimizer;

