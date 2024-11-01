"use client"
import { Icon } from "@iconify-icon/react"
import { Button, Listbox, ListboxItem, ListboxSection } from "@nextui-org/react"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"


const MENU = [{
    name: "Profile",
    path: "/user",
    icon: "tabler:user"
}, {
    name: "Settings",
    path: "/user/settings",
    icon: "tabler:settings"
}]
export default function UserLayout({ children }: { children: React.ReactNode }) {
    const [packUp, setPackUp] = useState(false)
    const routerPath = usePathname()
    const menuDom = MENU.map(item => {
        let activated = routerPath == item.path
        return <ListboxItem
            title={packUp ? <>&emsp;</> : item.name}
            // title={item.name}
            variant="faded"
            as={Link} key={item.name}
            href={item.path}
            startContent={
                <Icon icon={item.icon} />
            }
            className={clsx({ "bg-foreground/15 border border-foreground/20": activated })}
        />
    })
    return <div className="flex flex-row">
        <div className="transition-width overflow-hidden flex-none" style={{
            width: packUp ? "2.6rem" : "13rem",
        }}>
            <Listbox >
                {menuDom.concat(<ListboxItem
                    key="sq"
                    title={packUp ? "" : "收起"}
                    startContent={<Icon icon='tabler:arrow-bar-to-left' className={clsx({ "rotate-180": packUp })} />}
                    onClick={() => setPackUp(!packUp)}
                />)}

            </Listbox>
        </div>
        <div className="px-2 py-2 w-full">
            {children}
        </div>
    </div>
}