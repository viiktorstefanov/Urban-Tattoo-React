import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';
import ResponsiveNavigation from '../ResponsiveNavigation/ResponsiveNavigation';

export default function Header() {
    return (
        <header className={styles.header}>
            <ResponsiveNavigation />
            <Navigation />
            <Profile />
        </header>
    );
};