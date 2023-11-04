import styles from '../../styles/views/UploadPage.module.css';
import { useState } from 'react';

export default function UploadPage() {
    const [image, setImage] = useState();

    const uploadFileHandler = (e) => {
        setImage(e.target.files[0])
    };

    async function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', image);
        let data = formData;

        const options = {
            method: 'POST',
            headers: {},
        };
        options.body = data;

        fetch('http://localhost:5000/data/upload', options)
    }

    return (
        <section id="uploadPage" className={styles.uploadPage}>
    <form className={styles.uploadForm} onSubmit={submitHandler} >
        <div>
            <label htmlFor="files">Photo:</label>
            <input className={styles['input-photo']} id="files" name="files" type="file" onChange={uploadFileHandler}/>
        </div>
        <button className={styles.btn} type="submit">Upload</button>
    </form>
</section>
    );
};