import styles from './Problem.module.css';

export default function Problem({ errors }) {

    return (
        <section className={styles['problemPage']}>
            <h2 className={styles['message-problem']}>
                Something went wrong...Please, refresh the page or try again later .
            </h2>
            <span className={styles['errors-problem']}>{errors.error}</span>
        </section>
    );
};