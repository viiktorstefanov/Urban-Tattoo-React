import styles from './HomePage.module.css';

export default function homePage() {

    return (
        <section id="homePage" className={styles.homePage} >
                <div className={styles.message}>
                    <p>We specialize in many different tattoo genres while keeping traditional tattooing roots.We are always looking to break boundaries to provide you with a truly unique piece.We prefer working with our clients and collaborate on new ideas, or adding to existing ones, to achieve a finished product that leaves everyone satisfied.Our greatest reward is to leave you feeling proud with your new tattoo.</p>
                </div>
                <div className={styles.artists} id="artists">
                    <div className={styles.artist}>
                        <img src="assets/images/artists/artist1.jpg" alt="artist" />
                        <h3>Stella</h3>
                        <span className={styles['artist-info']}>Stella is very talanted artist, who graduated from the art academy. She has over 8 years of experience in tattooing and hers work is amazing.</span>
                    </div>
                    <div className={styles.artist}>
                        <img src="assets/images/artists/artist2.jpg" alt="artist" />
                        <h3>Stefan</h3>
                        <span className={styles['artist-info']}>Stefan started tattooing in 2008 and enjoys working in many styles. Illustrative neo-traditional tattoos are his main focus, but he is also confident in Japanese styles and realism. </span>
                    </div>
                    <div className={styles.artist}>
                        <img src="assets/images/artists/artist3.jpg" alt="artist" />
                        <h3>Kaloyan</h3>
                        <span className={styles['artist-info']}>Kaloyan began tattooing in 2006. He enjoys many styles of tattooing, but specializes in large-scale illustrative and Japanese work.</span>
                    </div>
                    <div className={styles.artist}>
                        <img src="assets/images/artists/artist4.jpg" alt="artist" />
                        <h3>Eva</h3>
                        <span className={styles['artist-info']}>Eva is with 9 years of tattoo experience and provides not only quality tattoos ,but also personal approach to each client. She also specialises in temporary tattoos with natural and safe pigments.</span>
                    </div>
                </div>
            </section>
    );
};