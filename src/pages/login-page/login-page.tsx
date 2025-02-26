import './login-page.scss'
import { useNavigate } from "react-router-dom";
import { ButtonItem, ButtonOptions, Form, SimpleItem, RequiredRule, EmailRule } from "devextreme-react/form"
import { useMemo, useRef } from "react";
import { LoginModel } from "../../models/login-model";
import { useAuth } from '../../contexts/auth-сontext';

export const LoginPage = () => {
    const { signInAsync } = useAuth();
    const navigate = useNavigate();

    const formRef = useRef<Form>(null);
    const login = useMemo(() => {
        return {
            email: 'egorleontev54@gmail.com',
            password: 'abcdef'
        } as LoginModel;
    }, []);

    return (
        <div className="dx-card single-card login-card">
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
                            const authUser = await signInAsync(formData);
                            if (authUser) {
                                navigate("/");
                            }
                        }
                    }} />
                </ButtonItem>
            </Form>
        </div >
    )
}