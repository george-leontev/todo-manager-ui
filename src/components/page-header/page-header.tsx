import { Link } from "react-router-dom";
import { ProfileIcon } from '../../app-icons';

import './page-header.scss';

export const PageHeader = () => {
    return (
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
    );
}