import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import  useForm  from '../../hooks/useForm';
import { login } from '../../service/AuthService';

export default function LoginPage() {

    const onSubmitHandler = async (data) => {
        try {
            const response = await login(data);
            const user = await response.data;
            console.log(user); 
            // if everythink is ok - > navigate('/');
        } catch(e) {
           console.log(e.message)
        }
    };
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
    }, onSubmitHandler)

    return (
        <section id="loginPage" className={styles.loginPage}>
            <form className={styles.loginForm} onSubmit={onSubmit} method='POST'>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        onChange={changeHandler} 
                        id="email" name="email" 
                        type="text" 
                        placeholder="example@email.com" 
                        value={values.email} 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        onChange={changeHandler} 
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