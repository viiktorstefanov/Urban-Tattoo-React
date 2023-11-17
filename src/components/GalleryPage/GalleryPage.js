import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './GalleryPage.module.css'
import Spinner from '../Spinner/Spinner';
import MissingTattoos from '../MissingTattoos/MissingTattoos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { TattooContext } from '../../contexts/TattooContext';

export default function GalleryPage() {
    const { tattoos, openFullImg, model, deleteHandler, tempImgSrc, onEscPress, onCloseIconClick  } = useContext(TattooContext);
    
    const { user } = useContext(AuthContext);
    
    return (
        <>
            <section tabIndex="0" onKeyDown={onEscPress} className={styles['galleryPage']}>
                <div className={model ? `${styles['model-open']}` : `${styles.model}`}>
                    {model ?
                        <>
                            <img className={styles['model-open-img']} src={tempImgSrc} alt="tattoo" />
                            <FontAwesomeIcon className={styles['model-open-x']} onClick={onCloseIconClick} icon={faCircleXmark} />
                            {user._role === 'admin' ?
                                <FontAwesomeIcon className={styles['model-open-delete']} onClick={deleteHandler} icon={faTrashCan} />
                                :
                                null
                            }

                        </>
                        : null}
                </div>
                {tattoos
                    ?
                    <>
                        {tattoos.length !== 0 ?
                            tattoos.map(tattoo =>
                                <div key={tattoo._id} className={styles['pics']} onClick={() => openFullImg(tattoo.imageUrl, tattoo._id)} >
                                    <img className={styles['tattoo-img']} src={tattoo.imageUrl} alt="tattoo" />
                                </div>)
                            :
                            <MissingTattoos />}
                    </>
                    : <Spinner />}
            </section>
        </>
    );
};

