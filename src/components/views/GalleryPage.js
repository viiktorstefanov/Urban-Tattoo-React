import { useState, useEffect } from 'react';
import Tattoo from '../Tattoo';
import styles from '../../styles/views/GalleryPage.module.css'
import MissingTattoos from '../MissingTattoos';

export default function GalleryPage() {
    const [tattoos, setTattoos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/data/tattoos')
        .then(res => res.json())
        .then(data => setTattoos(data));
    }, []);

    
    return (
        <section id="galleryPage" className={styles['galleryPage']}>

        <div className={styles['img-gallery']}>
        
            {tattoos.length > 0 ? 
            tattoos.map(tattoo => <Tattoo key={tattoo._id} imageUrl={tattoo.imageUrl} id={tattoo._id}/>) 
            : 
            <MissingTattoos />}
    
        </div>
    </section>
    );
};