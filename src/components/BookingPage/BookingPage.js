import styles from './BookingPage.module.css'
import Calendar from 'react-calendar';
import './customCalendar.css';
import { useState } from 'react';
import useForm from '../../hooks/useForm';

export default function BookingPage() {
    const [model, setModel] = useState(false);

    const primaryValues = {
        date: '',
    };

    const onReserveSubmit = async (data) => {
        console.log(data);
        setModel(false);
    };

    const { values, onChange, onSubmit } = useForm(primaryValues, onReserveSubmit);

    return (
        <section id="bookingPage" className={styles.bookingPage}>
            <Calendar onClickDay={(value, event) => {
                setModel(true);
                const datePicked = value.toLocaleDateString().split('/');
                const reservationDate = `${datePicked[1]}.${datePicked[0]}.${datePicked[2]}`;
                values.date = reservationDate;
                console.log(reservationDate)
            }} />
            <form className={styles.model} onSubmit={onSubmit} method='POST'>
                {model ?

                    <div className={styles.bookingForm}>
                        <span className={styles['span-date']}>
                            Reservation date: {values.date}
                        </span>
                    </div>
                    : null}
                {model ? <button className={styles.button} type="submit">Reserve</button> : null}
            </form>
        </section>
    );
};