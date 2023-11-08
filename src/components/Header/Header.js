import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';

export default function Header() {
    return (
        <header className={styles.header}>
            <Navigation />
            <Profile />
        </header>
    );
};