"use client"
import { User } from "next-auth"
import { signOut, useSession } from "next-auth/react"
import ChangePassword from "../profile/changePassword"
import UpdateWithModal from "../profile/updateWithModal"
import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import clsx from "clsx"

interface Props {
    user?: User
}
export default function ActionMenu({
}: Props) {
    const { update } = useSession()

    const menuList = [{
        label: "修改信息",
        as: "li",
        dom: UpdateWithModal
    }, {
        label: "刷新个人信息",
        onClick: async () => {
            await update(true)
            window.location.reload()
        }
    }, {
        label: "改密码",
        dom: ChangePassword,
        asButton: true,
        as: "li"
    }, {
        label: "找回密码",

    }, {
        label: "退出登录",
        onClick: async () => {
            await signOut({
                redirectTo: "/"
            })
        },
        className: "text-danger sm:text-foreground hover:text-danger"
    }]
    return <ul>
        {/* @ts-expect-error dom_props参数有问题 */}
        {menuList.map(({ dom: Dom = "li", className="hover:text-primary", ...item }, index) => <Dom key={index} {...item}
            className={clsx("flex flex-row justify-between py-2 px-3 cursor-pointer items-center border-b border-foreground-200 last:border-none  transition-colors duration-200 hover:bg-foreground/10 ", className)}>
            {item.label}
            <Icon icon="mdi:arrow-right" />
        </Dom>)}
    </ul>
}