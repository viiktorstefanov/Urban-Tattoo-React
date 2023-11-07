import styles from '../styles/components/Header.module.css';
import Navigation from './Navigation';
import Profile from './Profile';

export default function Header() {
    return (
        <header className={styles.header}>
            <Navigation />
            <Profile />
        </header>
    );
};