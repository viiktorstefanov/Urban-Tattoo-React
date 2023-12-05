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
    const [values, setValues] = useState({
        date: '',
        hour: '',
    });

    if (!user) {
        notification.warning('Only registered users can book an appointment', 5000);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!values.hour || !values.date) {
            return notification.warning('Please, choose a date and select an hour', 5000);
        }

        await updateUserReservations(values);

        setModel(false);
    };

    const onChange = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };


    return (
        <section id="bookingPage" className={styles.bookingPage}>
            <Calendar
                nextLabel={<FaArrowRight style={{ fontSize: '25px' }} />}
                prevLabel={<FaArrowLeft style={{ fontSize: '25px' }} />}
                prev2Label={null}
                next2Label={null}
                minDetail={'month'}
                maxDetail={'month'}
                onClickDay={(value, event) => {
                    if (user) {
                        setModel(true);
                        const datePicked = value.toLocaleDateString().split('/');
                        const reservationDate = `${datePicked[1]}.${datePicked[0]}.${datePicked[2]}`;
                        setValues(state => ({ ...state, date: reservationDate }));
                    }
                }} />
            <form className={styles.model} onSubmit={onSubmit} method='POST'>
                {model ?
                    <>
                        <p className={styles['hours-message']}>Choose a preferred time:</p>
                        <div className={styles['hours-wrapper']}>
                            <div className={styles['hours-first-radio-wrapper']} >
                                <input
                                    className={styles['hours-first-radio']}
                                    type="radio"
                                    id="hour"
                                    name="hour"
                                    value="10:00 - 13:00"
                                    onChange={onChange} />
                                <label htmlFor="hour">
                                    10:00 - 13:00
                                </label>
                            </div>
                            <div className={styles['hours-second-radio-wrapper']} >
                                <input
                                    className={styles['hours-second-radio']}
                                    type="radio"
                                    id="hour2"
                                    name="hour"
                                    value="14:00 - 17:00"
                                    onChange={onChange}
                                />
                                <label htmlFor="hour2">
                                    14:00 - 17:00
                                </label>
                            </div>
                        </div>
                    </>
                    : null}
                {model ?
                    <button
                        className={styles.button}
                        disabled={isSubmit ? true : false}
                        type="submit">{isSubmit ? 'Loading...' : 'Confirm'}
                    </button>
                    : null}
            </form>
        </section>
    );
};