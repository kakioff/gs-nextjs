import React from "react"

export default function Template({ children }: { children: React.ReactNode }) {
    // const layoutConfig = useLayoutContext()
    // 给children传递参数
    return <div className="container mx-auto relative h-[calc(100%-64px)]">
        {/* {JSON.stringify(layoutConfig)} */}
        {children}
    </div>
}