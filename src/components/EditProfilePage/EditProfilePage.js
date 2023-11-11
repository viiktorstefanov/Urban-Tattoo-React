import { useState } from 'react';
import styles from './EditProfilePage.module.css';
import { FiEdit } from 'react-icons/fi';
// import axios from 'axios';

export default function EditProfilePage() {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        phone: ''
    });
    
    async function deleteUserHandler() {
        try {
            // const deleteUser = await axios.delete(`http://localhost:5000/users/${id}`);
           
        } catch(error) {
            console.log(error);
        }
       
    };

    async function editUserHandler(e) {
        e.preventDefault();
        //handle if any userInfo is missing

        try {
            // const editUser = await axios.put(`http://localhost:5000/users/${id}`,userInfo);
           
        } catch(error) {
            console.log(error);
        }
       
    };

    //use effect(get from server) => setUserInfo(result)

    const onChangeHandler = (e) => {
        setUserInfo(state => ({...state, [e.target.name] : e.target.value}));
    };

    return (
        <section id="editProfilePage" className={styles.editProfilePage}>
            <form onSubmit={editUserHandler} className={styles.editForm}>

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

                <div className={styles['deleteProfileDiv']}>
                        <span onClick={deleteUserHandler} className={styles['deleteProfileBtn']}>Delete profile</span>
                </div>
                    <button className={styles.button} type="submit">Save</button>
            </form>
        </section>
    )
}