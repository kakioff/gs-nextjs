"use client"

import { signIn } from "next-auth/react"
import UButton from "@/components/ui/Button"
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
    const handleClick = async () => {
        try {
            await signIn(provider, {
                redirect: false
            })
        }catch (err) {
            console.log("error:", err);
        }
        
     }
    return <UButton onClick={handleClick} {...props}>
        {children || <>Link to {providerTitle || provider}</>}
    </UButton>
}