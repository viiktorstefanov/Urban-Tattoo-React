import styles from '../styles/components/Navigation.module.css';
import { Link } from 'react-router-dom';

export default function Navigation() {
    const user = { _role: 'user', email: 'viktor-stefanov@mail.bg', name: 'Viktor' };
    // const user = false;
    return (
        <nav>
            <ul className={styles['nav-bar']}>
                <li className={`${styles['nav-link']} ${styles['nav-li']} ${styles['navigation']} ${styles.home}`}>
                    <Link to="/">HOME</Link>
                </li>
                <li id="gallery" className={`${styles['nav-link']} ${styles.gallery} ${styles['nav-li']} ${styles['navigation']}`}>
                    <Link to="/gallery">GALLERY</Link>
                </li>
                <li className={`${styles['nav-logo']} ${styles['nav-li']}`}>
                    <Link to="/"><img src="/assets/images/logo new 2023 transperant cutted.png" alt="logo" /></Link>
                </li>
                <li className={`${styles['nav-link']} ${styles.booking} ${styles['nav-li']} ${styles['navigation']}`}>
                    <Link to="/booking">BOOKING</Link>
                </li>
                {
                    user._role === 'user' ?
                        <li className={`${styles['nav-link']} ${styles['nav-li']} ${styles['navigation']}`}>
                            <Link to="/contact">CONTACT</Link>
                        </li>
                        :
                        <li className={`${styles['nav-link']} ${styles['nav-li']} ${styles['navigation']}`}>
                            <Link to="/upload">UPLOAD</Link>
                        </li>
                }
            </ul>
        </nav>
    );
};