import { Button } from "devextreme-react/button";
import { Form, SimpleItem } from "devextreme-react/form";
import { Popup } from "devextreme-react/popup";
import { TodoModel } from "../../models/todo-model";
import { useMemo, useRef } from "react";
import { TodoDialogProps } from "../../models/todo-dialog-props";
import { TodoStatuses } from "../../models/todo-statuses";
import { TodoStatusDescriptions } from "../../models/todo-status-description-model";


export const TodoDialog = ({ callback, onHidden }: TodoDialogProps) => {
    const formRef = useRef<Form>(null);
    const newTodo = useMemo(() => {
        return {
            id: 0,
            description: '',
            date: new Date(),
            status: TodoStatuses.Pending
        } as TodoModel;
    }, []);

    return (
        <Popup
            width={600}
            height={'auto'}
            visible
            showCloseButton
            onHidden={onHidden}
            title='Add todo'
        >
            <Form ref={formRef}
                formData={newTodo}>
                <SimpleItem
                    dataField='description'
                    editorType='dxTextBox'
                    editorOptions={{
                        placeholder: 'New todo'
                    }}
                    label={{ location: 'top', text: 'Todo description' }}
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
                    label={{ location: 'top', text: 'Todo status' }}
                />
            </Form>
            <div className='app-popup-dialog-bar'>
                <Button text='Ok' type='success' onClick={() => {
                    if (callback) {
                        const formData = formRef.current?.instance.option('formData');

                        callback(formData as TodoModel);
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