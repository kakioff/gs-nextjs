"use client"

import { WebSocketProvider } from "next-ws/client";
import { usePathname } from "next/navigation";


export default function Websocket({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname()
  return <WebSocketProvider url={`ws://127.0.0.1:8000/api/ws/file?client_id=${pathName}&room_id=123`}>
    {children}
  </WebSocketProvider>
}