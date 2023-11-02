import { toggleMenu } from '../service/handlers';
import styles from '../styles/Profile.module.css';

export default function Profile() {
    return (
        <div className={styles.profile} >
            <i onClick={toggleMenu} className={`fa-regular ${styles['fa-user']} fa-user`}></i>

            <div className={styles['user-menu-wrap']} >
                <div className={styles['user-menu']}>
                    <div className={styles['user-info']}>
                        <h3>Guest</h3>
                    </div>
                    <a href="/login" className={styles['sub-menu-link']}>
                        <p>Sign in</p>
                    </a>
                    <a href="/register" className={styles['sub-menu-link']}>
                        <p>Sign up</p>
                    </a>
                </div>
            </div>

        </div>
    );
};