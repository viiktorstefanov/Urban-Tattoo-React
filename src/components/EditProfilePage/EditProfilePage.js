import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EditProfilePage.module.css';
import { FiEdit } from 'react-icons/fi';

export default function EditProfilePage() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: ''
    });

    const onChangeHandler = (e) => {
        setUserInfo(state => ({...state, [e.target.name] : e.target.value}));
    };

    return (
        <section id="editProfilePage" className={styles.editProfilePage}>
            <form onSubmit={(e) => { e.preventDefault(); console.log(userInfo) }} className={styles.editForm}>

                <div>
                    <FiEdit className={styles['dropdownItem-ico']} />
                </div>

                <div>
                    <label className={styles.label} htmlFor="name">Name:</label>
                    <input className={styles.input} id="name" name="name" type="text" value={userInfo.name} onChange={onChangeHandler}/>
                </div>

                <div>
                    <label className={styles.label} htmlFor="phone">Phone:</label>
                    <input className={styles.input} id="phone" name="phone" type="number" value={userInfo.phone} onChange={onChangeHandler}/>
                </div>
                
                <Link to={`/users/{id}`}>
                    <button className={styles.button} type="submit">Save</button>
                </Link>
            </form>
        </section>
    )
}