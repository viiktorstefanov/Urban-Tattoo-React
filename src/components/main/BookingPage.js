import styles from '../../styles/BookingPage.module.css'
import Calendar from 'react-calendar';
import '../../styles/customCalendar.css';

export default function BookingPage() {
    return (
        <section id="bookingPage" className={styles.bookingPage}>
            <Calendar />
        </section>
    );
};