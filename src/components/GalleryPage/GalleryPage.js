import { useState } from 'react';
import styles from './GalleryPage.module.css'
import Spinner from '../Spinner/Spinner';
import MissingTattoos from '../MissingTattoos/MissingTattoos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function GalleryPage({
    tattoos, setTattoos
}) {
    
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');
    const [id, setId] = useState('');
    const user = { _role: 'admin' };
    

    function openFullImg(imageUrl, id) {
        setModel(true);
        setTempImgSrc(imageUrl);
        setId(id);
    };

    async function deleteTattoo() {
        await fetch(`http://localhost:5000/data/tattoos/${id}`, {
            method: 'DELETE',
            });
        
        setTattoos(state => state.filter(x => x._id !== id));    
        setModel(false);
    };

    

    return (
        <>
            <section tabIndex="0" onKeyDown={() => model ? setModel(false) : null } className={styles['galleryPage']}>
                <div className={model ? `${styles['model-open']}` : `${styles.model}`}>
                    {model ?
                        <>
                            <img className={styles['model-open-img']} src={tempImgSrc} alt="tattoo" />
                            <FontAwesomeIcon className={styles['model-open-x']} onClick={() => setModel(false)} icon={faCircleXmark} />
                            {user._role === 'admin' ?
                                <FontAwesomeIcon className={styles['model-open-delete']} onClick={deleteTattoo} icon={faTrashCan} />
                                :
                                null
                            }

                        </>
                        : null}
                </div>
                {tattoos.length > 0
                    ?
                    <>
                        {tattoos.length > 0 ?
                            tattoos.map(tattoo => 
                            <div key={tattoo._id} className={styles['pics']} onClick={() => openFullImg(tattoo.imageUrl, tattoo._id)} >
                                <img style={{width: '100%', borderRadius: '2%', objectFit: 'cover'}} 
                                src={tattoo.imageUrl} alt="tattoo"/>
                            </div>)
                            :
                            <MissingTattoos />}
                    </>
                    : <Spinner />}
            </section>
        </>
    );
};

