import { Api } from "@/api"

export default function getAvatar(userId?: string) {
    if (!userId) return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    const api = new Api().api_url
    // if (!session?.user) return "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    return `${api}/api/file/avatar/${userId}`
}