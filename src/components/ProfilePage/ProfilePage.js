import { useContext } from 'react';
import styles from './ProfilePage.module.css';
import { BiUserPin } from 'react-icons/bi';
import { AuthContext } from '../../contexts/AuthContext';

export default function ProfilePage() {

    const { user } = useContext(AuthContext);

    return (
        <section className={styles.profilePage}>
            <div className={styles['profile-wrapper']}>
                <span className={styles['user-logo-wrapper']}><BiUserPin className={styles['user-logo']}/></span>
                <span className={styles['user-info']}>
                    <p className={styles['user-info-category']}>Email: </p>
                    <p className={styles['user-info-email']}>{user.email}</p>
                </span>
                <span className={styles['user-info']}>
                    <p className={styles['user-info-category']}>First name: </p>
                    <p className={styles['user-info-name']}>{user.firstName}</p>
                </span>
                <span className={styles['user-info']}>
                    <p className={styles['user-info-category']}>Last name: </p>
                    <p className={styles['user-info-name']}>{user.lastName}</p>
                </span>
                <span className={styles['user-info']}>
                    <p className={styles['user-info-category']}>Phone: </p>
                    <p className={styles['user-info-phone']}>{user.phone}</p>
                </span>
                <span className={styles['user-info']}>
                    <p className={styles['user-info-category']}>Reservations: </p>
                    <div className={styles['reservation-list']}>
                        {user.reservations.length === 0 ? <p className={styles['user-info-reservation']}>none</p> : null }
                        {user.reservations.length > 0 ? user.reservations.map((r, index) => <span key={index}>{r}</span>) : null }
                    </div>
                    
                </span>
            </div>
        </section>
    );
};