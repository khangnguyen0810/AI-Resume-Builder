import React, { createContext, useContext, useState, ReactNode } from "react";

interface ResumeContextType {
    file: File | null;
    setFile: (file: File | null) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
    const [file, setFile] = useState<File | null>(null);
    return (
        <>
            <ResumeContext value={{ file, setFile }}>{children}</ResumeContext>
        </>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context)
        throw new Error("useResume must be used within a ResumeProvider");
    return context;
};
