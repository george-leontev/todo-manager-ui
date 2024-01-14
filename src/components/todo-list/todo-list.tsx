import './todo-list.scss';
import './todo-list-item.scss'
import { List } from "devextreme-react/list";
import { TodoModel } from "../../models/todo-model";
import { TodoListItem } from "./todo-list-item";
import { EditIcon, RemoveIcon } from "../../app-icons";
import { useCallback, useMemo, useRef } from "react";
import { MenuItem } from "../../models/menu-item";
import { MainContextMenu } from "../main-menu/main-context-menu";
import { ContextMenu } from "devextreme-react/context-menu";
import { TodoListProps } from '../../models/todo-list-props';

export const TodoList = ({ items, onDelete, onEditing }: TodoListProps) => {
    const contextMenuRef = useRef<ContextMenu<any>>(null);
    const listRef = useRef<List<TodoModel>>(null);

    const menuItems = useMemo(() => {
        return [
            {
                text: 'Edit todo',
                icon: () => <EditIcon className='app-icon' size={24} />,
                onClick: () => {
                    const todo = listRef.current?.instance.option('selectedItems')?.find(_ => true);

                    if (todo && onEditing) {
                        onEditing(todo);
                    }
                }
            },
            {
                text: 'Delete todo',
                icon: () => <RemoveIcon className='app-icon' size={24} />,
                onClick: () => {
                    const todo = listRef.current?.instance.option('selectedItems')?.find(_ => true);

                    if (todo && onDelete) {
                        onDelete(todo);
                    }
                }
            },
        ] as MenuItem[]
    }, [onDelete, onEditing]);

    const onContextMenuHandler = useCallback((target: HTMLElement) => {
        if (contextMenuRef && contextMenuRef.current) {
            contextMenuRef.current.instance.option('position', {
                of: target,
                offset: {
                    x: 0, y: 48
                }
            });
            contextMenuRef.current.instance.show();
        }
    }, []);

    return (
        <>
            <MainContextMenu items={menuItems} contextMenuRef={contextMenuRef} />
            <List
                className='todo-list'
                ref={listRef}
                selectionMode={'single'}
                height={500}
                width={'100%'}
                dataSource={items}
                itemRender={(todo: TodoModel) => <TodoListItem todo={todo} onContextMenu={onContextMenuHandler} />}
            />
        </>
    );
}