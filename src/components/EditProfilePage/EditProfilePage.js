import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EditProfilePage.module.css';
import { FiEdit } from 'react-icons/fi';

export default function EditProfilePage() {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        phone: ''
    });

    //use effect(get from server) => setUserInfo(result)

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
                    <label className={styles.label} htmlFor="name">First name:</label>
                    <input className={styles.input} id="firstName" name="firstName" type="text" value={userInfo.firstName} onChange={onChangeHandler}/>
                </div>

                <div>
                    <label className={styles.label} htmlFor="name">Last name:</label>
                    <input className={styles.input} id="lastName" name="lastName" type="text" value={userInfo.lastName} onChange={onChangeHandler}/>
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