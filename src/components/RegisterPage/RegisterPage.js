import { useState } from 'react';
import styles from './RegisterPage.module.css';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        phone: '',
    });

    const onChangeHandler = (e) => {
        setUserInfo(state => ({...state, [e.target.name] : e.target.value}));
    };    
    
    return (
        <section id="registerPage" className={styles.registerPage}>
            <form onSubmit={(e) => { e.preventDefault(); console.log(userInfo) }} className={styles.registerForm}>
                <div>
                    <label className={styles.label} htmlFor="email">Email:</label>
                    <input onChange={onChangeHandler} className={styles.input} id="email" name="email" type="text" value={userInfo.email} placeholder="viktor@abv.bg" />
                </div>

                <div>
                    <label className={styles.label} htmlFor="password">Password:</label>
                    <input className={styles.input} onChange={onChangeHandler} id="password" name="password" type="password" placeholder="********" value={userInfo.password}/>
                </div>

                <div>
                    <label className={styles.label} htmlFor="repeatPassword">Repeat Password:</label>
                    <input className={styles.input} onChange={onChangeHandler} id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value={userInfo.repeatPassword}/>
                </div>

                <div>
                    <label className={styles.label} htmlFor="name">Name:</label>
                    <input className={styles.input} onChange={onChangeHandler} id="name" name="name" type="text" placeholder="Viktor Stefanov" value={userInfo.name}/>
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