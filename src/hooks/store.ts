import { create } from "zustand"
import getUUID from "./getUUID"
import { createJSONStorage, devtools, persist, StateStorage } from "zustand/middleware"
import { setCookie, getCookie, deleteCookie } from "cookies-next"
// import { cookies } from "next/headers"
import { parseCookies } from "nookies"

interface UserStore {
    deviceId: string,
    info: UserInfo,
    generateDeviceId: () => void
}
// export const useUserStore = create<UserStore>((set) => ({
//     deviceId: "" as string,
//     info: {} as UserInfo,
//     generateDeviceId() {
//         set(() => ({
//             deviceId: getUUID()
//         }))
//     }
// }))
export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            deviceId: "",
            info: {} as UserInfo,
            generateDeviceId() {
                set({
                    deviceId: getUUID()
                })
            }
        }),
        {
            name: "user-storage",
            // skipHydration: true,
            storage: createJSONStorage(() => ({
                getItem(name) {
                    let item = parseCookies()[name]
                    return item
                    // let item
                    // if (window === undefined) {
                    //     item = cookies().get(name)
                    //     item = item?.value
                    // } else
                    // item = getCookie(name)
                    // if (!item) return null
                    // return item
                },
                setItem(name, value) {
                    setCookie(name, value)
                },
                removeItem(name) {
                    deleteCookie(name)
                }
            })),
        }
    )
)
