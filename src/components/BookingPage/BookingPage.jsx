import styles from './BookingPage.module.css'
import Calendar from 'react-calendar';
import './Calendar.css';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import notification from '../../service/notification';
import { useNavigate } from 'react-router-dom';

export default function BookingPage() {
    const { user, updateUserReservations, getAllReservations, isSubmit } = useContext(AuthContext);
    const [model, setModel] = useState(false);
    const [values, setValues] = useState({
        date: '',
        hour: '',
    });
    const [reservations, setReservations] = useState([]);
    const [hours, setHours] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            notification.warning('Only registered users can book an appointment', 5000);
        };
    }, [user]);

    useEffect(() => {
        getAllReservations()
            .then(res => {
                const mergedData = res.reduce((result, current) => {
                    const existingItem = result.find((item) => item.date === current.date);

                    if (existingItem) {
                        // If the date already exists, append the hour to the existing date
                        existingItem.hour += `, ${current.hour}`;
                    } else {
                        result.push({ date: current.date, hour: current.hour });
                    }

                    return result;
                }, []);
                setReservations(mergedData);
            })
            .catch((e) => {
                if (e.status !== 404) {
                    return notification.error(e.message, 3000);
                } else {
                    return navigate('*');
                }
            });
    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();

        if (!values.hour || !values.date) {
            return notification.warning('Please, choose a date and select an hour', 5000);
        }

        await updateUserReservations(values);

        setModel(false);
    };

    const onChange = async (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onClickDay = async (value, event) => {
        if (user) {
            setModel(true);
            const datePicked = value.toLocaleDateString().split('/');
            const reservationDate = `${datePicked[1]}.${datePicked[0]}.${datePicked[2]}`;

            const matchDate = reservations.find(reservation => reservation.date === reservationDate);

            if (matchDate) {
                setHours(matchDate.hour);
            } else {
                setHours(false)
            }

            setValues(state => ({ ...state, date: reservationDate }));
        }
    };

    const tileDisabled = ({ activeStartDate, date, view }) => {
        const day = date.toLocaleDateString().split('/');
        const formatDay = `${day[1]}.${day[0]}.${day[2]}`;
        let isNotAvailable;


        reservations.forEach(reservation => {
            if (reservation.date === formatDay) {
                if (reservation.hour === '14:00-17:00, 10:00-13:00' || reservation.hour === '10:00-13:00, 14:00-17:00') {
                    isNotAvailable = true;
                }
            }
        });

        if (isNotAvailable) {
            return true;
        }
    };

    const tileClassName = ({ activeStartDate, date, view }) => {
        const day = date.toLocaleDateString().split('/');
        const formatDay = `${day[1]}.${day[0]}.${day[2]}`;
        let isNotAvailable = false;

        reservations.forEach(reservation => {
            if (reservation.date === formatDay) {
                if (reservation.hour === '14:00-17:00, 10:00-13:00' || reservation.hour === '10:00-13:00, 14:00-17:00') {
                    isNotAvailable = true;
                }
            }
        });

        if (isNotAvailable) {
            return 'react-calendar__month-view__days__day--notAvailable'
        }
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
                onClickDay={onClickDay}
                tileDisabled={tileDisabled}
                tileClassName={tileClassName}
            />
            <form className={styles.model} onSubmit={onSubmit} method='POST'>
                {model ?
                    <>
                        <p className={styles['hours-message']}>Choose a preferred time:</p>
                        <div className={styles['hours-wrapper']}>
                            {hours !== '10:00-13:00' ? <div className={styles['hours-first-radio-wrapper']} >
                                <input
                                    className={styles['hours-first-radio']}
                                    type="radio"
                                    id="hour"
                                    name="hour"
                                    value="10:00 - 13:00"
                                    onChange={onChange}
                                />
                                <label htmlFor="hour">
                                    10:00 - 13:00
                                </label>
                            </div> : null}
                            {hours !== '14:00-17:00' ? <div className={styles['hours-second-radio-wrapper']} >
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
                            </div> : null}
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