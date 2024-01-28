import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const RegistrationConfirmPage = () => {
    const [searchParams] = useSearchParams();


    useEffect(() => {
        const ticket = searchParams.get('ticket');
        console.log(ticket);
    }, [searchParams]);

    return (
        <div>
            <div>Registration in progress</div>
        </div>
    );
}