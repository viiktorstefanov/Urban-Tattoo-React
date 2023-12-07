import { BiSolidUserDetail } from 'react-icons/bi';
import { useContext, useState } from 'react';
import styles from './Profile.module.css';
import ProfileUser from './ProfileUser';
import ProfileGuest from './ProfileGuest';
import { AuthContext } from "../../contexts/AuthContext";

export default function Profile() {

    const { user, showProfile, setShowProfile } = useContext(AuthContext);

    return (
        <div className={styles['profile-dropdown']} onMouseEnter={() => showProfile ? null : setShowProfile(true)}
        onMouseLeave={() => !showProfile ? null : setShowProfile(false)} >
            <div className='menu-container'>
                <div className='menu-trigger' onClick={() => { setShowProfile(!showProfile) }}>
                    <BiSolidUserDetail className={styles['menu-trigger-ico']} />
                </div>

                <div className={`${styles['dropdown-menu']} ${showProfile ? styles['active'] : styles['inactive']}`} >
                    {!user  && <ProfileGuest />}
                    {user  && <ProfileUser />}
                </div>
            </div>
        </div>
    );
}

