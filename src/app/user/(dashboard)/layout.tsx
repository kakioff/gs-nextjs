"use client"
import { Icon } from "@iconify-icon/react"
import { Listbox, ListboxItem } from "@nextui-org/react"
import { useWindowSize } from "@reactuses/core"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo, useState } from "react"


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
    const [packUp, setPackUp] = useState(false),
        { width: windowWidth } = useWindowSize(),
        isPC = useMemo(() => windowWidth == 0 || windowWidth >= 639, [windowWidth])
    const routerPath = usePathname()
    const menuDom = MENU.map(item => {
        const activated = routerPath == item.path
        return <ListboxItem
            title={packUp ? <>&emsp;</> : item.name}
            // title={item.name}
            variant="faded"
            as={Link} key={item.name}
            href={item.path}
            startContent={
                <Icon icon={item.icon} />
            }
            className={clsx({ "bg-foreground/15 border border-foreground/20 text-primary": activated })}
        />
    })
    return <div className="sm:flex flex-row">
        <div className="transition-width overflow-hidden flex-none" style={{
            width: isPC ? (packUp ? "2.6rem" : "13rem") : '100%',
        }}>
            <Listbox label="menu">
                {menuDom.concat(isPC ? <ListboxItem
                    key="sq"
                    title={packUp ? "" : "收起"}
                    startContent={<Icon icon='tabler:arrow-bar-to-left'
                        className={clsx({ "rotate-180": packUp })} />}
                    onClick={() => setPackUp(!packUp)}
                /> : [])}

            </Listbox>
        </div>
        <div className="px-2 py-2 w-full">
            {children}
        </div>
    </div>
}