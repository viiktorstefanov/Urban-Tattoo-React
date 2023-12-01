import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export default function Navigation() {

    const { user } = useContext(AuthContext);
    
    return (
        <nav>
            <ul className={styles['nav-bar']}>
                <li className={`${styles['nav-link']} ${styles['nav-li']} ${styles['navigation']} ${styles.home}`}>
                    <Link to="/">HOME</Link>
                </li>
                <li id="gallery" className={`${styles['nav-link']} ${styles.gallery} ${styles['nav-li']} ${styles['navigation']}`}>
                    <Link to="/gallery?page=1">GALLERY</Link>
                </li>
                <li className={`${styles['nav-logo']} ${styles['nav-li']}`}>
                    <Link to="/"><img src="/assets/images/logo new 2023 transperant cutted.png" alt="logo" /></Link>
                </li>
                <li className={`${styles['nav-link']} ${styles.booking} ${styles['nav-li']} ${styles['navigation']}`}>
                    <Link to="/booking">BOOKING</Link>
                </li>
                {user && user._role === 'user' ? <li className={`${styles['nav-link']} ${styles['nav-li']} ${styles['navigation']}`}>
                    <Link to="/contact">CONTACT</Link></li> : null}
                {!user && <li className={`${styles['nav-link']} ${styles['nav-li']} ${styles['navigation']}`}>
                    <Link to="/contact">CONTACT</Link></li>}
                {     
                  user._role === 'admin' && <li className={`${styles['nav-link']} ${styles['nav-li']} ${styles['navigation']}`}>
                  <Link to="/upload">UPLOAD</Link></li>                     
                }
            </ul>
        </nav>
    );
};