import { useContext } from 'react';
import styles from './RegisterPage.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import useForm from '../../hooks/useForm';
import useValidate from '../../hooks/useValidate';
import { registerValidator } from '../../service/validation';
import { registerMessages } from '../../service/validationMessages';

export default function RegisterPage() {
    const { onRegisterSubmit, isSubmit } = useContext(AuthContext);

    const primaryValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        phone: '',
    };

    const primaryValidationValues = {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        repeatPassword: false,
        phone: false,
    };

    const { values, onChange, onSubmit } = useForm(primaryValues, onRegisterSubmit);

    const {
        onBlur
    } = useValidate(primaryValidationValues, values, registerValidator, registerMessages);

    return (
        <section id="registerPage" className={styles.registerPage}>
            <form onSubmit={onSubmit} className={styles.registerForm} method='POST'>
                <div>
                    <label                        
                        htmlFor="name">
                        First name:
                    </label>
                    <input
                        className={styles.input}
                        onChange={onChange}
                        onBlur={onBlur}
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        value={values.firstName}
                    />
                </div>

                <div>
                    <label
                        htmlFor="name">
                        Last name:
                    </label>
                    <input
                        className={styles.input}
                        onChange={onChange}
                        onBlur={onBlur}
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        value={values.lastName}
                    />
                </div>

                <div>
                    <label
                        htmlFor="email">
                        Email:
                    </label>
                    <input
                        onChange={onChange}
                        className={styles.input}
                        onBlur={onBlur}
                        id="email"
                        name="email"
                        type="text"
                        value={values.email}
                        placeholder="example@email.com"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password">
                        Password:
                    </label>
                    <input
                        className={styles.input}
                        onChange={onChange}
                        onBlur={onBlur}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="New password"
                        value={values.password}
                    />
                </div>

                <div>
                    <label
                        htmlFor="repeatPassword">
                        Repeat Password:
                    </label>
                    <input
                        className={styles.input}
                        onChange={onChange}
                        onBlur={onBlur}
                        id="repeatPassword"
                        name="repeatPassword"
                        type="password"
                        placeholder="Repeat Password"
                        value={values.repeatPassword}
                    />
                </div>


                <div>
                    <label
                        htmlFor="phone">
                        Phone:
                    </label>
                    <input
                        className={styles.input}
                        onChange={onChange}
                        onBlur={onBlur}
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="+359886003010"
                        value={values.phone}
                    />
                </div>


                <button
                    className={styles.button}
                    disabled={isSubmit ? true : false}
                    type="submit">
                    {isSubmit ? 'Loading...' : 'Sign up'}
                </button>

                <p className={styles.field}>
                    <span>
                        Sign in
                        <Link to={'/login'} className={styles['reg-btn']} >
                            here
                        </Link>
                    </span>
                </p>
            </form>
        </section>
    );
};
