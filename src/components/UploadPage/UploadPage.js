import styles from './UploadPage.module.css';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useState } from 'react';

export default function UploadPage({
    onSubmitUploadHandler, image, setImage
}) {
    const [ isImage, setIsImage] = useState(false);
    const [ size, setSize] = useState(true);
    const [ haveFile, setHaveFile] = useState(false);

    const fileHandler = (e) => {
        setHaveFile(true);
        if (e.target.files[0].size > 5000000) {
            setImage('');
            setSize(false);
            return;
        } else{
            setSize(true);
        }
        if (e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png") {
            setImage(e.target.files[0]);
            setIsImage(false);
            
        } else {
            setImage('');
            setIsImage(true);
            return;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('files', image);
        setImage('');
        onSubmitUploadHandler({ files: formData });
    };

    return (
        <section id="uploadPage" className={styles.uploadPage}>
            <div className={styles['file-card']}>
                <div className={styles['file-inputs']}>
                    <form className={styles['uploadForm']} onSubmit={onSubmit}>
                        <input className={styles['file-input']} type="file" onChange={fileHandler} />
                        <span className={styles['add-btn-wrap']}>
                            <i className={styles['add-btn']}>
                                <AiFillPlusCircle className={styles['plus-icon']}/>
                            </i>
                        </span>
                        <button className={styles['submit-btn']} type='submit'>
                            Upload
                        </button>
                    </form>
                </div>
                {size ? null : <p className={styles['supported-files']}>Max-size: 5MB</p>}
                {!isImage ? null 
                : <p className={styles['supported-files']}>Supported files: JPG or PNG</p> }
                {image !== '' ? <p className={styles['file']}>File name: {image.name} </p> : null}
                {haveFile ? null : <p className={styles['file']}>Please, select a file.</p>}
            </div>
        </section>
    );
};