import './login-form.css'
import { ButtonItem, ButtonOptions, Form, SimpleItem, RequiredRule, EmailRule } from "devextreme-react/form"
import { useCallback, useMemo, useRef } from "react";
import { LoginModel } from "../../models/login-model";
import axios from "axios";
import { AppConsts } from "../../app-consts";
import notify from "devextreme/ui/notify";

export const LoginPage = () => {
    const formRef = useRef<Form>(null);
    const login = useMemo(() => {
        return {

        } as LoginModel;
    }, []);

    const signInAsync = useCallback(async (login: LoginModel) => {
        try {
            const response = await axios.request({
                url: `${AppConsts.webApiRoutes.signIn}`,
                method: 'POST',
                data: login
            });
            if (response.status === 200) {
                const accessToken = response.data;

                return accessToken as LoginModel;
            }
        } catch (error) {
            notify({
                message: `В процессе выполнения запроса возникла ошибка: ${(error as Error).message}`,
                type: 'error',
                displayTime: 2000
            });
        }
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
                            console.log(accessToken);
                        }
                    }} />
                </ButtonItem>
            </Form>
        </div >

    )
}