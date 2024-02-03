import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDataAccess } from "../../contexts/data-access-context";


export const RegistrationConfirmPage = () => {
    const [searchParams] = useSearchParams();
    const { confirmRegistrationAsync } = useDataAccess();
    const [isSuccesfulRegistration, setIsSuccesfulRegistration] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const ticket = searchParams.get('ticket');
        if (ticket) {
            setTimeout(async () => {
                const isSuccesful = await confirmRegistrationAsync(ticket);
                setIsSuccesfulRegistration(isSuccesful);
            }, 2000);
        }
    }, [confirmRegistrationAsync, searchParams]);

    useEffect(() => {
        if (isSuccesfulRegistration) {
            setTimeout(() => {
                navigate('/login');
            }, 5000);
        }
    }, [isSuccesfulRegistration, navigate]);

    return (
        <div>
            {
                !isSuccesfulRegistration
                ? <div>Registration in progress</div>
                : <div>Registration was successfully completed!</div>
            }
        </div>
    );
}