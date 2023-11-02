import styles from '../../styles/BookingPage.module.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function BookingPage() {
    return (
        <section id="bookingPage" className={styles.bookingPage}>
            <h1 className={styles.message}>TO DO WHEN LEARN REACT</h1>
            <img className={styles.calendar} src="/images/calendarView.jpg" alt="calendar"/>
            <div>
            <Calendar />

            </div>
        </section>
    );
};