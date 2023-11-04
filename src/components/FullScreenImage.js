import styles from '../styles/components/FullIScreenImage.module.css';

export default function FullScreenImage() {

    function closeFullImage(e) {

    }

    // async function deleteImageHandler(e) {

    // }

    return (
        <div className={styles['full-img']} id="fullImgBox">
            <img src="" alt="no-img" id="fullImg"/>
            <span onClick={closeFullImage}>X</span>
        
         {/* if have user and user role is admin */}
        {/* <span onClick={deleteImageHandler} class="delete">Delete</span> */}
        </div>
    );
};