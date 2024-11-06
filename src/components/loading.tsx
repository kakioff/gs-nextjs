import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

export default function Loading() {
  return <div className="flex justify-center items-center h-10 w-10">
    <Icon icon="mdi:loading" className="text-3xl animate-spin" />
  </div>
}