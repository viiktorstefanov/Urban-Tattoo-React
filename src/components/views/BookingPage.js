import styles from '../../styles/views/BookingPage.module.css'
import Calendar from 'react-calendar';
import '../../styles/components/customCalendar.css';

export default function BookingPage() {
    return (
        <section id="bookingPage" className={styles.bookingPage}>
            <Calendar />
        </section>
    );
};