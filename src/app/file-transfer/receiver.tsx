import { useUserStore } from "@/hooks/store"
import { useWebSocket } from "next-ws/client"
import { useEffect, useRef, useState } from "react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}
export default function Receiver(props: Props) {
  const videoDom = useRef<HTMLVideoElement>(null),
    ws = useWebSocket()
  const [remoteStream, setRemoteStream] = useState<any>();
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();
  useEffect(() => {
    async function onMessage(event: MessageEvent) {
      const data = JSON.parse(event.data)
      console.log("received", data);

      if (data.mode === 'offer') {
        await peerConnection?.setRemoteDescription(data.data)

        let answer = await peerConnection?.createAnswer();
        peerConnection?.setLocalDescription(answer)
        ws?.send(JSON.stringify({
          "data": answer,
          mode: "answer",
          type: "message"
        }))
      } else if (data.mode === 'candidate') {
        await peerConnection?.addIceCandidate(data.data)
      }
    }
    ws?.addEventListener('message', onMessage)
  }, [ws])


  useEffect(() => {
    const pc = new RTCPeerConnection();
    setPeerConnection(pc);
    pc.ontrack = event => setRemoteStream(event.streams);
    console.log('ready');

  }, []);

  return <div {...props}>

    <h1>Receiver</h1>
    <div>

    </div>
    <video ref={ref => remoteStream && ref && (ref.srcObject = remoteStream)} autoPlay className="w-1/2 h-[200px] border mx-auto"></video>
  </div>
}