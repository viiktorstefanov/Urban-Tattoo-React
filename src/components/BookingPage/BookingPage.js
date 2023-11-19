import styles from './BookingPage.module.css'
import Calendar from 'react-calendar';
import './customCalendar.css';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function BookingPage() {
    const { user, updateUserReservations } = useContext(AuthContext);
    const [model, setModel] = useState(false);
    const [ values, setValues ] = useState({
        date: '',
    });

    const onReserveSubmit = async (e) => {
        e.preventDefault();

        await updateUserReservations(values);

        setModel(false);
    };


    return (
        <section id="bookingPage" className={styles.bookingPage}>
            <Calendar onClickDay={(value, event) => {
                if(user) {
                    setModel(true);
                    const datePicked = value.toLocaleDateString().split('/');
                    const reservationDate = `${datePicked[1]}.${datePicked[0]}.${datePicked[2]}`;
                    setValues({date : reservationDate});
                } else {
                    console.log('only registed users can make reservations');
                }
                
            }} />
            <form className={styles.model} onSubmit={onReserveSubmit} method='POST'>
                {model ?

                    <div className={styles.bookingForm}>
                        <span className={styles['span-date']}>
                            Reservation date: {values.date}
                        </span>
                    </div>
                    : null}
                {model ? <button className={styles.button} type="submit">Send</button> : null}
            </form>
        </section>
    );
};