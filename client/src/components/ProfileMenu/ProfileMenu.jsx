import { BiSolidUserDetail } from 'react-icons/bi';
import { useContext } from 'react';
import styles from './ProfileMenu.module.css';
import ProfileUser from './ProfileMenuUser';
import ProfileGuest from './ProfileMenuGuest';
import { AuthContext } from "../../contexts/AuthContext";

export default function ProfileMenu() {

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

