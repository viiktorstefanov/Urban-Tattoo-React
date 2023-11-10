import styles from './Test.module.css';
import { AiFillPlusCircle } from 'react-icons/ai';


export default function Test({
    onSubmitUploadHandler, image, setImage
}) {



    const fileHandler = (e) => {
        if (e.target.files[0].type !== "image/jpeg") {
            //should reset input 
            alert('Only images are allowed');
            return;
        }
        if (e.target.files[0].size > 5000000) {
            //should reset input 
            alert('Images over 5MB are not allowed !');
            return;
        }
        setImage(e.target.files[0]);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('files', image);

        onSubmitUploadHandler(formData);
    };



    return (
        <section id="uploadPage" className={styles.uploadPage}>
            <div className={styles['file-card']}>
                <div className={styles['file-inputs']}>
                    <input className={styles['file-input']} type="file" onChange={fileHandler} />
                    <button className={styles['add-btn-wrap']} onClick={onSubmit}>
                        <i className={styles['add-btn']}>
                            <AiFillPlusCircle /> 
                        </i>
                        Upload
                    </button>
                </div>

                <p className={styles['supported-files']}>Supported files: JPG, PNG</p>
            </div>
        </section>
    );
};