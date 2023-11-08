import { BiSolidUserDetail } from 'react-icons/bi';
import { useState } from 'react';
import styles from './Profile.module.css';
import ProfileUser from './ProfileUser';
import ProfileGuest from './ProfileGuest';

export default function Profile() {

    const [showProfile, setShowProfile] = useState(false);
    const user = { _role: 'user', email: 'viktor-stefanov@mail.bg', name: 'Viktor' };
    // const user = false;

    return (
        <div className={styles['profile-dropdown']}>
            <div className='menu-container'>
                <div className='menu-trigger' onClick={() => { setShowProfile(!showProfile) }}>
                    <BiSolidUserDetail className={styles['menu-trigger-ico']} />
                </div>

                <div className={`${styles['dropdown-menu']} ${showProfile ? styles['active'] : styles['inactive']}`} >
                    { user ? <ProfileUser /> : <ProfileGuest /> }
                </div>
            </div>
        </div>
    );
}

