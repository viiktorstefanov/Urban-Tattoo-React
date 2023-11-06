import styles from '../styles/components/Profile.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PiUserListBold } from 'react-icons/pi';

export default function Profile() {

    const [showProfile, setShowProfile] = useState(false);
    // const user = { _role: 'user', email: 'viktor-stefanov@mail.bg', name: 'Viktor' };

    const toggleProfile = () => {
        if (showProfile) {
            setShowProfile(false);
        } else {
            setShowProfile(true);
        }
    };

    return (
        <div onClick={toggleProfile} className={styles.profile} >
            <PiUserListBold className={styles['icon-user']}/>
            
            {
                showProfile ? 
                    <div className={styles['user-menu-wrap']} >
                            <Link to='/login' className={styles['user-menu-link']}><p>Sign in</p></Link>
                            <Link to='/register' className={styles['user-menu-link']}><p>Sign up</p></Link>
                    </div>
                            : null
            }
        </div>
    );
};

