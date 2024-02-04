import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDataAccess } from "../../contexts/data-access-context";
import { RegistrationStatuses } from "../../models/todo-statuses";

import { InProgressIcon, ErrorIcon } from '../../app-icons';

import './registration-page.css';


export const RegistrationConfirmPage = () => {
    const [searchParams] = useSearchParams();
    const { confirmRegistrationAsync } = useDataAccess();
    const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatuses>(RegistrationStatuses.InProgress);
    const navigate = useNavigate();

    useEffect(() => {
        const ticket = searchParams.get('ticket');
        if (ticket) {
            setTimeout(async () => {
                const isSuccesful = await confirmRegistrationAsync(ticket);
                setRegistrationStatus(isSuccesful ? RegistrationStatuses.Success : RegistrationStatuses.Fail);
            }, 2000);
        }
    }, [confirmRegistrationAsync, searchParams]);

    useEffect(() => {
        if (registrationStatus === RegistrationStatuses.Success) {
            setTimeout(() => {
                navigate('/login');
            }, 5000);
        }
    }, [registrationStatus, navigate]);

    return (
        <div className="dx-card single-card registration-card">

            {
                registrationStatus === RegistrationStatuses.InProgress
                    ?
                    <div style={{ height: '20vh' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: 24 }}>
                            <InProgressIcon className="registration-proccess-icon" size={20} />
                            Registration in progress
                        </div>
                    </div>


                    : null
            }
            {
                registrationStatus === RegistrationStatuses.Fail
                    ? <div style={{ height: '20vh' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: 24 }}>
                            <ErrorIcon className="app-icon" size={26} color="#ff5722" />
                            Registration was failed unexpectedly
                        </div>

                        <div className="registration-error" style={{ fontSize: '16px' }}>
                            The user with the specified email address already has an account in the system or an exception occurred during the mail sending process, the email address was specified incorrectly.
                        </div>
                    </div>
                    : null
            }
        </div>
    );
}