import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import useValidate from '../../hooks/useValidate';
import { registerValidator } from '../../service/validation';
import { loginMessages } from '../../service/validationMessages';

export default function Login() {

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
        onBlur, validationErrors
    } = useValidate(primaryValidationValues, values, registerValidator);

    const disabled = Object.values(validationErrors).some(x => x) ||
    Object.values(validationErrors).some(x => x === "") || isSubmit;

    return (
        <section id="loginPage" className={styles.loginPage}>
            <form className={styles.loginForm} onSubmit={onSubmit} method='POST'>
                <div>
                    <label
                        htmlFor="email">
                        Email:
                    </label>
                    <input
                        onChange={onChange}
                        onBlur={onBlur}
                        className={validationErrors.email ? styles.warning : null}
                        id="email"
                        name="email"
                        type="text"
                        placeholder="example@email.com"
                        value={values.email}
                    />
                    {
                        validationErrors.email ?
                            <p className={styles['validation-message']}>
                                {loginMessages.email}
                            </p>
                            : null
                    }
                </div>
                <div>
                    <label
                        htmlFor="password">
                        Password:
                    </label>
                    <input
                        onChange={onChange}
                        onBlur={onBlur}
                        className={validationErrors.password ? styles.warning : null}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="********"
                        value={values.password}
                    />
                      {
                        validationErrors.password ?
                            <p className={styles['validation-message']}>
                                {loginMessages.password}
                            </p>
                            : null
                    }
                </div>
                <button className={styles.button} disabled={disabled} type="submit">{isSubmit ? 'Loading...' : 'Sign in'}</button>
                <p className={styles.field}>
                    <span>Sign up <Link to={'/register'} className={styles['log-btn']}>here</Link></span>
                </p>
            </form>
        </section>
    );
};