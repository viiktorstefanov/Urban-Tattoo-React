import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from 'react';
import { IoMenu } from "react-icons/io5";
import styles from './ResponsiveNavigation.module.css';
import { Link } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function ResponsiveNavigation() {
    const { user, setShowProfile, showResponsive, setShowResponsive } = useContext(AuthContext);

    //subscribe for profile menu and for body overflow(to prevent scrolling down)
    useEffect(() => {
        if (showResponsive) {
            document.body.style.overflow = 'hidden';
            setShowProfile(false);
        }else {
            document.body.style.overflow = 'unset';
        }
    }, [showResponsive, setShowProfile]);

    return (
        <div className={styles['responsive-navigation-dropdown']} onMouseEnter={() => showResponsive ? null : setShowResponsive(true)}
            onMouseLeave={() => !showResponsive ? null : setShowResponsive(false)} >
            <div className='menu-container'>
                <div className='navigation-menu-trigger' onClick={() => { setShowResponsive(!showResponsive) }}>
                    <IoMenu className={styles['navigation-menu-trigger-ico']} />
                </div>

                <div className={`${styles['dropdown-navigation']} ${showResponsive ? styles['active'] : styles['inactive']}`} >
                    <IoIosCloseCircleOutline className={styles['close-icon']} onClick={() => setShowResponsive(!showResponsive)} />
                    <ul>
                        <li className={`${styles['nav-logo']} ${styles['nav-li']}`}>
                            <img src="/assets/images/logo new 2023 transperant cutted.png" alt="logo" />
                        </li>
                        <li className={styles['dropdown-navigation-dropdownItem']} onClick={() => setShowResponsive(!showResponsive)}>
                            <Link to='/' className={styles['dropdown-navigation-dropdownItem-link']}>Home</Link>
                        </li>
                        <li className={styles['dropdown-navigation-dropdownItem']} onClick={() => setShowResponsive(!showResponsive)}>
                            <Link to='/gallery?page=1' className={styles['dropdown-navigation-dropdownItem-link']}>Gallery</Link>
                        </li>
                        <li className={styles['dropdown-navigation-dropdownItem']} onClick={() => setShowResponsive(!showResponsive)}>
                            <Link to='/booking' className={styles['dropdown-navigation-dropdownItem-link']}>Booking</Link>
                        </li>
                        {
                            user && user._role === 'user' ?
                                <li className={styles['dropdown-navigation-dropdownItem']} onClick={() => setShowResponsive(!showResponsive)}>
                                    <Link to='/contact' className={styles['dropdown-navigation-dropdownItem-link']}>Contact</Link>
                                </li> : null
                        }
                        {
                            !user &&
                            <li className={styles['dropdown-navigation-dropdownItem']} onClick={() => setShowResponsive(!showResponsive)}>
                                <Link to='/contact' className={styles['dropdown-navigation-dropdownItem-link']}>Contact</Link>
                            </li>
                        }
                        {
                            user._role === 'admin' &&
                            <li className={styles['dropdown-navigation-dropdownItem']} onClick={() => setShowResponsive(!showResponsive)}>
                                <Link to='/upload' className={styles['dropdown-navigation-dropdownItem-link']}>UPLOAD</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};