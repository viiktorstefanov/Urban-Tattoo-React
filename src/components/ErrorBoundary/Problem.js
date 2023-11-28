import styles from './Problem.module.css';

export default function Problem() {

    return (
        <section className={styles['problemPage']}>
            <h2 className={styles['message-problem']}>
                Something went wrong...Please, refresh page or try again later .
            </h2>
        </section>
    );
};