import { useState, useEffect } from "react";
import { useResume } from "../context/ResumeContext";
import API from "../lib/axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClassicTemplate } from "./templates/ClassicTemplate";

const Evaluation = () => {
    const { parsedData, jd, optimizedData, setOptimizedData } = useResume();
    const [loadingOptimize, setLoadingOptimize] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (parsedData && jd && !optimizedData && !loadingOptimize) {
            const fetchOptimization = async () => {
                setLoadingOptimize(true);
                try {
                    const response = await API.post("/api/resumes/optimize", {
                        jd: jd,
                        parsedResumeDTO: parsedData,
                    });
                    setOptimizedData(response.data);
                } catch (err) {
                    console.error("Optimization failed", err);
                } finally {
                    setLoadingOptimize(false);
                }
            };
            fetchOptimization();
        }
    }, [parsedData, jd, optimizedData]);

    if (!parsedData) {
        return (
            <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-500">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="text-slate-400">No data found. Please upload a CV first.</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in flex flex-col gap-6">
            {/* Top Bar Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div>
                    <h1 className="font-heading text-2xl font-bold text-white">
                        Resume Analysis & Optimization Comparison
                    </h1>
                    <p className="text-xs text-slate-400">
                        Side-by-side evaluation of your uploaded CV vs. AI ATS-optimized version
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 font-mono text-xs text-slate-400">
                        <span className="h-2 w-2 rounded-full bg-slate-500"></span>
                        Original
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                        ATS Enhanced
                    </span>
                </div>
            </div>

            {/* Split Comparison Columns */}
            <div className="flex flex-col gap-6 lg:flex-row lg:h-[calc(100vh-210px)]">
                {/* COLUMN 1: Original Uploaded Resume */}
                <div className="custom-scrollbar flex-1 overflow-y-auto rounded-2xl border border-slate-800/80 bg-[#0d121d] p-6 lg:p-8 shadow-xl">
                    <div className="mb-6 flex items-center justify-between border-b border-slate-800/80 pb-4">
                        <span className="rounded border border-slate-700/60 bg-slate-800/50 px-2.5 py-1 font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Original Parsing
                        </span>
                        <span className="font-mono text-xs text-slate-500">RAW DATA</span>
                    </div>

                    <header className="mb-6">
                        <h2 className="font-heading text-2xl font-bold text-white">
                            {parsedData.personalInfo.fullName}
                        </h2>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-slate-400">
                            <span>{parsedData.personalInfo.email}</span>
                            <span>•</span>
                            <span>{parsedData.personalInfo.phone}</span>
                            <span>•</span>
                            <span>{parsedData.personalInfo.location}</span>
                        </div>
                    </header>

                    {/* Summary */}
                    <section className="mb-6 border-t border-slate-800/60 pt-4">
                        <h3 className="mb-2 font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
                            Summary
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-300">
                            {parsedData.summary}
                        </p>
                    </section>

                    {/* Experience */}
                    <section className="mb-6 border-t border-slate-800/60 pt-4">
                        <h3 className="mb-4 font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
                            Experience
                        </h3>
                        {parsedData.experience.map((exp, i) => (
                            <div key={i} className="mb-5 last:mb-0">
                                <div className="flex items-baseline justify-between">
                                    <h4 className="font-semibold text-white text-sm">
                                        {exp.jobTitle}
                                    </h4>
                                    <span className="font-mono text-xs text-slate-500">
                                        {exp.duration}
                                    </span>
                                </div>
                                <p className="text-xs font-medium text-slate-400">
                                    {exp.company}
                                </p>
                                <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside">
                                    {exp.responsibilities.map((resp, j) => (
                                        <li key={j} className="leading-relaxed">
                                            {resp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>

                    {/* Education */}
                    <section className="mb-6 border-t border-slate-800/60 pt-4">
                        <h3 className="mb-4 font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
                            Education
                        </h3>
                        {parsedData.education.map((edu, i) => (
                            <div key={i} className="mb-4 last:mb-0">
                                <div className="flex items-baseline justify-between">
                                    <h4 className="font-semibold text-white text-sm">
                                        {edu.school}
                                    </h4>
                                    <span className="font-mono text-xs text-slate-500">
                                        {edu.duration}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-300">
                                    {edu.degree} in {edu.fieldOfStudy}
                                </p>
                            </div>
                        ))}
                    </section>

                    {/* Skills */}
                    <section className="border-t border-slate-800/60 pt-4">
                        <h3 className="mb-3 font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
                            Parsed Skills
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                            {parsedData.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="rounded border border-slate-800 bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-400"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                {/* COLUMN 2: AI-Optimized Resume */}
                <div className="custom-scrollbar flex-1 overflow-y-auto rounded-2xl border border-emerald-500/40 bg-[#0d121d] p-6 lg:p-8 shadow-[0_0_30px_rgba(16,185,129,0.06)]">
                    <div className="mb-6 flex items-center justify-between border-b border-emerald-500/20 pb-4">
                        <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                            ATS Optimized Version
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            AI TAILORED
                        </span>
                    </div>

                    {loadingOptimize ? (
                        <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
                            <p className="animate-pulse text-sm font-medium text-emerald-300 font-mono">
                                Rewriting bullets for max ATS match score...
                            </p>
                        </div>
                    ) : optimizedData ? (
                        <>
                            {/* Header Info */}
                            <header className="mb-6">
                                <h2 className="font-heading text-2xl font-bold text-white">
                                    {optimizedData.personalInfo.fullName}
                                </h2>
                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-emerald-400/80">
                                    <span>{optimizedData.personalInfo.email}</span>
                                    <span>•</span>
                                    <span>{optimizedData.personalInfo.phone}</span>
                                    <span>•</span>
                                    <span>{optimizedData.personalInfo.location}</span>
                                </div>
                            </header>

                            {/* Summary Section */}
                            <section className="mb-6 border-t border-emerald-500/20 pt-4">
                                <h3 className="mb-2 font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase">
                                    Executive Summary (Keywords Added)
                                </h3>
                                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm leading-relaxed text-slate-200">
                                    {optimizedData.summary}
                                </div>
                            </section>

                            {/* Experience Section */}
                            <section className="mb-6 border-t border-emerald-500/20 pt-4">
                                <h3 className="mb-4 font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase">
                                    Impact-Optimized Experience
                                </h3>
                                {optimizedData.experience.map((exp, i) => (
                                    <div key={i} className="mb-5 last:mb-0">
                                        <div className="flex items-baseline justify-between">
                                            <h4 className="font-semibold text-white text-sm">
                                                {exp.jobTitle}
                                            </h4>
                                            <span className="font-mono text-xs text-slate-500">
                                                {exp.duration}
                                            </span>
                                        </div>
                                        <p className="text-xs font-medium text-emerald-400/90">
                                            {exp.company}
                                        </p>
                                        <ul className="mt-2 space-y-1.5 text-xs text-slate-200 list-disc list-inside">
                                            {exp.responsibilities.map((resp, j) => (
                                                <li key={j} className="leading-relaxed">
                                                    {resp}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </section>

                            {/* Education Section */}
                            <section className="mb-6 border-t border-emerald-500/20 pt-4">
                                <h3 className="mb-4 font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase">
                                    Education
                                </h3>
                                {optimizedData.education.map((edu, i) => (
                                    <div key={i} className="mb-4 last:mb-0">
                                        <div className="flex items-baseline justify-between">
                                            <h4 className="font-semibold text-white text-sm">
                                                {edu.school}
                                            </h4>
                                            <span className="font-mono text-xs text-slate-500">
                                                {edu.duration}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-300">
                                            {edu.degree} in {edu.fieldOfStudy}
                                        </p>
                                    </div>
                                ))}
                            </section>

                            {/* Skills Section */}
                            <section className="mb-8 border-t border-emerald-500/20 pt-4">
                                <h3 className="mb-3 font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase">
                                    Matched Skills & Technical Keywords
                                </h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {optimizedData.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* EXPORT PANEL SECTION */}
                            <section className="mt-8 border-t border-slate-800 pt-6">
                                <h3 className="mb-3 font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
                                    Export & PDF Blueprint Selection
                                </h3>

                                <div className="flex flex-col gap-4">
                                    {/* Template Selection Card Wrapper */}
                                    <div
                                        onMouseEnter={() => setShowPreview(true)}
                                        onMouseLeave={() => setShowPreview(false)}
                                        className="relative flex cursor-help items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition-all duration-200 hover:border-emerald-500/50 hover:bg-slate-900"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold text-xs">
                                                ✓
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">
                                                    Classic Executive PDF Template
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    Clean single-column layout preferred by corporate ATS systems
                                                </p>
                                            </div>
                                        </div>
                                        <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                                            Default
                                        </span>

                                        {/* DYNAMIC HOVER TOOLTIP PREVIEW LAYER */}
                                        {showPreview && (
                                            <div className="absolute right-0 bottom-full z-50 mb-3 w-64 rounded-2xl border border-slate-700 bg-[#0b0f17] p-4 shadow-2xl transition-all duration-300">
                                                <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-1.5">
                                                    <span className="font-mono text-[10px] font-bold tracking-wide text-slate-400 uppercase">
                                                        Blueprint Page Map
                                                    </span>
                                                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                                                        A4 Format
                                                    </span>
                                                </div>

                                                {/* Structural Mockup Map */}
                                                <div className="flex aspect-[1/1.414] w-full flex-col gap-2 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-3 select-none">
                                                    <div className="h-2 w-3/4 rounded bg-emerald-500/80"></div>
                                                    <div className="flex gap-1.5">
                                                        <div className="h-1 w-1/5 rounded bg-slate-700"></div>
                                                        <div className="h-1 w-1/5 rounded bg-slate-700"></div>
                                                        <div className="h-1 w-1/5 rounded bg-slate-700"></div>
                                                    </div>
                                                    <div className="my-0.5 h-[0.5px] bg-slate-800" />

                                                    <div className="h-1.5 w-1/4 rounded bg-emerald-500/60"></div>
                                                    <div className="space-y-1">
                                                        <div className="h-1 w-full rounded bg-slate-800"></div>
                                                        <div className="h-1 w-full rounded bg-slate-800"></div>
                                                        <div className="h-1 w-5/6 rounded bg-slate-800"></div>
                                                    </div>

                                                    <div className="mt-1 h-1.5 w-1/3 rounded bg-emerald-500/60"></div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="h-1.5 w-1/2 rounded bg-slate-700"></div>
                                                        <div className="h-1 w-1/6 rounded bg-slate-800"></div>
                                                    </div>
                                                    <div className="space-y-1 pl-1">
                                                        <div className="h-1 w-full rounded bg-slate-800"></div>
                                                        <div className="h-1 w-11/12 rounded bg-slate-800"></div>
                                                        <div className="h-1 w-full rounded bg-slate-800"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Download Link Component */}
                                    <PDFDownloadLink
                                        document={
                                            <ClassicTemplate data={optimizedData} />
                                        }
                                        fileName={`${optimizedData.personalInfo.fullName.replace(/\s+/g, "_")}_Optimized_Resume.pdf`}
                                        className="w-full text-center"
                                    >
                                        {({ loading }) => (
                                            <button
                                                disabled={loading}
                                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 font-heading font-semibold text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all hover:brightness-110 active:scale-[0.98] disabled:scale-100 disabled:bg-slate-800 disabled:text-slate-500"
                                            >
                                                <span>
                                                    {loading
                                                        ? "Assembling PDF Layers..."
                                                        : "Download Optimized PDF"}
                                                </span>
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
                                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </PDFDownloadLink>
                                </div>
                            </section>
                        </>
                    ) : (
                        <div className="mt-20 text-center font-mono text-sm text-slate-500">
                            Failed to generate optimization strategy.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Evaluation;

