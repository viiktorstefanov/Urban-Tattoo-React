import { useState, useEffect } from 'react';
import styles from '../../styles/views/GalleryPage.module.css'
import Tattoos from '../Tattoos';
import Spinner from '../Spinner';
import FullScreenImage from '../FullScreenImage';

export default function GalleryPage() {
    const [tattoos, setTattoos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/data/tattoos')
            .then(res => res.json())
                .then(data => setTattoos(data));
    }, []);


    return (
        <section id="galleryPage" className={styles['galleryPage']}>
            <FullScreenImage />
            {tattoos.length > 0 ? <Tattoos tattoos={tattoos} /> : <Spinner/>}
        </section>
    );
};