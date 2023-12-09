import styles from './ProfileMenu.module.css';
import { FiEdit } from 'react-icons/fi';
import { CgProfile, CgLogOut } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";

export default function ProfileUser() {

    const { user, onLogout, isSubmit } = useContext(AuthContext);

    return (
        <>
            <div className={styles['dropdownItem-info']}>
                <span className={styles['dropdownItem-name']}>{`${user.firstName} ${user.lastName}`}</span>
                <span className={styles['dropdownItem-email']}>{user.email}</span>
            </div>
            <ul>
                <li className={styles['dropdownItem']}>
                    <CgProfile className={styles['dropdownItem-ico']} />
                    <Link to={`/profile/${user._id}`} className={styles['dropdownItem-link']}>My Profile</Link>
                </li>
                <li className={styles['dropdownItem']}>
                    <FiEdit className={styles['dropdownItem-ico']} />
                    <Link to={`/profile/edit/${user._id}`} className={styles['dropdownItem-link']}>Edit Profile</Link>
                </li>
                <fieldset className={styles.fieldset} onClick={onLogout} disabled={isSubmit ? true : false}>
                    <li className={styles['dropdownItem']}>
                        <CgLogOut className={styles['dropdownItem-ico']} />
                        <Link className={styles['dropdownItem-link']}>{isSubmit ? 'Loading...' : 'Logout'}</Link>
                    </li>
                </fieldset>
            </ul>
        </>
    );
};