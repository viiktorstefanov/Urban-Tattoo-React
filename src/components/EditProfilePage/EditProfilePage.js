import { useContext } from 'react';
import styles from './EditProfilePage.module.css';
import { FiEdit } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';

export default function EditProfilePage() {
    const { user, onDelete, onEditSubmit, isSubmit, isDeleteSubmit } = useContext(AuthContext);

    const primaryValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
    };
   
    const { values, onChange, onSubmit } = useForm(primaryValues, onEditSubmit);

    return (
        <section id="editProfilePage" className={styles.editProfilePage}>
            <form onSubmit={onSubmit} className={styles.editForm}>

                <div>
                    <FiEdit className={styles['dropdownItem-ico']} />
                </div>

                <div>
                    <label className={styles.label} htmlFor="name">First name:</label>
                    <input className={styles.input} id="firstName" name="firstName" type="text" value={values.firstName} onChange={onChange}/>
                </div>

                <div>
                    <label className={styles.label} htmlFor="name">Last name:</label>
                    <input className={styles.input} id="lastName" name="lastName" type="text" value={values.lastName} onChange={onChange}/>
                </div>

                <div>
                    <label className={styles.label} htmlFor="phone">Phone:</label>
                    <input className={styles.input} id="phone" name="phone" type="number" value={values.phone} onChange={onChange}/>
                </div>

                <div className={styles['deleteProfileDiv']}>
                        <button onClick={(e) => { e.preventDefault(); onDelete()}} disabled={isDeleteSubmit ? true : false} className={styles['deleteProfileBtn']}>Delete profile</button>
                </div>
                    <button className={styles.button} disabled={isSubmit ? true : false} type="submit">{isSubmit ? 'Loading...' : 'Save'}</button>
            </form>
        </section>
    )
}