import { useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { AILoader } from "./AILoader"; // Make sure the path matches your folder structure

const Home = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { setFile } = useResume();

    // Senior Pattern: Manage a local transient state for route transitions
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsTransitioning(true);

            // Perceived Performance Engineering: Give the loader time to animate smoothly
            // This prevents an abrupt layout jump while the browser switches route contexts
            setTimeout(() => {
                navigate("/optimize");
            }, 1000); // 1 second is the sweet spot for a micro-interaction transition
        }
    };

    return (
        <>
            {/* Render the overlay blocking screen first if transitioning */}
            {isTransitioning && (
                <AILoader message="Preparing your resume preview..." />
            )}

            <div className="grid w-full grid-cols-2">
                <div>
                    <div className="font-montserrat to-danger mt-40 bg-gradient-to-r from-[#FF8C00] via-[#FF4640] to-[#DC143C] bg-clip-text text-[64px] font-extrabold text-transparent italic">
                        Stop being a ghost to recruiters!
                    </div>
                    <div className="font-montserrat mt-5 text-[22px]">
                        Most resumes are rejected by bots before a human ever
                        sees them. Our AI analyzes your skills and the job
                        description to build a 100% ATS-optimized PDF that gets
                        you the interview.
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf"
                        style={{ display: "none" }}
                    />

                    <button
                        onClick={handleUploadClick}
                        className="mt-10 cursor-pointer rounded bg-gradient-to-r from-[#FF8C00] via-[#FF4640] to-[#DC143C] px-8 py-4 font-medium text-white transition-transform active:scale-95"
                    >
                        Upload & Optimize
                    </button>
                </div>
                <img src="Resume.png" alt="Resume Preview" />
            </div>
        </>
    );
};

export default Home;
