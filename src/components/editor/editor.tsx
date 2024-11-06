"use client"
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useRef, useState } from 'react'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

interface Props {
    hidendToolbar?: boolean
    optionsButton?: boolean
    content?: string
    enableCache?: boolean
    cacheID?: string
    width?: string
    height?: string
    className?: string
}
export default function Editor({
    hidendToolbar = false,
    optionsButton,
    content = "",
    enableCache,
    cacheID,
    width = "100%",
    height = "100%",
    className
}: Props) {
    if (enableCache && !cacheID) throw new Error("cacheID is required when enableCache is true")

    const vditorDom = useRef<HTMLDivElement>(null),
        { resolvedTheme } = useTheme(),
        isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]),
        [vditor, setVidtor] = useState<Vditor>()
    useEffect(() => {
        let toolbarOpts: IOptions["toolbar"] = [
            "emoji",
            "headings",
            "bold",
            "italic",
            "strike",
            "link",
            "|",
            "list",
            "ordered-list",
            "check",
            "outdent",
            "indent",
            "|",
            "quote",
            "line",
            "code",
            "inline-code",
            "table",
            "record",
            "upload",
            "|",
            "undo",
            "redo",
            "fullscreen",
            "outline",
            "preview",
            "edit-mode"
        ]
        if (hidendToolbar) {
            toolbarOpts = ["fullscreen", "record", "upload", {
                name: "ctldit",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 22 22"><path fill="#ddd" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/></svg>`,
                toolbar: ["undo", "redo"]
            }]
        }
        toolbarOpts.push({
            name: "save",
            hotkey: '⌘s',
            tipPosition: 's',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 22 22"><path fill="#ddd" d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-2 .85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-6-8h9V6H6zM5 7.85V19V5z"/></svg>`,
            tip: "保存",
            click() {
                // saveHandler()
            }
        })
        if (optionsButton) {
            toolbarOpts.push({
                name: "options",
                hotkey: '⌘o',
                tipPosition: 's',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="#ddd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 5h-3m-4.25-2v4M13 5H3m4 7H3m7.75-2v4M21 12H11m10 7h-3m-4.25-2v4M13 19H3"/></svg>`,
                tip: "选项",
                click() {
                    // emits('options')
                }
            })
        }
        let newVditor = new Vditor(vditorDom.current!, {
            width,
            height,
            value: content,
            cache: {
                enable: enableCache,
                id: cacheID,
            },
            toolbar: toolbarOpts,
            outline: {
                enable: !hidendToolbar,
                position: "left"
            },
            upload: {
                // url: `${api.getBaseUrl()}/file`,
                // headers: api.getHeaders() as IObject,
                // format(files, responseText) {
                //     let res: ApiRes<{
                //         errors: string[],
                //         files: {
                //             [filename: string]: File
                //         }
                //     }> = JSON.parse(responseText),
                //         res_data = res.data
                //     if (!res_data) throw new Error('上传失败')
                //     let file_dict: any = {}
                //     for (let filename in res_data.files) {
                //         file_dict[filename] = `${api.getBaseUrl()}/file/${res_data.files[filename].id}`
                //     }

                //     return JSON.stringify({
                //         "msg": "",
                //         "code": 0,
                //         "data": {
                //             "errFiles": res_data.errors,
                //             "succMap": file_dict
                //         }
                //     })
                // },
                // success(editor: HTMLPreElement, msg: string) {
                //     uploadSucc(editor, JSON.parse(msg))
                // }
            },
            preview: {
                markdown: {
                    mark: true
                }
            }
        })
        setVidtor(newVditor)
        if (isDark) {
            setTimeout(() => newVditor.setTheme('dark', 'dark'), 50)
        }
    }, [vditorDom])
    useEffect(() => {
        if (!vditor) return
        if (isDark) {
            vditor.setTheme('dark', 'dark')
        } else {
            vditor.setTheme('classic', 'light')
        }
    }, [isDark, vditor])
    return <div ref={vditorDom} className={className}></div>
}