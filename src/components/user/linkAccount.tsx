"use client"

import { signIn } from "next-auth/react"
import UButton from "../ui/Button"
import { ButtonProps } from "@nextui-org/react"

interface Props extends ButtonProps {
    provider: string
    providerTitle?: string
}
export default function Link2Account({
    provider,
    providerTitle,
    children,
    ...props
}: Props) {

    return <UButton onClick={() => signIn(provider)} {...props}>
        {children || <>Link to {providerTitle || provider}</>}
    </UButton>
}