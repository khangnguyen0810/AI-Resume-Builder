import type { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";

interface Props {
    children: ReactNode;
}

const Container = ({ children }: Props) => {
    const location = useLocation();

    // Compute active step based on current path
    const getStepStatus = (stepPath: string) => {
        if (stepPath === "/") {
            return location.pathname === "/" ? "active" : "completed";
        }
        if (stepPath === "/optimize") {
            if (location.pathname === "/") return "pending";
            if (location.pathname === "/optimize") return "active";
            return "completed";
        }
        if (stepPath === "/evaluate") {
            return location.pathname === "/evaluate" ? "active" : "pending";
        }
        return "pending";
    };

    const steps = [
        { num: "01", label: "Upload CV", path: "/" },
        { num: "02", label: "Match JD", path: "/optimize" },
        { num: "03", label: "ATS Optimization", path: "/evaluate" },
    ];

    return (
        <div className="min-h-screen bg-[#0b0f17] bg-grid-pattern text-slate-100 antialiased">
            {/* Top Sticky Header */}
            <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-[#0b0f17]/85 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Brand */}
                    <Link to="/" className="group flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 font-mono text-sm font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-colors group-hover:border-emerald-400 group-hover:bg-emerald-500/20">
                            CV
                        </div>
                        <div>
                            <span className="font-heading text-lg font-bold tracking-tight text-white">
                                AI RESUME <span className="text-emerald-400">BUILDER</span>
                            </span>
                            <span className="ml-2 hidden rounded border border-slate-700/60 bg-slate-800/40 px-1.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-slate-400 uppercase sm:inline-block">
                                ATS Engine v2
                            </span>
                        </div>
                    </Link>

                    {/* Step Navigation Progress Bar */}
                    <nav className="flex items-center gap-1 sm:gap-2">
                        {steps.map((step, idx) => {
                            const status = getStepStatus(step.path);
                            return (
                                <div key={step.path} className="flex items-center">
                                    <div
                                        className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition-all ${
                                            status === "active"
                                                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                                                : status === "completed"
                                                ? "border-slate-800 bg-slate-900/60 text-slate-300"
                                                : "border-slate-800/50 bg-transparent text-slate-600"
                                        }`}
                                    >
                                        <span
                                            className={`font-mono text-[10px] font-bold ${
                                                status === "active"
                                                    ? "text-emerald-400"
                                                    : status === "completed"
                                                    ? "text-emerald-500/70"
                                                    : "text-slate-600"
                                            }`}
                                        >
                                            {step.num}
                                        </span>
                                        <span className="hidden sm:inline">
                                            {step.label}
                                        </span>
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div
                                            className={`mx-1 h-[1px] w-3 sm:w-6 ${
                                                status === "completed"
                                                    ? "bg-emerald-500/40"
                                                    : "bg-slate-800"
                                            }`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>
            </header>

            {/* Main Application Body */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
};

export default Container;

