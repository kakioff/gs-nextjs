import { Dropdown, DropdownItem, DropdownItemProps, DropdownMenu, DropdownProps, DropdownTrigger } from "@nextui-org/react";
import { MenuItemProps } from "@nextui-org/menu"

interface Props extends DropdownProps {
    data?: MenuItemProps[] | any[]
    triggerChildren?: React.ReactNode
    itemChildren?: (item: MenuItemProps) => React.ReactNode
}
export default function UDropdown({
    triggerChildren,
    itemChildren: ItemChildren,
    data = [],
    ...props
}: Props) {
    return <Dropdown {...props}>
        <DropdownTrigger>
            {triggerChildren || "Dropdown"}
        </DropdownTrigger>
        <DropdownMenu items={data}>
            {item => <ItemChildren item={item}/> || <DropdownItem {...item}>
                {item.title}
            </DropdownItem>}
        </DropdownMenu>
    </Dropdown >
}