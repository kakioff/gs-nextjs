import Editor from "@/components/editor/editor";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "关于这个网站",
    description: "关于这个网站",
    other: {
        fullWidth: "true"
    }
}
async function AboutPage() {
    return <div className="h-full">
        <Editor className=" absolute left-0 top-0" />
    </div>
}
export default AboutPage