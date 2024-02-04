import styles from './MissingTattoos.module.css';

export default function MissingTattoos() {
    return (
        <div className={styles['defaultPage']}>
            <p className={styles['missing-message']}>There are currently no images uploaded</p>
        </div>
    );
};