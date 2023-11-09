import styles from './ProfilePage.module.css';
import { BiUserPin } from 'react-icons/bi';

export default function ProfilePage() {
    
    return (
        <section className={styles.profilePage}>
            <div className={styles['profile-wrapper']}>
                <span className={styles['user-logo-wrapper']}><BiUserPin className={styles['user-logo']}/></span>
                <span className={styles['user-info']}>
                    <p className={styles['user-info-category']}>Email: </p>
                    <p className={styles['user-info-email']}>gosho@abv.bg</p>
                </span>
                <span className={styles['user-info']}>
                    <p className={styles['user-info-category']}>First name: </p>
                    <p className={styles['user-info-name']}>Gosho</p>
                </span>
                <span className={styles['user-info']}>
                    <p className={styles['user-info-category']}>Last name: </p>
                    <p className={styles['user-info-name']}>Petrov</p>
                </span>
                <span className={styles['user-info']}>
                    <p className={styles['user-info-category']}>Phone: </p>
                    <p className={styles['user-info-phone']}>+359886003010</p>
                </span>
                <span className={styles['user-info']}>
                    <p className={styles['user-info-category']}>Reservation: </p>
                    <p className={styles['user-info-reservation']}>none</p>
                </span>
            </div>
        </section>
    )
}