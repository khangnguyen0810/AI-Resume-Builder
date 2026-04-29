import React, { type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Container = ({ children }: Props) => {
    return (
        <>
            <div className="mx-auto w-full max-w-[1440px]">{children}</div>
        </>
    );
};

export default Container;
