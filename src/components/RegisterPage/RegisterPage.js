import { useState } from 'react';
import styles from './RegisterPage.module.css';
import { Link } from 'react-router-dom';
import { post } from '../../service/request';

export default function RegisterPage() {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        phone: '',
    });
    const [errors, setErrors] = useState([]);

    const onChangeHandler = (e) => {
        setUserInfo(state => ({...state, [e.target.name] : e.target.value}));
    }; 
    
    const onSubmitRegisterHandler = async (e) => {
        try {
            e.preventDefault();

            const response = await post('/users/register', userInfo);
            const token = await response.accessToken;
            console.log(token);
            

            
            // navigate('/');
        } catch(e) {
            setErrors(e);
        }
    };
    
    return (
        <section id="registerPage" className={styles.registerPage}>
            {errors ? <span>{errors['firstName']}</span> : null}
            <form onSubmit={onSubmitRegisterHandler} className={styles.registerForm}>
                <div>
                    <label className={styles.label} htmlFor="name">First name:</label>
                    <input className={styles.input} onChange={onChangeHandler} id="firstName" name="firstName" type="text" placeholder="First name" value={userInfo.firstName}/>
                </div>

                <div>
                    <label className={styles.label} htmlFor="name">Last name:</label>
                    <input className={styles.input} onChange={onChangeHandler} id="lastName" name="lastName" type="text" placeholder="Last name" value={userInfo.lastName}/>
                </div>

                <div>
                    <label className={styles.label} htmlFor="email">Email:</label>
                    <input onChange={onChangeHandler} className={styles.input} id="email" name="email" type="text" value={userInfo.email} placeholder="example@email.com" />
                </div>

                <div>
                    <label className={styles.label} htmlFor="password">Password:</label>
                    <input className={styles.input} onChange={onChangeHandler} id="password" name="password" type="password" placeholder="New password" value={userInfo.password}/>
                </div>

                <div>
                    <label className={styles.label} htmlFor="repeatPassword">Repeat Password:</label>
                    <input className={styles.input} onChange={onChangeHandler} id="repeatPassword" name="repeatPassword" type="password" placeholder="Repeat Password" value={userInfo.repeatPassword}/>
                </div>


                <div>
                    <label className={styles.label} htmlFor="phone">Phone:</label>
                    <input className={styles.input} onChange={onChangeHandler} id="phone" name="phone" type="number" placeholder="+359886003010" value={userInfo.phone}/>
                </div>


                <button className={styles.button} type="submit">Sign up</button>

                <p className={styles.field}>
                    <span>Sign in <Link to={'/login'} className={styles['reg-btn']} >here</Link></span>
                </p>
            </form>
        </section>
    );
};