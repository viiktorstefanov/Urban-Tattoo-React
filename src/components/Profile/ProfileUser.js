import styles from './Profile.module.css';
import { FiEdit } from 'react-icons/fi';
import { CgProfile, CgLogOut } from 'react-icons/cg';
import { Link } from 'react-router-dom';

export default function ProfileUser() {

    async function logoutHandler() {
        try {
            console.log('user');
            // const logoutUser = await axios.get(`http://localhost:5000/users/logout`);
            //should send req.token;
        } catch(error) {
            console.log(error);
        }
       
    };

    return (
        <>
            <div className={styles['dropdownItem-info']}>
                <span className={styles['dropdownItem-name']}>Viktor</span>
                <span className={styles['dropdownItem-email']}>viktor-stefanov@abv.bg</span>
            </div>
            <ul>
                <li className={styles['dropdownItem']}>
                    <CgProfile className={styles['dropdownItem-ico']} />
                    <Link to='/users/:id' className={styles['dropdownItem-link']}>My Profile</Link>
                </li>
                <li className={styles['dropdownItem']}>
                    <FiEdit className={styles['dropdownItem-ico']} />
                    <Link to='/users/edit/:id' className={styles['dropdownItem-link']}>Edit Profile</Link>
                </li>
                <li onClick={logoutHandler} className={styles['dropdownItem']}>
                    <CgLogOut className={styles['dropdownItem-ico']} />
                    <Link className={styles['dropdownItem-link']}>Logout</Link>
                </li>
            </ul>
        </>
    );
};