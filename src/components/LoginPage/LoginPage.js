import { useState } from 'react';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
    const [userInfo, setUserInfo ] = useState({
        email: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        setUserInfo(state => ({...state, [e.target.name] : e.target.value}));
    };

    const onSubmitLoginHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/users/login', userInfo);
            console.log(response);
            

            
        } catch(e) {
            return {};
        }
        // navigate('/');
    };

    return (
        <section id="loginPage" className={styles.loginPage}>
            <form className={styles.loginForm} onSubmit={onSubmitLoginHandler}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input onChange={onChangeHandler} id="email" name="email" type="text" placeholder="example@email.com" value={userInfo.email} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input onChange={onChangeHandler} id="password" name="password" type="password" placeholder="********" value={userInfo.password}/>
                </div>
                <button className={styles.button} type="submit">Sign in</button>
                <p className={styles.field}>
                    <span>Sign up <Link to={'/register'} className={styles['log-btn']}>here</Link></span>
                </p>
            </form>
        </section>
    );
};