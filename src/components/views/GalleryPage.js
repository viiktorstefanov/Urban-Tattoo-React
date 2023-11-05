import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../styles/views/GalleryPage.module.css'
import Spinner from '../Spinner';
import MissingTattoos from '../MissingTattoos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function GalleryPage() {
    const [tattoos, setTattoos] = useState([]);
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');
    const [id, setId] = useState('');
    const user = { _role: 'admin' };
    const baseUrl = 'http://localhost:5000/data/tattoos';

    function openFullImg(imageUrl, id) {
        setTempImgSrc(imageUrl);
        setModel(true);
        setId(id);
    };

    async function deleteTattoo() {
        let result = await fetch(`http://localhost:5000/data/tattoos/${id}`, {
            method: 'DELETE',
            });

        setTattoos(state => state.filter(x => x._id !== id));
        setModel(false);
    };

    useEffect(() => {
        fetch(baseUrl)
            .then(res => res.json())
            .then(data => setTattoos(data));
    }, []);

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
                                <img style={{width: '100%', borderRadius: '2%'}} 
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