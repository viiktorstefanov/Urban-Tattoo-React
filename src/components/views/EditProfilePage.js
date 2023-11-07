import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/views/EditProfilePage.module.css';
import { FiEdit } from 'react-icons/fi';

export default function EditProfilePage() {
    const [userInfo, setUserInfo] = useState({});
    return (
        <section id="editProfilePage" className={styles.editProfilePage}>
            <form onSubmit={(e) => { e.preventDefault(); console.log(userInfo) }} className={styles.editForm}>

                <div>
                    <FiEdit className={styles['dropdownItem-ico']} />
                </div>

                <div>
                    <label className={styles.label} htmlFor="name">Name:</label>
                    <input className={styles.input} id="name" name="name" type="text" placeholder="Viktor Stefanov" />
                </div>

                <div>
                    <label className={styles.label} htmlFor="phone">Phone:</label>
                    <input className={styles.input} id="phone" name="phone" type="number" placeholder="+359886003010" />
                </div>
                
                <Link to={`/profile/{id}`}>
                    <button className={styles.button} type="submit">Save</button>
                </Link>
            </form>
        </section>
    )
}