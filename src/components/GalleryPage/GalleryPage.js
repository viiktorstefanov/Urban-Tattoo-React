import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './GalleryPage.module.css'
import Spinner from '../Spinner/Spinner';
import MissingTattoos from '../MissingTattoos/MissingTattoos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleXmark, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { TattooContext } from '../../contexts/TattooContext';
import { PaginatedItems } from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import { get } from '../../service/request';

export default function GalleryPage() {
    const { tattoos, openFullImg, model, deleteHandler, tempImgSrc, onEscPress, onCloseIconClick, id, isLiked, isOwner, getTattooLikes } = useContext(TattooContext);

    const { user } = useContext(AuthContext);

    return (
        <>
            <section tabIndex="0" onKeyDown={onEscPress} className={styles['galleryPage']}>
                <>
                    <div className={model ? `${styles['model-open']}` : `${styles.model}`}>
                        {model ?
                            <>
                                <img className={styles['model-open-img']} src={tempImgSrc} alt="tattoo" />

                                <div className={styles['model-open-actions']}>  
                                    {user ?
                                        <>
                                            {!isLiked && !isOwner ? <FontAwesomeIcon  className={styles['actions-like']} onClick={getTattooLikes} icon={faHeart} /> : null} 
                                            <Link to={`/gallery/${id}/comments`}>
                                                <FontAwesomeIcon onClick={() => {  }} icon={faComment} />
                                            </Link>
                                        </> 
                                          : null}
                                    {user._role === 'admin' && isOwner ?
                                        <FontAwesomeIcon className={styles['model-open-delete']} onClick={deleteHandler} icon={faTrashCan} />
                                        :
                                        null
                                    }
                                    <FontAwesomeIcon className={styles['model-open-x']} onClick={onCloseIconClick} icon={faCircleXmark} />
                                </div>
                            </>
                            : null}
                    </div>
                    {tattoos
                        ?
                        <>
                            {tattoos.length !== 0 ?
                                <PaginatedItems itemsPerPage={8} tattoos={tattoos} openFullImg={openFullImg} />
                                :
                                <MissingTattoos />}
                        </>
                        : <Spinner />}
                </>
            </section>
        </>
    );
};

