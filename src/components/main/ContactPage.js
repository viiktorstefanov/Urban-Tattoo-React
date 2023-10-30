import styles from '../../styles/ContactPage.module.css'

export default function ContactPage() {
    return (
        <section id="contactPage" className={styles.contactPage}>
            <div className={styles['contact-info']}>
                <span className={styles['title-span']}>
                    <title>Urban Tattoo Sofia</title>
                </span>
                <span className={styles['address-span']}>София, Студентски град,ул.Витали Таджер 12, бл.7A</span>
                <span className={styles['phone-span']}>+359 886 003 10</span>
                <span className={styles['email-span']}>urbantattoobg@gmail.com</span>
                <span className={styles['hours-span']}>Mon-Fri: <time>10:00 AM - 18:00 PM</time></span>
                <span className={styles['map-span']}>
                    {/* <iframe className="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.496040125108!2d23.354057776124307!3d42.65084267116751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85dd073b761d%3A0xb07ffaa5822541bc!2sUrban%20Tattoo%20Sofia!5e0!3m2!1sbg!2sbg!4v1693149289937!5m2!1sbg!2sbg"
                        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe> */}
                </span>
            </div>
        </section>
    );
};