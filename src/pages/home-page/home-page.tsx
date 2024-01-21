import './home-page.scss'

import { Button } from "devextreme-react/button"
import { Link } from "react-router-dom"
import { PageHeader } from '../../components/page-header/page-header'
import { useAuth } from '../../contexts/auth-сontext'

export const HomePage = () => {
    const { user } = useAuth()

    return (
        <>
            <PageHeader />
            <div className="home-image" />
            <div>
                {user ? <Link to={'/todos'}>
                    <Button className='home-page-login-button' width={200} height={50} type={'success'}>
                        Start
                    </Button>
                </Link> : <Link to={'/login'}>
                    <Button className='home-page-login-button' width={200} height={50} type={'default'}>
                        Login
                    </Button>
                </Link>}
            </div>
        </>
    )
}