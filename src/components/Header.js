import styles from '../styles/Header.module.css';

export default function Header() {
    return (
        <header>
        <nav>
            {/* //if user */}
            <div className={styles.hero} id="user-btns">
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
            </div>
    
            {/* //no-user */}
            <div className={styles.hero} id="user-btns">
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
    
            </div>
    
            <div id="logo" className={styles['nav-logo']}>
                <a href="/"><img src="images/logo new 2023 transperant cutted.png" alt="logo"/></a>
            </div>
            <ul className={styles['nav-bar']}>
                <li className={styles['nav-link']}>
                    <a href="/">HOME</a>
                </li>
                <li id="gallery" className={`${styles['nav-link']} ${styles.gallery}`}>
                    <a href="/gallery">GALLERY</a>
                </li>
                <li className={`${styles['nav-link']} ${styles.booking}`}>
                    <a href="/booking">BOOKING</a>
                </li>
                {/* //if user and user is admin */}
                <li className={styles['nav-link']}>
                    <a href="/upload">UPLOAD</a>
                </li>
                {/* //if user and no admin */}
                <li className={styles['nav-link']}>
                    <a href="/contact">CONTACT</a>
                </li>
            </ul>
        </nav>
    </header>
    );
};