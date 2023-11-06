import { useState } from 'react';
import styles from '../../styles/views/LoginPage.module.css';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const [userInfo, setUserInfo ] = useState({});
    return (
        <section id="loginPage" className={styles.loginPage}>
            <form className={styles.loginForm} onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input onChange={(e) => setUserInfo({ email: e.target.value})} id="email" name="email" type="text" placeholder="viktor@abv.bg" value={userInfo.email} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" />
                </div>
                <button className={styles.button} type="submit">Sign in</button>
                <p className={styles.field}>
                    <span>Sign up <Link to={'/register'} className={styles['log-btn']}>here</Link></span>
                </p>
            </form>
        </section>
    );
};