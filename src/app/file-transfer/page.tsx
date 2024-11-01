"use client"

import { useEffect, useRef, useState } from "react"
import Sender from "./sender"
import Receiver from "./receiver"
import { useWebSocket } from "next-ws/client"

export default function FileTransfer() {
    const ws = useWebSocket(),
        [userList, setUserList] = useState([])
    useEffect(() => {
        ws?.addEventListener('message', e => {
            let data = JSON.parse(e.data)
            if (data.type == "userList") {
                setUserList(data.data)
            }
        })
    }, [ws])

    return <div>
        {/* <button className="btn" onClick={() => {
            ws?.send(JSON.stringify({ type: "getUserList" }))
        }}>
            getUserList
        </button>
        {userList.map(user => <div key={user} className="w-1/4 h-full border">{user}</div>)} */}
        <div className="h-[100vh] flex flex-row items-center justify-center">
            <Sender className="w-full h-full border" />
            <Receiver className="w-full h-full border" />
        </div>
    </div>
}