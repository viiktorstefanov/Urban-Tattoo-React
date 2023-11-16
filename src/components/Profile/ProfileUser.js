import styles from './Profile.module.css';
import { FiEdit } from 'react-icons/fi';
import { CgProfile, CgLogOut } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";

export default function ProfileUser() {
    // const navigate = useNavigate();
    const { user, onLogout } = useContext(AuthContext);

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
                <li onClick={onLogout} className={styles['dropdownItem']}>
                    <CgLogOut className={styles['dropdownItem-ico']} />
                    <Link className={styles['dropdownItem-link']}>Logout</Link>
                </li>
            </ul>
        </>
    );
};