import { useState, useEffect } from 'react';
import styles from '../../styles/views/GalleryPage.module.css'
import Spinner from '../Spinner';
import MissingTattoos from '../MissingTattoos';




export default function GalleryPage() {
    const [tattoos, setTattoos] = useState([]);
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');
    const user = { _role: 'admin'};

    function openFullImg(imageUrl) {
        setTempImgSrc(imageUrl);
        setModel(true);
    }

    useEffect(() => {
        fetch('http://localhost:5000/data/tattoos')
            .then(res => res.json())
                .then(data => setTattoos(data));
    }, []);


    return (
        <section id="galleryPage" className={styles['galleryPage']}>
            <div className={model ? `${styles['model-open']}` : `${styles.model}`}>
                    {model ? 
                    <>
                        <img  className={styles['model-open-img']} src={tempImgSrc} alt="tattoo" />
                        <span className={styles['model-open-x']} onClick={() => setModel(false) }>X</span>
                        {user._role === 'admin' ? 
                        <span className={styles['model-open-delete']} onClick={() => alert('are you sure?') }>Delete</span>
                        :
                        null
                        }
                        
                    </> 
                    : null}
            </div>
            {tattoos.length > 0 
            ? 
            <div className={styles['img-gallery']}>
                {tattoos.length > 0 ?
                    tattoos.map(tattoo => <div key={tattoo._id} onClick={()=> openFullImg(tattoo.imageUrl)} ><img src={tattoo.imageUrl} alt="no-img" data-id={tattoo._id}/></div>)
                    :
                    <MissingTattoos />}
            </div> 
            : <Spinner />}
        </section>
    );
};