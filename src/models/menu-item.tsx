import { ItemClickEvent } from "devextreme/ui/context_menu";
import { ReactNode } from "react";

export type MenuItem = {
    text: string,
    icon?: () => ReactNode;
    items?: MenuItem[],
    onClick?: (e: ItemClickEvent) => void | Promise<void>
}