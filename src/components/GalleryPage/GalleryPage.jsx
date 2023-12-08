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
import { IoIosHeartDislike } from 'react-icons/io'
import { useEffect } from 'react';

export default function GalleryPage() {
    const { tattoos, openFullImg, model, deleteHandler, tempImgSrc, onEscPress, onCloseIconClick, id, isLiked, isOwner, likeHandler, unlikeHandler } = useContext(TattooContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (model) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [model]);

    return (
        <>
            <section tabIndex="0" onKeyDown={onEscPress} className={styles['galleryPage']}>
                <>

                    <div className={model ? `${styles['model-open']}` : `${styles.model}`}>
                        {model ?
                            <>
                                <img className={styles['model-open-img']} src={tempImgSrc} alt="tattoo" />

                                <div className={user ? styles['model-open-actions'] : styles['model-open-actions-guest']}>
                                    {
                                        user ?
                                            <>
                                                {!isLiked ? <FontAwesomeIcon className={styles['actions-like']} onClick={likeHandler} icon={faHeart} /> : null}
                                                {isLiked ? <div className={styles['wrapper-dislike']}>
                                                    <IoIosHeartDislike className={styles['dislike']} onClick={unlikeHandler} />
                                                </div> : null}

                                                <Link to={`/gallery/${id}/comments`}>
                                                    <FontAwesomeIcon onClick={() => { onCloseIconClick() }} icon={faComment} />
                                                </Link>
                                            </>
                                            : null
                                    }
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

