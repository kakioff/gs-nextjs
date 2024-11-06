"use client"
import { NavbarItem } from "@nextui-org/react"
import ULink from "./ui/Link"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import React, { HTMLAttributes, useEffect, useState } from "react"
import { useToggle } from "@reactuses/core"
import { User } from "next-auth"

interface Props {
    user?: User
    withUser?: boolean
    className?: HTMLAttributes<unknown>["className"]
    itemClassName?: HTMLAttributes<unknown>["className"]
}
export default function RouteMenu({
    user, withUser, className,
    itemClassName
}: Props) {
    const pathname = usePathname(),
        [added, setAdded] = useToggle(false),
        [menuList, setMenuList] = useState([{
            label: "Home",
            path: "/"
        }, {
            label: "About",
            path: "/about",
            index: -1
        }])

    useEffect(() => {
        if (added) return
        if (user) {
            setAdded(true)
            setMenuList(menuList.concat([{
                label: "Dashboard",
                path: "/dashboard"
            }]).concat(withUser ? [{
                label: "User",
                path: "/user"
            }] : []))
        }
    }, [user])
    menuList.sort((a, b) => (b.index || 0) - (a.index || 0))

    const isActive = (path: string) => path == "/" ? pathname == "/" : pathname.startsWith(path)

    return menuList.map(({ label, path }) => <NavbarItem key={path} isActive={isActive(path)} className={className}>
        <ULink className={itemClassName} href={path} color={isActive(path) ? "primary" : "foreground"}>{label}</ULink>
    </NavbarItem>)

}