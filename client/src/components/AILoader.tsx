import React from "react";

interface AILoaderProps {
    message: string;
}

export const AILoader: React.FC<AILoaderProps> = ({ message }) => {
    return (
        <div className="animate-fade-in fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0f17]/90 backdrop-blur-md">
            <div className="relative flex flex-col items-center p-8 text-center max-w-sm">
                {/* Orbit Loading Animation Container */}
                <div className="relative flex h-24 w-24 items-center justify-center mb-6">
                    {/* Outer Glowing Pulsing Ring */}
                    <div className="absolute inset-0 animate-ping rounded-full border border-emerald-500/30 bg-emerald-500/10 opacity-30"></div>
                    
                    {/* Outer Rotating Segment Ring */}
                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-slate-800 border-t-emerald-400 border-r-teal-400" style={{ animationDuration: '1.5s' }}></div>

                    {/* Inner Reverse Rotating Ring */}
                    <div className="absolute inset-2 animate-spin rounded-full border-2 border-slate-800 border-b-amber-400" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>

                    {/* Center Core Badge */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 font-mono text-xs font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        AI
                    </div>
                </div>

                {/* Status Messages */}
                <h3 className="font-heading text-lg font-bold tracking-tight text-white">
                    {message}
                </h3>
                <p className="mt-2 font-mono text-xs text-slate-400 animate-pulse">
                    Processing ATS keywords & structuring layout...
                </p>

                {/* Ambient Progress Line */}
                <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-full animate-pulse bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-300"></div>
                </div>
            </div>
        </div>
    );
};

