import React, { useState, useEffect, useEffectEvent } from "react";
import { useResume } from "../context/ResumeContext";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClassicTemplate } from "./templates/ClassicTemplate";

const Evaluation = () => {
    const { parsedData, jd, optimizedData, setOptimizedData } = useResume();
    const [loadingOptimize, setLoadingOptimize] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        // Only run optimization if we have parsed data, a JD, and haven't optimized yet
        if (parsedData && jd && !optimizedData && !loadingOptimize) {
            const fetchOptimization = async () => {
                setLoadingOptimize(true);
                try {
                    // Match the OptimizeRequestDTO contract from your backend
                    const response = await axios.post(
                        "http://localhost:8080/api/resumes/optimize",
                        {
                            jd: jd,
                            parsedResumeDTO: parsedData,
                        },
                    );
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

    if (!parsedData) return <div>No data found. Please upload a CV first.</div>;

    return (
        <div className="flex h-[calc(100vh-100px)] gap-8 p-6">
            {/* COLUMN 1: User-uploaded Resume */}
            <div className="custom-scrollbar flex-1 overflow-y-auto rounded-xl border bg-white p-10 shadow-2xl">
                <header className="mb-6 border-b pb-6">
                    <h1 className="text-4xl font-bold text-gray-800">
                        {parsedData.personalInfo.fullName}
                    </h1>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>{parsedData.personalInfo.email}</span>
                        <span>{parsedData.personalInfo.phone}</span>
                        <span>{parsedData.personalInfo.location}</span>
                    </div>
                </header>

                <section className="mb-8">
                    <h2 className="mb-2 text-lg font-semibold tracking-wider text-red-600 uppercase">
                        Summary
                    </h2>
                    <p className="leading-relaxed text-gray-700">
                        {parsedData.summary}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="mb-4 text-lg font-semibold tracking-wider text-red-600 uppercase">
                        Education
                    </h2>
                    {parsedData.education.map((edu, i) => (
                        <div key={i} className="mb-6">
                            <div className="flex items-baseline justify-between">
                                <h3 className="font-bold text-gray-800">
                                    {edu.school}
                                </h3>
                                <span className="text-sm text-gray-500 italic">
                                    {edu.duration}
                                </span>
                            </div>
                            <p className="font-medium text-gray-600">
                                {edu.degree}
                            </p>
                            <p className="text-gray-600">{edu.fieldOfStudy}</p>
                        </div>
                    ))}
                </section>
                <section>
                    <h2 className="mb-4 text-lg font-semibold tracking-wider text-red-600 uppercase">
                        Experience
                    </h2>
                    {parsedData.experience.map((exp, i) => (
                        <div key={i} className="mb-6">
                            <div className="flex items-baseline justify-between">
                                <h3 className="font-bold text-gray-800">
                                    {exp.jobTitle}
                                </h3>
                                <span className="text-sm text-gray-500 italic">
                                    {exp.duration}
                                </span>
                            </div>
                            <p className="font-medium text-gray-600">
                                {exp.company}
                            </p>
                            <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
                                {exp.responsibilities.map((resp, j) => (
                                    <li key={j} className="text-sm">
                                        {resp}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <section>
                    <h2 className="mb-4 text-lg font-semibold tracking-wider text-red-600 uppercase">
                        Skills
                    </h2>
                    <div className="grid list-inside grid-cols-2">
                        {parsedData.skills.map((skill, i) => (
                            <li key={i}>{skill}</li>
                        ))}
                    </div>
                </section>
            </div>

            {/* COLUMN 2: AI-Optimized Resume */}
            <div className="custom-scrollbar flex-1 overflow-y-auto rounded-xl border border-blue-200 bg-blue-50/30 p-10 shadow-2xl">
                <div className="mb-4 inline-block rounded bg-blue-600 px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase">
                    ATS Optimized Version
                </div>

                {loadingOptimize ? (
                    <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                        <p className="animate-pulse text-lg font-medium text-blue-800">
                            AI is tailoring your resume to the Job
                            Description...
                        </p>
                    </div>
                ) : optimizedData ? (
                    <>
                        {/* Header Info */}
                        <header className="mb-6 border-b border-blue-200 pb-6">
                            <h1 className="text-4xl font-bold text-slate-900">
                                {optimizedData.personalInfo.fullName}
                            </h1>
                            <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
                                <span>{optimizedData.personalInfo.email}</span>
                                <span>{optimizedData.personalInfo.phone}</span>
                                <span>
                                    {optimizedData.personalInfo.location}
                                </span>
                            </div>
                        </header>

                        {/* Summary Section */}
                        <section className="mb-8">
                            <h2 className="mb-2 text-lg font-semibold tracking-wider text-blue-700 uppercase">
                                Summary
                            </h2>
                            <p className="rounded border border-yellow-100 bg-yellow-50 p-2 leading-relaxed font-medium text-slate-800">
                                {optimizedData.summary}
                            </p>
                        </section>

                        {/* Education Section (Newly Fixed & Aligned) */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-lg font-semibold tracking-wider text-blue-700 uppercase">
                                Education
                            </h2>
                            {optimizedData.education.map((edu, i) => (
                                <div key={i} className="mb-6">
                                    <div className="flex items-baseline justify-between">
                                        <h3 className="font-bold text-slate-900">
                                            {edu.school}
                                        </h3>
                                        <span className="text-sm text-slate-500 italic">
                                            {edu.duration}
                                        </span>
                                    </div>
                                    <p className="font-medium text-slate-700">
                                        {edu.degree}
                                    </p>
                                    <p className="text-slate-600">
                                        {edu.fieldOfStudy}
                                    </p>
                                </div>
                            ))}
                        </section>

                        {/* Experience Section */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-lg font-semibold tracking-wider text-blue-700 uppercase">
                                Experience
                            </h2>
                            {optimizedData.experience.map((exp, i) => (
                                <div key={i} className="mb-6">
                                    <div className="flex items-baseline justify-between">
                                        <h3 className="font-bold text-slate-900">
                                            {exp.jobTitle}
                                        </h3>
                                        <span className="text-sm text-slate-500 italic">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <p className="font-medium text-slate-700">
                                        {exp.company}
                                    </p>
                                    <ul className="mt-2 list-inside list-disc space-y-1 text-slate-800">
                                        {exp.responsibilities.map((resp, j) => (
                                            <li key={j} className="text-sm">
                                                {resp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>

                        {/* Skills Section (Newly Fixed & Aligned) */}
                        {/* Skills Section */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-lg font-semibold tracking-wider text-blue-700 uppercase">
                                Skills
                            </h2>
                            <div className="grid list-inside grid-cols-2 text-slate-800">
                                {optimizedData.skills.map((skill, i) => (
                                    <li key={i}>{skill}</li>
                                ))}
                            </div>
                        </section>

                        {/* EXPORT PANEL SECTION */}
                        <section className="mt-10 border-t border-blue-200 pt-6">
                            <h3 className="mb-3 text-sm font-bold tracking-wider text-blue-800 uppercase">
                                Select Export Format
                            </h3>

                            <div className="flex flex-col gap-4">
                                {/* Template Selection Card Wrapper Container */}
                                <div
                                    onMouseEnter={() => setShowPreview(true)}
                                    onMouseLeave={() => setShowPreview(false)}
                                    className="relative flex cursor-help items-center justify-between rounded-lg border border-blue-300 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-blue-100">
                                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                Classic Executive Template
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Traditional single-column layout
                                                preferred by corporate
                                                recruiters
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                                        Default
                                    </span>

                                    {/* DYNAMIC HOVER TOOLTIP PREVIEW LAYER */}
                                    {showPreview && (
                                        <div className="absolute right-0 bottom-full z-50 mb-3 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-2xl transition-all duration-300">
                                            <div className="mb-2 flex items-center justify-between border-b pb-1.5">
                                                <span className="text-[10px] font-bold tracking-wide text-slate-500 uppercase">
                                                    Layout Blueprint Preview
                                                </span>
                                                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">
                                                    A4 Page Map
                                                </span>
                                            </div>

                                            {/* Highly Performant Structural Mockup Map */}
                                            <div className="flex aspect-[1/1.414] w-full flex-col gap-2 overflow-hidden rounded border border-slate-300 bg-white p-3 shadow-inner select-none">
                                                {/* Mock PII Header Area */}
                                                <div className="h-2 w-3/4 rounded-sm bg-blue-900"></div>
                                                <div className="flex gap-1.5">
                                                    <div className="h-1 w-1/5 rounded-sm bg-slate-300"></div>
                                                    <div className="h-1 w-1/5 rounded-sm bg-slate-300"></div>
                                                    <div className="h-1 w-1/5 rounded-sm bg-slate-300"></div>
                                                </div>
                                                <div className="my-0.5 h-[0.5px] bg-slate-200" />

                                                {/* Mock Summary block */}
                                                <div className="h-1.5 w-1/4 rounded-sm bg-blue-700"></div>
                                                <div className="space-y-1">
                                                    <div className="h-1 w-full rounded-sm bg-slate-100"></div>
                                                    <div className="h-1 w-full rounded-sm bg-slate-100"></div>
                                                    <div className="h-1 w-5/6 rounded-sm bg-slate-100"></div>
                                                </div>

                                                {/* Mock Experience block */}
                                                <div className="mt-1 h-1.5 w-1/3 rounded-sm bg-blue-700"></div>
                                                <div className="flex items-center justify-between">
                                                    <div className="h-1.5 w-1/2 rounded-sm bg-slate-400"></div>
                                                    <div className="h-1 w-1/6 rounded-sm bg-slate-300"></div>
                                                </div>
                                                <div className="space-y-1 pl-1">
                                                    <div className="h-1 w-full rounded-sm bg-slate-100"></div>
                                                    <div className="h-1 w-11/12 rounded-sm bg-slate-100"></div>
                                                    <div className="h-1 w-full rounded-sm bg-slate-100"></div>
                                                </div>

                                                {/* Mock Education block */}
                                                <div className="mt-1 h-1.5 w-1/4 rounded-sm bg-blue-700"></div>
                                                <div className="flex items-center justify-between">
                                                    <div className="h-1.5 w-2/5 rounded-sm bg-slate-400"></div>
                                                    <div className="h-1 w-1/6 rounded-sm bg-slate-300"></div>
                                                </div>
                                                <div className="h-1 w-1/3 rounded-sm bg-slate-200"></div>

                                                {/* Mock Skills grid block */}
                                                <div className="mt-1 h-1.5 w-1/4 rounded-sm bg-blue-700"></div>
                                                <div className="grid grid-cols-3 gap-1">
                                                    <div className="h-2 rounded-sm border border-slate-200 bg-slate-100"></div>
                                                    <div className="h-2 rounded-sm border border-slate-200 bg-slate-100"></div>
                                                    <div className="h-2 rounded-sm border border-slate-200 bg-slate-100"></div>
                                                    <div className="h-2 rounded-sm border border-slate-200 bg-slate-100"></div>
                                                    <div className="h-2 rounded-sm border border-slate-200 bg-slate-100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Dynamic Download Link Block */}
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
                                            className="font-montserrat w-full cursor-pointer rounded bg-[#003ae7] py-3 font-medium text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:bg-gray-400"
                                        >
                                            {loading
                                                ? "Assembling PDF Layers..."
                                                : "Download Optimized PDF"}
                                        </button>
                                    )}
                                </PDFDownloadLink>
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="mt-20 text-center text-gray-500">
                        Failed to generate optimization strategy.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Evaluation;
