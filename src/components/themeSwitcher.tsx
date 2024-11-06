"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Icon } from "@iconify-icon/react"
import Loading from "./loading";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme, resolvedTheme } = useTheme(),
        themeLst = [{
            name: 'Light',
            icon: 'mdi:weather-sunny',
            key: "light"
        }, {
            name: 'Dark',
            icon: 'mdi:weather-night',
            key: "dark"
        }, {
            name: 'System',
            icon: 'mdi:computer-classic',
            key: "system"
        }]
    useEffect(() => {
        setMounted(true)
    }, [])

    const setThemeHandle = (name?: string) => {
        let newTheme
        if (name) {
            newTheme = name
            // let index = themeLst.findIndex((mode) => mode.key == theme)
            // name = themeLst[(index + 1) % themeLst.length].key
        } else
            if (theme == "system")
                newTheme = systemTheme == "dark" ? 'light' : "dark"
            else
                newTheme = theme == "light" ? "dark" : "light"

        setTheme(newTheme)
    }, onChange = (event: any, theme?: string) => {
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );
        if (!document.startViewTransition) return setThemeHandle(theme)
        const transition = document.startViewTransition(() => {
            setThemeHandle(theme)
        });
        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ]
            document.documentElement.animate({
                clipPath: resolvedTheme == "dark" ? [...clipPath].reverse() : clipPath
            }, {
                duration: 300,
                easing: 'ease-in-out',
                pseudoElement: resolvedTheme == "dark" ? '::view-transition-old(root)' : '::view-transition-new(root)'
            })
        })
        // setThemeHandle(theme)
    }, themeLstMap = <div className="flex flex-col gap-2">
        {themeLst.map((mode, index) => {
            return <Button size="sm"
                variant="light"
                key={`${mode.key}-${index}-theme-1`}
                onClick={e => onChange(e, mode.key)}
                startContent={<Icon icon={mode.icon} />}>
                {mode.name}
            </Button>
        })}
    </div>

    if (!mounted) return <Loading />

    return themeLst.map((mode, index) => {
        if (theme != mode.key) return undefined
        return <Tooltip delay={500} closeDelay={300}
            content={themeLstMap} key={`${mode.key}-${index}-theme-2`}
        >
            <Button isIconOnly variant="light" onClick={e => onChange(e)}>
                <Icon icon={mode.icon} />
            </Button>
        </Tooltip>
    })
};