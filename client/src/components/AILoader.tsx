import React from "react";

interface AILoaderProps {
    message: string;
}

export const AILoader: React.FC<AILoaderProps> = ({ message }) => {
    return (
        <div className="animate-fade-in fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
            <div className="relative flex flex-col items-center">
                {/* Cute Animated Robot SVG */}
                <svg
                    className="h-24 w-24 animate-bounce text-blue-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7v4" />
                    <line x1="8" y1="16" x2="8.01" y2="16" />
                    <line x1="16" y1="16" x2="16.01" y2="16" />
                </svg>

                {/* Pulsing Glow Ring */}
                <div className="absolute top-4 h-20 w-20 animate-ping rounded-full border-2 border-blue-400 opacity-25"></div>

                {/* Status Messages */}
                <h3 className="font-montserrat mt-6 text-center text-xl font-semibold tracking-wide text-slate-800">
                    {message}
                </h3>
                <p className="mt-2 animate-pulse text-sm font-medium text-slate-500">
                    This may take a few seconds...
                </p>
            </div>
        </div>
    );
};
