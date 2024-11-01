import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import clsx from "clsx"

export default function Alert({
    children,
    text,
    color,
    className
}: {
    children?: React.ReactNode,
    text?: string,
    color?: "primary" | "default" | "secondary" | "success" | "warning" | "danger",
    className?: string
}) {
    const icons = {
        "primary": "tabler:alert-triangle-filled",
        "default": "tabler:alert-triangle-filled",
        "secondary": "tabler:alert-triangle-filled",
        "success": "tabler:check",
        "warning": "tabler:alert-triangle-filled",
        "danger": "tabler:alert-triangle-filled"
    }
    return <p className={
        clsx(className, "flex flex-row items-center gap-2 px-3 py-2 rounded", `text-${color} bg-${color}/20`)
    }>
        <Icon icon={icons[color || "default"]} />
        <span>{children || text || ""}</span>
    </p>
}