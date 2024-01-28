import './registration-page.css';

import { useMemo, useRef } from 'react';
import { ButtonItem, ButtonOptions, Form, RequiredRule, EmailRule, SimpleItem } from "devextreme-react/form";
import { RegistrationModel } from '../../models/registration-model';
import { useAuth } from '../../contexts/auth-сontext';


export const RegistrationPage = () => {
    const { registrationAsync } = useAuth();
    const formRef = useRef<Form>(null)
    const registration = useMemo(() => {
        return {
            email: 'egorleontev54@gmail.com',
            password: 'abcdef',
            confirmedPassword: 'abcdef'
        } as RegistrationModel;
    }, [])

    return (
        <div className="dx-card single-card registration-card">
            <div style={{ fontSize: 24 }}>
                Registration
            </div>
            <Form ref={formRef} formData={registration}>
                <SimpleItem
                    dataField="email"
                    editorType="dxTextBox"
                    label={{ location: 'top', text: 'Email' }}>
                    <RequiredRule message="It is a required field" />
                    <EmailRule message="Email has no valid format" />
                </SimpleItem>

                <SimpleItem
                    dataField="password"
                    editorType="dxTextBox"
                    label={{ location: 'top', text: 'Password' }}
                >
                    <RequiredRule message="It is a required field" />
                </SimpleItem>

                <SimpleItem
                    dataField="confirmedPassword"
                    editorType="dxTextBox"
                    label={{ location: 'top', text: 'Confirmed password' }}
                >
                    <RequiredRule message="It is a required field" />
                </SimpleItem>

                <ButtonItem>
                    <ButtonOptions text="Registration" type="default" width={'100%'} onClick={async () => {
                        const formData = formRef.current?.instance.option('formData');
                        const authUser = await registrationAsync(formData);
                        // const validateResult = formRef.current?.instance.validate();
                        // if (validateResult?.isValid) {

                        // }

                    }}></ButtonOptions>
                </ButtonItem>
            </Form>
        </div>
    )
}