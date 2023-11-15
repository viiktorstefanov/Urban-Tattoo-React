import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import  useForm  from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export default function LoginPage() {

    const { onLoginSubmit } = useContext(AuthContext);
    const primaryValues = {
        email: '',
        password: '',
    };

    const { values, onChange, onSubmit } = useForm(primaryValues, onLoginSubmit);

    return (
        <section id="loginPage" className={styles.loginPage}>
            <form className={styles.loginForm} onSubmit={onSubmit} method='POST'>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        onChange={onChange} 
                        id="email" name="email" 
                        type="text" 
                        placeholder="example@email.com" 
                        value={values.email} 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        onChange={onChange} 
                        id="password" name="password" 
                        type="password" placeholder="********" 
                        value={values.password}
                    />
                </div>
                <button className={styles.button} type="submit">Sign in</button>
                <p className={styles.field}>
                    <span>Sign up <Link to={'/register'} className={styles['log-btn']}>here</Link></span>
                </p>
            </form>
        </section>
    );
};