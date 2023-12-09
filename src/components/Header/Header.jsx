import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import ResponsiveNavigation from '../ResponsiveNavigation/ResponsiveNavigation';

export default function Header() {
    return (
        <header className={styles.header}>
            <ResponsiveNavigation />
            <Navigation />
            <ProfileMenu />
        </header>
    );
};