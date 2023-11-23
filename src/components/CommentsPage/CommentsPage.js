import { useParams } from 'react-router-dom';
import styles from './CommentsPage.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from '../Spinner/Spinner';
import { addTattooCommentById, deleteTattooCommentById, getTattooPropsById } from '../../service/tattooService';
import useForm from '../../hooks/useForm';
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export default function CommentsPage() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [currTattoo, setCurrTattoo] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [editValues, setEditValues] = useState('');

    const addCommentHandler = async (data) => {
        try {
            const result = await addTattooCommentById(id, data, user);
            setCurrTattoo(result);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteCommentHandler = async (commentId) => {
        try {
            const result = await deleteTattooCommentById(commentId, user);
            setCurrTattoo(result);
        } catch (e) {
            console.log(e);
        }
    };

    const onChangeEdit = (e) => {
        setEditValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmitEdit = (e) => {
        e.preventDefault();

        setEditValues({ comment: '' });
        setIsEdit(false);
    };

    const onEditClick = async (commentId) => {
        setEditValues({comment: currTattoo.comments.filter(x => x._id === commentId)[0].comment});
        setIsEdit(true);
    };

    const primaryValues = { comment: '' };

    const { values, onChange, onSubmit } = useForm(primaryValues, addCommentHandler);

    useEffect(() => {
        getTattooPropsById(id).then(res => setCurrTattoo(res));
    }, [id]);

    if (!currTattoo) {
        return <Spinner />;
    }

    return (
        <section className={styles['commentsPage']}>
            <img className={styles['tattoo-img']} src={currTattoo.imageUrl} alt="tattoo" />

            <span>Likes: {currTattoo.likes.length}</span>
            {!isEdit ?
                <>
                    <div className={styles['wrap']}>
                        <span className={styles['comments-header']}>Comments:</span>
                        {currTattoo.comments.length > 0 ?
                            <>
                                {currTattoo.comments && currTattoo.comments.map((x) =>
                                (<p className={styles['comment']} key={x._id}>
                                    <span className={styles['owner-fullName']}>{x.ownerfullName}</span>
                                    <span className={styles['user-comment']} >{x.comment}</span>
                                    {x.ownerId === user._id ?
                                        <span className={styles['owner-buttons']}>
                                            <FaEdit onClick={() => onEditClick(x._id)} className={styles['owner-buttons-edit']} />
                                            <FaTrashAlt onClick={() => deleteCommentHandler(x._id)} className={styles['owner-buttons-delete']} />
                                        </span>
                                    : null
                                    }
                                </p>
                                ))}
                            </>
                        : null
                        }
                    </div>
                    <form onSubmit={onSubmit}>
                        <label htmlFor="comment">Write a comment:</label>
                        <textarea className={styles['comment-text']} name='comment' value={values.comment} onChange={onChange} maxLength="100"></textarea>
                        <button type='submit'>Add</button>
                    </form>
                </>
                :
                <form onSubmit={onSubmitEdit}>
                    <textarea className={styles['comment-text']} name='comment' value={editValues.comment} onChange={onChangeEdit} maxLength="100"></textarea>
                    <button type='submit'>Edit</button>
                </form>}

        </section>
    );
};