"use client"
import { createContext, useContext, useState } from "react";

interface Props {
    fullWidth?: boolean;
}
const LayoutContext = createContext<Props>({});
export const useLayoutContext = () => useContext(LayoutContext);

export default function LayoutProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = {}
    return <LayoutContext.Provider value={data}>
        {children}
    </LayoutContext.Provider>
}