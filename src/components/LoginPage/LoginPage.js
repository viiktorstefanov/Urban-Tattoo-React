import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import  useForm  from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import useValidate from '../../hooks/useValidate';
import { registerValidator } from '../../service/validation';
import { loginMessages } from '../../service/validationMessages';

export default function LoginPage() {

    const { onLoginSubmit, isSubmit } = useContext(AuthContext);

    const primaryValues = {
        email: '',
        password: '',
    };

    const primaryValidationValues = {
        email: false,
        password: false,
    };

    const { values, onChange, onSubmit } = useForm(primaryValues, onLoginSubmit);

    const {
        validationErrors,
        onBlur
    } = useValidate(primaryValidationValues, values, registerValidator, loginMessages);

    return (
        <section id="loginPage" className={styles.loginPage}>
            <form className={styles.loginForm} onSubmit={onSubmit} method='POST'>
                <div>
                    <label className={validationErrors.email ? styles.validationWarning : null} htmlFor="email">Email:</label>
                    <input 
                        onChange={onChange}
                        onBlur={onBlur} 
                        id="email" name="email" 
                        type="text" 
                        placeholder="example@email.com" 
                        value={values.email} 
                    />
                </div>
                <div>
                    <label className={validationErrors.password ? styles.validationWarning : null} htmlFor="password">Password:</label>
                    <input 
                        onChange={onChange}
                        onBlur={onBlur} 
                        id="password" name="password" 
                        type="password" placeholder="********" 
                        value={values.password}
                    />
                </div>
                <button className={styles.button} disabled={isSubmit ? true : false} type="submit">{isSubmit ? 'Loading...' : 'Sign in'}</button>
                <p className={styles.field}>
                    <span>Sign up <Link to={'/register'} className={styles['log-btn']}>here</Link></span>
                </p>
            </form>
        </section>
    );
};