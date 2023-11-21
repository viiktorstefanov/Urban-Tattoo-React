import { useParams } from 'react-router-dom';
import styles from './CommentsPage.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { get } from '../../service/request';

export default function CommentsPage() {
    const { id } = useParams();

 
     const { user } = useContext(AuthContext);
    
    const likes = 5;
    return (
        <section className={styles['commentsPage']}>
            <img className={styles['tattoo-img']} src={'http://localhost:5000/IMG1699741280066.jpg'} alt="tattoo" />
            <span>Likes: {likes}</span>
            <button onClick={() => getTattooLikes(id, user)}>aa</button>
            <div className={styles['wrap']}>Comments:
                <p className={styles['comment']}>
                    'user': Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto optio nemo eos? Aut odit rem eum nemo? Omnis, iusto dolore. Quis aspernatur iusto laborum similique molestiae a repudiandae reprehenderit maxime.
                </p>

                <p className={styles['comment']}>
                    'user': Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto optio nemo eos? Aut odit rem eum nemo? Omnis, iusto dolore. Quis aspernatur iusto laborum similique molestiae a repudiandae reprehenderit maxime.
                </p>
                <p className={styles['comment']}>
                    'user': Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto optio nemo eos? Aut odit rem eum nemo? Omnis, iusto dolore. Quis aspernatur iusto laborum similique molestiae a repudiandae reprehenderit maxime.
                </p>
                <p className={styles['comment']}>
                    'user': Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto optio nemo eos? Aut odit rem eum nemo? Omnis, iusto dolore. Quis aspernatur iusto laborum similique molestiae a repudiandae reprehenderit maxime.
                </p>
            </div>

            <form action="">
                <label htmlFor="comment">Write a comment:</label>
                <textarea className={styles['comment-text']} name='comment' maxLength="100"></textarea>
                <button type='submit'>Add</button>
            </form>

        </section>
    );
};

const getTattooLikes = async (id, user) => {
    try {   
        await get(`/data/${id}/likes`, null, user)

    } catch (e) {
        console.log(e);
    }
}

const getTattooComments = async (id, user) => {
    try {   
        await get(`/data/${id}/comments`, null, user)

    } catch (e) {
        console.log(e);
    }
}