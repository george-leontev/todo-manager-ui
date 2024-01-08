import './home-page.scss'

import { Button } from "devextreme-react/button"
import { Link } from "react-router-dom"
import { ProfileIcon } from '../../app-icons'

export const HomePage = () => {
    return (
        <>
            <div className='home-page-title'>

                <Link to={'/'}>
                    {/* <img className='logo-image' src='../../../assets/images/logo.jpg' /> */}
                    <div className='logo-image'></div>
                </Link>
                <div className='home-page-title-content'>Todos</div>
                <Link to={'/login'}>
                    <ProfileIcon className='profile-icon' size={35} />
                </Link>
            </div>
            <div className="home-image" />
            <div>
                <Link to={'/login'}>
                    <Button className='home-page-login-button' width={200} height={50} type="default">
                        LOGIN
                    </Button>
                </Link>
            </div>
        </>
    )
}