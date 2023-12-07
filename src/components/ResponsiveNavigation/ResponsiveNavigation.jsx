import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from 'react';
import { IoMenu } from "react-icons/io5";
import styles from './ResponsiveNavigation.module.css';
import { Link } from "react-router-dom";

export default function ResponsiveNavigation() {
    const { user, setShowProfile } = useContext(AuthContext);
    const [show, setshow] = useState(false);

    //subscribe for profile menu
    useEffect(() => {
        if (show) {
            setShowProfile(false);
        }
    }, [show])

    return (
        <div className={styles['responsive-navigation-dropdown']} onMouseEnter={() => show ? null : setshow(true)}
            onMouseLeave={() => !show ? null : setshow(false)} >
            <div className='menu-container'>
                <div className='navigation-menu-trigger' onClick={() => { setshow(!show) }}>
                    <IoMenu className={styles['navigation-menu-trigger-ico']} />
                </div>

                <div className={`${styles['dropdown-navigation']} ${show ? styles['active'] : styles['inactive']}`} >
                    <ul>
                        <li className={styles['dropdown-navigation-dropdownItem']}>
                            <Link to='/' className={styles['dropdown-navigation-dropdownItem-link']}>Home</Link>

                        </li>
                        <li className={styles['dropdown-navigation-dropdownItem']}>
                            <Link to='/gallery?page=1' className={styles['dropdown-navigation-dropdownItem-link']}>Gallery</Link>
                        </li>
                        <li className={styles['dropdown-navigation-dropdownItem']}>
                            <Link to='/booking' className={styles['dropdown-navigation-dropdownItem-link']}>Booking</Link>
                        </li>
                        {
                            user && user._role === 'user' ?
                                <li className={styles['dropdown-navigation-dropdownItem']}>
                                    <Link to='/contact' className={styles['dropdown-navigation-dropdownItem-link']}>Contact</Link>
                                </li> : null
                        }
                        {
                            !user &&
                                <li className={styles['dropdown-navigation-dropdownItem']}>
                                    <Link to='/contact' className={styles['dropdown-navigation-dropdownItem-link']}>Contact</Link>
                                </li>
                        }
                        {
                            user._role === 'admin' &&
                                <li className={styles['dropdown-navigation-dropdownItem']}>
                                    <Link to='/upload' className={styles['dropdown-navigation-dropdownItem-link']}>UPLOAD</Link>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};