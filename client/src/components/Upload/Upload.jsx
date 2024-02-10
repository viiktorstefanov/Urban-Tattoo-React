import styles from './Upload.module.css';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useContext } from 'react';
import { TattooContext } from '../../contexts/TattooContext';

export default function Upload() {
    const { size, isImage, haveFile, image, onFileChange, onFileSubmit, isSubmit } = useContext(TattooContext);

    return (
        <section id="uploadPage" className={styles.uploadPage}>
            <div className={styles['file-card']}>
                <div className={styles['file-inputs']}>
                    <form className={styles['uploadForm']} onSubmit={onFileSubmit} encType='multipart/form-data' method='post'>
                        <input className={styles['file-input']} type="file" name='files' onChange={onFileChange} />
                        <span className={styles['add-btn-wrap']}>
                            <i className={styles['add-btn']}>
                                <AiFillPlusCircle className={styles['plus-icon']}/>
                            </i>
                        </span>
                        <button className={styles['submit-btn']} disabled={isSubmit ? true : false} type='submit'>
                            {isSubmit ? 'Loading..' : 'Upload'}
                        </button>
                    </form>
                </div>
                {size ? null : <p className={styles['supported-files']}>Max-size: 5MB</p>}
                {!isImage ? null 
                : <p className={styles['supported-files']}>Supported files: JPG PNG</p> }
                {image !== '' ? <p className={styles['file']}>File name: {image.name} </p> : null}
                {haveFile ? null : <p className={styles['file']}>Please, select a file.</p>}
            </div>
        </section>
    );
};