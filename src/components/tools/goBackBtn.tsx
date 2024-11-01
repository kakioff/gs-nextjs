"use client"

import React from "react"
import UButton from "../ui/Button"
import { ButtonProps } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export default function GoBackBtn({
    children,
    ...props
}: ButtonProps) {
    const router = useRouter()

    return <UButton {...props} onClick={() => router.back()}>
        {children || "返回"}
    </UButton>
}