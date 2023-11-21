import { useParams } from 'react-router-dom';
import styles from './CommentsPage.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { del, get } from '../../service/request';

export default function CommentsPage() {
    const { id } = useParams();
     const { user } = useContext(AuthContext);
     const [ tattoo, setTattoo ] = useState('');
    
     useEffect(() => {
        try {
            get(`/data/${id}/comments`)
                .then(res => setTattoo(res));

        } catch (error) {
            console.log(error);
        }
    }, []);

   
    return (
        <section className={styles['commentsPage']}>
            <img className={styles['tattoo-img']} src={tattoo.imageUrl} alt="tattoo" />

            <span>Likes: {tattoo.likes}</span>
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

