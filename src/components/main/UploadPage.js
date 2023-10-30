import styles from '../../styles/UploadPage.module.css';

export default function UploadPage() {
    return (
        <section id="uploadPage" className={styles.uploadPage}>
    <form className={styles.uploadForm} encType='multipart/form-data'>
        <div>
            <label htmlFor="photo">Photo:</label>
            <input className={styles['input-photo']} id="files" name="photo" type="file" />
        </div>
        <button className={styles.btn} type="submit">Upload</button>
    </form>
</section>
    );
};