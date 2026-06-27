// client/src/context/ResumeContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import { type ParsedResume } from "../types/resume";

interface ResumeContextType {
    file: File | null;
    setFile: (file: File | null) => void;
    parsedData: ParsedResume | null;
    setParsedData: (data: ParsedResume | null) => void;
    jd: string; // Add this
    setJd: (jd: string) => void; // Add this
    optimizedData: ParsedResume | null; // Add this
    setOptimizedData: (data: ParsedResume | null) => void; // Add this
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
    const [file, setFile] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
    const [jd, setJd] = useState<string>("");
    const [optimizedData, setOptimizedData] = useState<ParsedResume | null>(
        null,
    );

    return (
        <ResumeContext.Provider
            value={{
                file,
                setFile,
                parsedData,
                setParsedData,
                jd,
                setJd,
                optimizedData,
                setOptimizedData,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context)
        throw new Error("useResume must be used within a ResumeProvider");
    return context;
};
