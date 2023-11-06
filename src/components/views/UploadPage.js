import styles from '../../styles/views/UploadPage.module.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
    const [image, setImage] = useState();
    const navigate = useNavigate();

    const uploadFileHandler = (e) => {
        if(e.target.files[0].type !== "image/jpeg") {
            //should reset input 
            alert('Only images are allowed');
            return;
        }
        if(e.target.files[0].size > 10000000) {
            //should reset input 
            alert('Images over 10MB are not allowed !');
            return;
        }

        //validation if is .img
        //validation if file is over 10mb
        setImage(e.target.files[0])
    };

    async function submitHandler(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('files', image);

        await fetch('http://localhost:5000/data/upload', {
            method: 'POST',
            body: formData
        });

        navigate('/gallery');
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