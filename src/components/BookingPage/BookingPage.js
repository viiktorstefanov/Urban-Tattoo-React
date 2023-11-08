import styles from './BookingPage.module.css'
import Calendar from 'react-calendar';
import './customCalendar.css';

export default function BookingPage() {
    return (
        <section id="bookingPage" className={styles.bookingPage}>
            <Calendar />
        </section>
    );
};