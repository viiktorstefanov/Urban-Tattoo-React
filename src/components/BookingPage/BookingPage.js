import styles from './BookingPage.module.css'
import Calendar from 'react-calendar';
import './customCalendar.css';

export default function BookingPage() {
    return (
        <section id="bookingPage" className={styles.bookingPage}>
            <Calendar onClickDay={(value, event) => {
                const datePicked = value.toLocaleDateString().split('/');
                const reservationDate = `${datePicked[1]}.${datePicked[0]}.${datePicked[2]}`
                console.log(reservationDate)
            }}/>
        </section>
    );
};