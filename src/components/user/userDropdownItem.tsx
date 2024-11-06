"use client"

import { signOut } from "@/auth"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Props {
    children?: React.ReactNode
}
export default function UserDropdownItems({
    children = "Dropdown"
}: Props) {
    const router = useRouter()

    const items = [{
        label: "Profile",
        onClick: () => router.push("/user")
    }, {
        label: "Logout",
        onClick: ()=>signOut(),
        color: "danger"
    }]
    return <Dropdown>
        <DropdownTrigger>
            {children}
        </DropdownTrigger>
        <DropdownMenu items={items}>
            {item => <DropdownItem
                key={item.label}
                onClick={item.onClick}
                color={item.color as "primary" || "default"}>
                {item.label}
            </DropdownItem>}
        </DropdownMenu>
    </Dropdown >
}