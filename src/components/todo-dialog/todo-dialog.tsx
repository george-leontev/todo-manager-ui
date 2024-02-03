import { Button } from "devextreme-react/button";
import { Form, SimpleItem } from "devextreme-react/form";
import { Popup } from "devextreme-react/popup";
import { TodoModel } from "../../models/todo-model";
import { useMemo, useRef } from "react";
import { TodoDialogProps } from "../../models/todo-dialog-props";
import { TodoStatuses } from "../../models/todo-statuses";
import { TodoStatusDescriptions } from "../../models/todo-status-description-model";
import { useAuth } from "../../contexts/auth-сontext";


export const TodoDialog = ({ callback, onHidden, editedTodo }: TodoDialogProps) => {
    const formRef = useRef<Form>(null);
    const { user } = useAuth();

    const newTodo = useMemo(() => {
        return editedTodo ? { ...editedTodo } : {
            id: '',
            description: '',
            date: new Date(),
            status: TodoStatuses.Pending,
            userId: user.userId
        } as TodoModel;
    }, [editedTodo, user.userId]);

    return (
        <Popup
            wrapperAttr={{ class: 'app-dialog' }}
            width={600}
            height={'auto'}
            visible
            showCloseButton
            onHidden={onHidden}
            title={editedTodo ? 'Edit todo' : 'Add todo'}
        >
            <Form ref={formRef}
                formData={newTodo}>
                <SimpleItem
                    dataField='title'
                    editorType='dxTextBox'
                    editorOptions={{
                        placeholder: 'Title'
                    }}
                    label={{ location: 'top', text: 'Title' }}
                />
                <SimpleItem
                    dataField='description'
                    editorType='dxTextBox'
                    editorOptions={{
                        placeholder: 'New todo'
                    }}
                    label={{ location: 'top', text: 'Description' }}
                />
                <SimpleItem
                    dataField='date'
                    editorType='dxDateBox'
                    label={{ location: 'top', text: 'Creation date' }}
                />
                <SimpleItem
                    dataField='status'
                    editorType='dxSelectBox'
                    editorOptions={{
                        valueExpr: 'id',
                        displayExpr: 'description',
                        items: TodoStatusDescriptions
                    }}
                    label={{ location: 'top', text: 'Status' }}
                />
            </Form>
            <div className='app-popup-dialog-bar'>
                <Button text='Ok' type='success' onClick={() => {
                    if (callback) {
                        const todo = formRef.current?.instance.option('formData') as TodoModel;
                        // todo.userId = user.userId;
                        callback(todo);
                    }
                    if (onHidden) {
                        onHidden();
                    }
                }} />
                <Button text='Cancel' type='danger' onClick={onHidden} />
            </div>
        </Popup>
    );
}