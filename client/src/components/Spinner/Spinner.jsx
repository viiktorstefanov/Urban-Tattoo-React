import { SpinnerCircular } from 'spinners-react';
import styles from './Spinner.module.css'

export default function Spinner() {
    return (
        <>
            <SpinnerCircular className={styles.spinner} style={{color: '#f3d22d'}} />
        </>
    );
};