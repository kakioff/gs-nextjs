"use client"

import { useLayoutContext } from "@/provider/layoutContext"

export default function SetFullWidth() {
    const layoutConfig = useLayoutContext()
    layoutConfig.fullWidth = true
    return <></>
}