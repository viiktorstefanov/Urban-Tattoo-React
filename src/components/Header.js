import styles from '../styles/components/Header.module.css';
import Profile from './Profile';
import Navigation from './Navigation';

export default function Header() {
    return (
        <header className={styles.header}>
            <Navigation />
            <div className='user-wrap'>
                {/* //if user */}
                {/* <div className={styles.hero} id="user-btns">
                <i className={`${styles['user-pic']} fa-regular`}></i>
    
                <div className={styles['sub-menu-wrap']} id="subMenu">
                    <div className={styles['sub-menu']}>
                        <div className={styles['user-info']}>
                            <h4>user.email</h4>
                        </div>
                        <hr/>
                        <a href="/logout" className={styles['sub-menu-link']}>
                            <p>Logout</p>
                        </a>
                    </div>
                </div>
            </div> */}

                {/* //no-user */}
                {/* <div className={styles.hero} id="user-btns">
                <i className={`${styles['user-pic']} fa-regular fa-user`}></i>
    
                <div className={styles['sub-menu-wrap']} id="subMenu">
                    <div className={styles['sub-menu']}>
                        <div className={styles['user-info']}>
                            <h4>Guest</h4>
                        </div>
                        <hr/>
                        <a href="/login" className={styles['sub-menu-link']}>
                            <p>Sign in</p>
                        </a>
                        <a href="/register" className={styles['sub-menu-link']}>
                            <p>Sign up</p>
                        </a>
                    </div>
                </div>
            </div> */}
                <Profile />
            </div>
        </header>
    );
};