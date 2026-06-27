import { type ParsedResume } from "../types/resume";
import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface ResumeContextType {
    file: File | null;
    setFile: (file: File | null) => void;
    parsedData: ParsedResume | null;
    setParsedData: (data: ParsedResume | null) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
    const [file, setFile] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
    return (
        <>
            <ResumeContext value={{ file, setFile, parsedData, setParsedData }}>
                {children}
            </ResumeContext>
        </>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context)
        throw new Error("useResume must be used within a ResumeProvider");
    return context;
};
