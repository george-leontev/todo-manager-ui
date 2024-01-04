import { MenuItem } from "../../models/menu-item";

export type MainMenuItemProps = {
    item: MenuItem;
}

export const MainMenuItem = ({ item }: MainMenuItemProps) => {
    return (
        <div className="app-menu-item">
            <div className="app-menu-item-icon">
                {item.icon ? item.icon() : null}
            </div>
            <div className="app-menu-item-text">
                {item.text}
            </div>
        </div>
    );
}