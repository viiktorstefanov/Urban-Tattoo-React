import styles from './BookingPage.module.css'
import Calendar from 'react-calendar';
import './Calendar.css';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import notification from '../../service/notification';

export default function BookingPage() {
    const { user, updateUserReservations, isSubmit } = useContext(AuthContext);
    const [model, setModel] = useState(false);
    const [ values, setValues ] = useState({
        date: '',
    });

    if(!user) {
        notification.warning('Only registered users can book a consultation appointment.', 5000);
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();

        await updateUserReservations(values);

        setModel(false);
    };


    return (
        <section id="bookingPage" className={styles.bookingPage}>
            <Calendar 
                nextLabel={<FaArrowRight style={{fontSize: '25px'}}/>} 
                prevLabel={<FaArrowLeft style={{fontSize: '25px'}}/>} 
                prev2Label={null} 
                next2Label={null}
                value={new Date()}
                minDetail={'month'}
                maxDetail={'month'}
                onClickDay={(value, event) => {
                if(user) {
                    setModel(true);
                    const datePicked = value.toLocaleDateString().split('/');
                    const reservationDate = `${datePicked[1]}.${datePicked[0]}.${datePicked[2]}`;
                    setValues({date : reservationDate});
                }       
            }} />
            <form className={styles.model} onSubmit={onSubmit} method='POST'>
                {model ?
                    <div className={styles['wrapper-span-date']}>
                        <span className={styles['span-date']}>
                            Reservation date: {values.date}
                        </span>
                    </div>
                    : null}
                {model ? <button className={styles.button} disabled={isSubmit ? true : false} type="submit">{isSubmit ? 'Loading...' : 'Confirm'}</button> : null}
            </form>
        </section>
    );
};