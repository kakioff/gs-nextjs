"use client"

import { useEffect, useRef, useState } from "react"
import { WebSocket } from "ws"
import type { MessageEvent } from "ws"

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}
export default function Sender() {
    const videoDom = useRef<HTMLVideoElement>(null),
        [ws, setWs] = useState<WebSocket>();

    const [localStream, setLocalStream] = useState<MediaStream>();
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();

    useEffect(() => {
        const w = new WebSocket('ws://localhost:8000/api/ws/file?client_id=sender&room_id=123');
        setWs(w)

        w.onmessage = async (event: MessageEvent) => {
            console.log(event.data);
            
            const data = JSON.parse(event.data.toString())
            console.log("sender", data);

            if (data.mode === 'answer') {
                await peerConnection?.setRemoteDescription(data.data)

            } else if (data.mode === 'candidate') {
                await peerConnection?.addIceCandidate(data.candidate)
            }
        }
    })
    const func = {
        async start() {
            let stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
            if (videoDom.current) {
                videoDom.current.srcObject = stream
            }
            setLocalStream(stream)
            const pc = new RTCPeerConnection();
            setPeerConnection(pc);
            stream.getTracks().forEach(track => pc.addTrack(track, stream));
            pc.onicecandidate = event => {
                if (event.candidate) {
                    ws?.send(JSON.stringify({ type: 'message', mode: 'candidate', candidate: event.candidate }))
                }
            }
            let offer = await pc.createOffer();
            pc.setLocalDescription(offer)
            ws?.send(JSON.stringify({ type: 'message', mode: 'offer', data: offer }))
        }
    }

    return <div>
        <h1>sender</h1>
        <div className="my-2">
            <button className="btn" onClick={func.start}>start</button>
        </div>
        <video ref={videoDom} autoPlay className="w-full h-[400px] border mx-auto"></video>
    </div>
}