import { ContextMenu } from "devextreme-react/context-menu";
import { MenuItem } from "../../models/menu-item";
import { MainMenuItem } from "./main-menu-item";

export type MainContextMenuProps = {
    items: MenuItem[];
    contextMenuRef?: React.LegacyRef<ContextMenu<any>>;
}

export const MainContextMenu = ({ items, contextMenuRef }: MainContextMenuProps) => {
    return (
        <ContextMenu
            ref={contextMenuRef}
            dataSource={items as any}
            showEvent={'nowhen'}
            itemRender={(item) => <MainMenuItem item={item} />}
        />
    );
}