import styles from '../../styles/LoginPage.module.css';

export default function LoginPage() {
    return (
        <section id="loginPage" className={styles.loginPage}>
    <form className={styles.loginForm}>
        <div>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="viktor@abv.bg" />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" />
        </div>
        <button type="submit">Sign in</button>
        <p className={styles.field}>
            <span>Sign up <a className={styles['log-btn']} href="/register">here</a></span>
        </p>
    </form>
</section>
    );
};