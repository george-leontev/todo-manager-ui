import './main-menu.css'
import { Button } from "devextreme-react/button"
import { ContextMenu } from "devextreme-react/context-menu";
import { useCallback, useRef } from "react"
import { MainMenuProps } from "../../models/main-menu-props";

export const MainMenu = ({ menuIcon, items }: MainMenuProps) => {
    const buttonRef = useRef<Button>(null);
    const contextMenuRef = useRef<ContextMenu>(null);

    const buttonClickHandler = useCallback(() => {
        if (contextMenuRef && contextMenuRef.current) {
            contextMenuRef.current.instance.option('position', {
                of: buttonRef.current!.instance.element(),
                offset: {
                    x: 0, y: 48
                }
            });
            contextMenuRef.current.instance.show();
        }
    }, []);

    const menuItemRender = useCallback((item: any) => {
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
    }, []);

    return (
        <div className="app-menu">
            <Button
                ref={buttonRef}
                className="app-command-button"
                onClick={buttonClickHandler}>
                {menuIcon()}
            </Button>
            <ContextMenu
                ref={contextMenuRef}
                dataSource={items as any}
                showEvent={'nowhen'}
                itemRender={menuItemRender}
            />
        </div>
    )
}