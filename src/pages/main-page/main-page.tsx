import './main-page.scss'

import { useState, useCallback, useEffect, useMemo } from "react";
import { AddIcon, AdditionalMenuIcon } from "../../app-icons";
import { MainMenu } from "../../components/main-menu/main-menu";
import { TodoDialog } from "../../components/todo-dialog/todo-dialog";
import { TodoList } from "../../components/todo-list/todo-list";
import { TodoModel } from "../../models/todo-model";
import { MenuItem } from "../../models/menu-item";
import { deleteTodoAsync, getTodoListAsync, postTodoAsync, putTodoAsync } from "../../data-access/todos-data";

export const MainPage = () => {
    const [isTodoDialogVisible, setIsTodoDialogVisible] = useState<boolean>(false);
    const [todos, setTodos] = useState<TodoModel[]>([]);
    const [editedTodo, setEditedTodo] = useState<TodoModel>();

    const onTodoDeleteHandler = useCallback(async (todo: TodoModel) => {
        const deletedTodo = await deleteTodoAsync(todo);
        if (deletedTodo) {
            setTodos((previous) => {
                return previous.filter((todo) => {
                    return todo.id !== deletedTodo.id;
                });
            });
        }
    }, []);

    const onTodoEditingHandler = useCallback(async (todo: TodoModel) => {
        setEditedTodo(todo);
        setIsTodoDialogVisible(true);
    }, []);

    const onTodoEditedHandler = useCallback(async (todo: TodoModel) => {
        const updatedTodo = await putTodoAsync(todo);
        if (updatedTodo) {
            setTodos(previous => {
                const updatedTodos = [...previous.filter((t) => {
                    return todo.id !== t.id;
                }), todo].sort((a, b) => a.id - b.id);

                return updatedTodos;
            });
        }
    }, []);

    const onTodoAddedHandler = useCallback(async (todo: TodoModel) => {
        const addedTodo = await postTodoAsync(todo);
        if (addedTodo) {
            setTodos(previous => {
                return [...previous, todo];
            });
        }
    }, []);

    useEffect(() => {
        (async () => {
            const todos = await getTodoListAsync();
            if (todos) {
                setTodos(todos);
            }
        })();
    }, []);

    const items = useMemo(() => {
        return [
            {
                text: 'Add todo',
                icon: () => <AddIcon className="app-icon" size={24} />,
                onClick: (e) => {
                    setEditedTodo(undefined);
                    setIsTodoDialogVisible(true);
                }
            },
        ] as MenuItem[]
    }, []);

    return (
        <div className='dx-card single-card todo-manager-card'>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 16, paddingBottom: 10 }}>
                <div style={{flex: 1}} className="app-title">Todo manager</div>
                <MainMenu menuIcon={() => <AdditionalMenuIcon className="app-icon" size={24} />} items={items} />
            </div>


            <TodoList
                items={todos}
                onDelete={onTodoDeleteHandler}
                onEditing={onTodoEditingHandler}
            />

            {isTodoDialogVisible
                ? <TodoDialog
                    callback={(todo: TodoModel) => {
                        if (todo.id !== 0) {
                            onTodoEditedHandler(todo);
                        } else {
                            onTodoAddedHandler(todo);
                        }
                    }}
                    onHidden={() => {
                        setIsTodoDialogVisible(false);
                    }}
                    editedTodo={editedTodo}
                />
                : null
            }
        </div>
    );
}