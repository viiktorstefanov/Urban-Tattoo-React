import styles from '../styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles['links-footer']}>
                <a className={styles.instagram} href="https://www.instagram.com/urban.tattoo.sofia/">
                    <i className={`fa-brands fa-instagram ${styles['instagram-icon']}`}></i>
                </a>
                <a className={styles.facebook} href="https://www.facebook.com/urban.tattoo.sofia/">
                    <i className={`fa-brands fa-square-facebook ${styles['facebook-icon']}`}></i>
                </a>
                <a className={styles.google} href="https://g.page/r/CbxBJYKl-n-wEB0">
                    <i className={`fa-brands fa-square-google-plus ${styles['google-icon']}`}></i>
                </a>
            </div>
            <div className={styles.copyright}>
                © 2023 Copyright: 
                <a className={styles['copyright-author']} href="https://www.linkedin.com/in/viktor-stefanov-953047263/"> Viktor Stefanov</a>
            </div>
        </footer>
    );
};