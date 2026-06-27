export interface ParsedResume {
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
    };
    experience: Array<{
        jobTitle: string;
        company: string;
        duration: string;
        responsibilities: string[];
    }>;
    education: Array<{
        school: string;
        degree: string;
        fieldOfStudy: string;
        duration: string;
    }>;
    skills: string[];
    summary: string;
}
