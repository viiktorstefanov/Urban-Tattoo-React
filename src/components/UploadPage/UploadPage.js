import styles from './UploadPage.module.css';
import { AiFillPlusCircle } from 'react-icons/ai';


export default function Test({
    onSubmitUploadHandler, image, setImage
}) {
    const fileHandler = (e) => {
        if (e.target.files[0].size > 5000000) {
            setImage('');
            return;
        }
        if (e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png") {
            setImage(e.target.files[0]);
        } else {
            setImage('');
            return;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('files', image);
        setImage('');
        onSubmitUploadHandler(formData);
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

                {image ? 
                <p style={{marginTop: '5%', color: 'black', fontWeight: 'bold', transition: '500ms ease'}}>File name: {image.name} </p> 
                       : 
                <p style={{ color: '#f1410b', transition: '500ms ease'}} className={styles['supported-files']}>Supported files: JPG or PNG <br/>Max-size: 5MB</p> }
            </div>
        </section>
    );
};