import { useContext } from 'react';
import styles from './ProfilePage.module.css';
import { BiUserPin } from 'react-icons/bi';
import { AuthContext } from '../../contexts/AuthContext';
import { customComparator } from '../../service/customComparator';

export default function ProfilePage() {

    const { user } = useContext(AuthContext);

      const reservationsArray = user.reservations.slice(0);
      const sortedReservations = reservationsArray.sort(customComparator);

    return (
        <section className={styles.profilePage}>
            <div className={styles['profile-wrapper']}>
                <span className={styles['user-logo-wrapper']}><BiUserPin className={styles['user-logo']} /></span>
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
                <span className={styles['user-info-reservation']}>
                    <p className={styles['user-info-category']}>Reservations: </p>
                    <div className={styles['reservation-list']}>
                        {user.reservations.length === 0 ? <p className={styles['user-info-reservation']}>none</p> : null}
                        {user.reservations.length > 0 ? sortedReservations.map((r, index) => <span className={styles['span-reservation']} key={index}>{r.date} - {r.hour}</span>) : null}
                    </div>
                </span>
            </div>
        </section>
    );
};

