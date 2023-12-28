import axios from "axios";
import notify from "devextreme/ui/notify";
import { useState, useCallback, useEffect, useMemo } from "react";
import { AppConsts } from "../../app-consts";
import { AddIcon, MenuIcon } from "../../app-icons";
import { MainMenu } from "../../components/main-menu/main-menu";
import { TodoDialog } from "../../components/todo-dialog/todo-dialog";
import { TodoList } from "../../components/todo-list/todo-list";
import { TodoModel } from "../../models/todo-model";
import { MenuItem } from "../../models/menu-item";

export const MainPage = () => {
    const [isTodoDialogVisible, setIsTodoDialogVisible] = useState<boolean>(false);

    const [todos, setTodos] = useState<TodoModel[]>([]);

    const getTodoListAsync = useCallback(async () => {
        try {
            const response = await axios.request({
                url: `${AppConsts.webApiRoutes.todos}`,
                method: 'GET'
            });

            if (response.status === 200) {
                const todos = response.data;

                return todos as TodoModel[];
            }
        } catch (error) {
            notify({
                message: `В процессе выполнения запроса возникла ошибка: ${(error as Error).message}`,
                type: 'error',
                displayTime: 2000
            });
        }
    }, []);

    const deleteTodoAsync = useCallback(async (todo: TodoModel) => {
        try {
            const response = await axios.request({
                url: `${AppConsts.webApiRoutes.todos}/${todo.id}`,
                method: 'DELETE'
            });
            if (response.status === 200) {
                const deletedTodo = response.data;

                return deletedTodo as TodoModel;
            }
        } catch (error) {
            notify({
                message: `В процессе выполнения запроса возникла ошибка: ${(error as Error).message}`,
                type: 'error',
                displayTime: 2000
            });
        }
    }, []);

    const onDeleteHandler = useCallback(async (todo: TodoModel) => {
        const deletedTodo = await deleteTodoAsync(todo);
        if (deletedTodo) {
            setTodos((previous) => {
                return previous.filter((todo) => {
                    return todo.id !== deletedTodo.id;
                });
            });
        }
    }, [deleteTodoAsync]);

    useEffect(() => {
        (async () => {
            const todos = await getTodoListAsync();
            if (todos) {
                setTodos(todos);
            }
        })();
    }, [getTodoListAsync]);

    const items = useMemo(() => {
        return [
            {
                text: 'Добавить задачу',
                icon: () => <AddIcon size={24} />,
                onClick: (e) => {
                    setIsTodoDialogVisible(true);
                }
            },
        ] as MenuItem[]
    }, []);

    return (

        <div className='single-card dx-card'>
            <MainMenu menuIcon={() => <MenuIcon size={24} />} items={items} />
            <TodoList items={todos} onDelete={onDeleteHandler} />
            {isTodoDialogVisible
                ? <TodoDialog onHidden={() => {
                    setIsTodoDialogVisible(false);
                }} callback={(todo: TodoModel) => {
                    setTodos(previous => {
                        return [...previous, todo];
                    });
                }} />
                : null
            }
        </div>
    )
}