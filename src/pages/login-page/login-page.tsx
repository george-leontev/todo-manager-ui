import './login-form.css'
import { useNavigate } from "react-router-dom";
import { ButtonItem, ButtonOptions, Form, SimpleItem, RequiredRule, EmailRule } from "devextreme-react/form"
import { useMemo, useRef } from "react";
import { LoginModel } from "../../models/login-model";
import { signInAsync } from '../../data-access/login-data';

export const LoginPage = () => {
    const navigate = useNavigate();

    const formRef = useRef<Form>(null);
    const login = useMemo(() => {
        return {
            email: 'egorleontev54@gmail.com',
            password: 'abcdef'
        } as LoginModel;
    }, []);

    return (
        <div className="single-card dx-card">
            <div style={{ fontSize: 24 }}>
                Login
            </div>
            <Form ref={formRef} formData={login} >
                <SimpleItem
                    dataField="email"
                    editorType='dxTextBox'
                    label={{ location: 'top', text: 'Email' }}
                >
                    <RequiredRule message="It is a required field" />
                    <EmailRule message="Email has no valid format" />
                </ SimpleItem>
                <SimpleItem
                    dataField="password"
                    editorType='dxTextBox'
                    editorOptions={{ mode: 'password' }}
                    label={{ location: 'top', text: 'Password' }}
                >
                    <RequiredRule message="It is a required field" />
                </ SimpleItem>
                <ButtonItem>
                    <ButtonOptions text="Login" type="default" width={'100%'} onClick={async () => {
                        const formData = formRef.current?.instance.option('formData');
                        const validateResult = formRef.current?.instance.validate();
                        if (validateResult?.isValid) {
                            const accessToken = await signInAsync(formData);
                            if (accessToken) {
                                navigate("/todos");
                            }
                        }
                    }} />
                </ButtonItem>
            </Form>
        </div >

    )
}