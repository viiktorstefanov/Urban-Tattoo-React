import styles from './UploadPage.module.css';



export default function UploadPage({
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
            <form className={styles.uploadForm} onSubmit={onSubmit} >
                <div>
                    <label htmlFor="files">Photo:</label>
                    <input className={styles['input-photo']} id="files" name="files" type="file" onChange={fileHandler} />
                </div>
                <input className={styles['btn-submit']} type="submit" value="Upload"/>
            </form>
        </section>
    );
};