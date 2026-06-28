import type { ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
}

/**
 * A highly performant layout wrapper that triggers a hardware-accelerated
 * CSS transition upon route changes.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    return <div className="animate-page-entry h-full w-full">{children}</div>;
};
