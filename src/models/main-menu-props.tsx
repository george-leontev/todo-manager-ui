import { ReactNode } from "react";
import { MenuItem } from "./menu-item";

export type MainMenuProps = {
    menuIcon: () => ReactNode;
    items: MenuItem[];
}