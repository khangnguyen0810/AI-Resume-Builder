import React, { useRef, ChangeEvent } from "react";

const Home = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };
  return (
    <>
      <div className="grid w-full grid-cols-2">
        <div>
          <div className="font-montserrat to-danger mt-40 bg-gradient-to-r from-[#FF8C00] via-[#FF4640] to-[#DC143C] bg-clip-text text-[64px] font-extrabold text-transparent italic">
            Stop being a ghost to recruiters!
          </div>
          <div className="font-montserrat mt-5 text-[22px]">
            Most resumes are rejected by bots before a human ever sees them. Our
            AI analyzes your skills and the job description to build a 100%
            ATS-optimized PDF that gets you the interview.
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
            className="mt-10 cursor-pointer rounded bg-gradient-to-r from-[#fdd9ae] via-[#FF4640] to-[#DC143C] px-8 py-4 text-white"
          >
            Upload & Optimize
          </button>
          <button className="ml-5 cursor-pointer rounded bg-gray-500 px-6 py-4 text-white">
            Start from scratch
          </button>
        </div>
        <img src="Resume.png" alt="" />
      </div>
    </>
  );
};

export default Home;
