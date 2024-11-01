import ULink from "@/components/ui/Link";
// import { useEffect, useLayoutEffect, useState } from "react";

export default function Home() {
  // let user = useUserStore()

  // useEffect(() => {
  //   useUserStore.persist.onHydrate(state=>{
  //     console.log("onFinishHydration", state)
  //   })
  // })

  return <div className="h-[200vh]">
    Go to &ensp;
    <ULink href="/file-transfer">
      File Transfer
    </ULink> - &ensp;
    <ULink href="/user">
      User Page
    </ULink>
  </div>;
}
