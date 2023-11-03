import styles from '../styles/Profile.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';



export default function Profile() {

    const [showProfile, setShowProfile] = useState(false);

    const toggleProfile = () => {
        if (showProfile) {
            setShowProfile(false);
        } else {
            setShowProfile(true);
        }
    };

    return (
        <div onClick={toggleProfile} className={styles.profile} >
            <i className={`fa-regular ${styles['fa-user']} fa-user`}></i>

            {
                showProfile ? (
                    <div className={styles['user-menu-wrap']} >
                        <div className={styles['user-menu']}>
                            <div className={styles['user-info']}>
                                <h3>Guest</h3>
                            </div>
                            <Link to='/login' className={styles['sub-menu-link']}><p>Sign in</p></Link>
                            <Link to='/register' className={styles['sub-menu-link']}><p>Sign up</p></Link>
                        </div>
                    </div>
                ) 
                : null
            }

        </div>
    );
};

