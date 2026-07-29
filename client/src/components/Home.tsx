import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { AILoader } from "./AILoader";

const Home = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { setFile } = useResume();

    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const processFile = (selectedFile: File) => {
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setIsTransitioning(true);

            setTimeout(() => {
                navigate("/optimize");
            }, 1000);
        } else if (selectedFile) {
            alert("Please upload a valid PDF document.");
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            processFile(selectedFile);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            processFile(droppedFile);
        }
    };

    return (
        <>
            {isTransitioning && (
                <AILoader message="Preparing your resume preview..." />
            )}

            <div className="animate-fade-in relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 lg:py-8">
                {/* Left Column: Hero Copy & Upload Area */}
                <div className="flex flex-col lg:col-span-7">
                    {/* Badge */}
                    <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs font-medium text-emerald-400">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        </span>
                        ATS REJECTION PREVENTATIVE ENGINE
                    </div>

                    {/* Headline */}
                    <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                        Stop being a <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">ghost</span> to recruiters.
                    </h1>

                    {/* Body */}
                    <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
                        Most resumes are rejected by bots before a human ever sees them. Our AI analyzes your skills and the job description to build a 100% ATS-optimized PDF that gets you the interview.
                    </p>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf"
                        style={{ display: "none" }}
                    />

                    {/* Interactive Drag & Drop Upload Zone */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleUploadClick}
                        className={`group relative mt-8 cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
                            isDragging
                                ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                                : "border-slate-800 bg-slate-900/40 hover:border-emerald-500/50 hover:bg-slate-900/80 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)]"
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/80 text-emerald-400 transition-transform duration-300 group-hover:scale-110 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10">
                                <svg
                                    className="h-7 w-7"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-base font-semibold text-white group-hover:text-emerald-300">
                                    Click to upload or drag & drop
                                </p>
                                <p className="mt-1 font-mono text-xs text-slate-500">
                                    PDF documents up to 10MB
                                </p>
                            </div>
                        </div>

                        {/* Action CTA Button */}
                        <div className="mt-6 flex justify-center">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3.5 font-heading font-semibold text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all hover:brightness-110 active:scale-95"
                            >
                                <span>Upload & Optimize CV</span>
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

                    {/* Trust Indicators */}
                    <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-slate-800/80 pt-6 text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400">✓</span> No Sign-up Required
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400">✓</span> Standard Single-Column PDF
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400">✓</span> Real-Time Skill Matching
                        </div>
                    </div>
                </div>

                {/* Right Column: Interactive Frame Preview */}
                <div className="relative flex justify-center lg:col-span-5">
                    {/* Glowing Ambient Backdrop */}
                    <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent blur-2xl"></div>

                    {/* Styled Window Shell */}
                    <div className="animate-float relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-[#0d121d] shadow-2xl shadow-black/80">
                        {/* Title Bar */}
                        <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-3">
                            <div className="flex items-center gap-1.5">
                                <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80"></div>
                                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></div>
                                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
                            </div>
                            <span className="font-mono text-[11px] font-medium text-slate-400">
                                sample_resume_preview.pdf
                            </span>
                            <div className="font-mono text-[10px] text-emerald-400">
                                READY
                            </div>
                        </div>

                        {/* Image Canvas */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950 p-3">
                            <img
                                src="Resume.png"
                                alt="Resume Preview"
                                className="h-full w-full rounded border border-slate-800/60 object-top shadow-inner"
                            />

                            {/* Floating Overlay Badge 1 */}
                            <div className="absolute top-8 right-6 rounded-xl border border-emerald-500/30 bg-[#0b0f17]/90 px-3.5 py-2 backdrop-blur-md shadow-lg shadow-black/50">
                                <div className="font-mono text-[10px] text-slate-400">
                                    ATS Match Rate
                                </div>
                                <div className="font-heading text-base font-bold text-emerald-400">
                                    98.4% Match
                                </div>
                            </div>

                            {/* Floating Overlay Badge 2 */}
                            <div className="absolute bottom-8 left-6 rounded-xl border border-slate-700/60 bg-[#0b0f17]/90 px-3.5 py-2 backdrop-blur-md shadow-lg shadow-black/50">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                                    <span className="font-mono text-[11px] font-semibold text-slate-200">
                                        ATS Single Column Format
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

