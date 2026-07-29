import type { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

/**
 * A performant layout wrapper that triggers a CSS entry animation upon route changes.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    return <div className="animate-fade-in h-full w-full">{children}</div>;
};

