import register from '../../service/register';
import styles from '../../styles/views/RegisterPage.module.css';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
    return (
        <section id="registerPage" className={styles.registerPage}>
    <form onSubmit={register} className={styles.registerForm}>
        <div>
            <label className={styles.label} htmlFor="email">Email:</label>
            <input className={styles.input} id="email" name="email" type="text" placeholder="viktor@abv.bg"/>
        </div>
        
        <div>
            <label className={styles.label} htmlFor="password">Password:</label>
            <input className={styles.input} id="password" name="password" type="password" placeholder="********"/>
        </div>

        <div>
            <label className={styles.label} htmlFor="repeatPassword">Repeat Password:</label>
            <input className={styles.input} id="repeatPassword" name="repeatPassword" type="password" placeholder="********"/>
        </div>

        <div>
            <label className={styles.label} htmlFor="name">Name:</label>
            <input className={styles.input} id="name" name="name" type="text" placeholder="Viktor Stefanov"/>
        </div>

        <div>
            <label className={styles.label} htmlFor="phone">Phone:</label>
            <input className={styles.input} id="phone" name="phone" type="number" placeholder="+359886003010"/>
        </div>

        
        <button className={styles.button} type="submit">Sign up</button>
       
        <p className={styles.field}>
            <span>Sign in <Link to={'/login'} className={styles['reg-btn']} >here</Link></span>
        </p>
    </form>
</section>
    );
};