import React from "react";
import { useResume } from "../context/ResumeContext";

const Evaluation = () => {
    const { parsedData } = useResume();

    if (!parsedData) return <div>No data found. Please upload a CV first.</div>;

    return (
        <div className="flex h-[calc(100vh-100px)] gap-8 p-6">
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

            {/* Column 2: AI Suggestions (Placeholder for next step) */}
            <div className="w-1/3 overflow-y-auto rounded-xl border bg-gray-900 p-8 text-white shadow-xl">
                <h2 className="mb-4 text-2xl font-bold">AI Optimizer Agent</h2>
                <p className="text-gray-400 italic">
                    Waiting for your JD evaluation...
                </p>
            </div>
        </div>
    );
};

export default Evaluation;
