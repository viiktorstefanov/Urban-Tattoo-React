import { useParams } from 'react-router-dom';
import styles from './CommentsPage.module.css';
import { useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from '../Spinner/Spinner';
import { addTattooCommentById, deleteTattooCommentById, editTattooCommentById, getTattooPropsById } from '../../service/tattooService';
import useForm from '../../hooks/useForm';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import commentsReducer from '../../reducers/commentsReducer';
import notification from '../../service/notification';


export default function CommentsPage() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [state, dispatch] = useReducer(commentsReducer, null);
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [editValues, setEditValues] = useState('');
    const [commentId, setCommentId ] = useState('');

    //getting tattoo information
    useEffect(() => {
        getTattooPropsById(id).then(res => {
            dispatch({ type: 'GET_TATTOO', tattoo: res})
        });
    }, [id]);

    //add comment
    const addCommentHandler = async (data) => {
        try {
            notification.loading('Please wait');
            const comment = await addTattooCommentById(id, data, user);
            dispatch({ type: 'ADD_COMMENT', comment: comment});
        } catch (e) {
            console.log(e);
        } finally {
            setValues(primaryValues);
            notification.update('Comment added');
        }
    };

    //delete comment
    const deleteCommentHandler = async (commentId) => {
        try {
            notification.loading('Please wait');
            await deleteTattooCommentById(commentId, user);
            dispatch({ type: 'DELETE_COMMENT', commentId: commentId})
        } catch (e) {
            console.log(e);
        } finally {
            notification.update('Comment was deleted');
        }
    };

      //when user submit edited comment
      const onSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            notification.loading('Please wait');
            const editedCommentTattoo = await editTattooCommentById(commentId, editValues, user);
            
            dispatch({ type: 'EDIT_COMMENT', editedCommentTattoo: editedCommentTattoo , commentId: commentId })
            setEditValues({ comment: '' });
            setIsEditClicked(false);
        } catch(e) {

        } finally {
            notification.update('Comment was edited');
        }
       
    };

    //when user edit comment
    const onChangeEdit = (e) => {
        setEditValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    //when user click on edit icon
    const onClickEdit = async (commentId) => {
        setCommentId(commentId);
        setEditValues({comment: state.comments.filter(x => x._id === commentId)[0].comment});
        setIsEditClicked(true);
    };

    const primaryValues = { comment: '' };

    const { values, onChange, onSubmit, setValues } = useForm(primaryValues, addCommentHandler);

    if (!state) {
        return <Spinner />;
    }

    return (
        <section className={styles['commentsPage']}>
            <img className={styles['tattoo-img']} src={state.imageUrl} alt="tattoo" />

            <span>Likes: {state.likes.length}</span>
            {!isEditClicked ?
                <>
                    <div className={styles['wrap']}>
                        <span className={styles['comments-header']}>Comments:</span>
                        {state.comments.length > 0 ?
                            <>
                                {state.comments && state.comments.map((x) =>
                                (<p className={styles['comment']} key={x._id}>
                                    <span className={styles['owner-fullName']}>{x.ownerfullName}</span>
                                    <span className={styles['user-comment']} >{x.comment}</span>
                                    {x.ownerId === user._id || user._role === 'admin' ?
                                        <span className={styles['owner-buttons']}>
                                            <FaEdit onClick={() => onClickEdit(x._id)} className={styles['owner-buttons-edit']} />
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
                    <form className={styles['commentForm']} onSubmit={onSubmit}>
                        <label htmlFor="comment">Write a comment:</label>
                        <textarea className={styles['comment-text']} name='comment' value={values.comment} onChange={onChange} maxLength="100"></textarea>
                        <button type='submit'>Add</button>
                    </form>
                </>
                :
                <form className={styles['commentForm']} onSubmit={onSubmitEdit}>
                    <textarea className={styles['comment-text']} name='comment' value={editValues.comment} onChange={onChangeEdit} maxLength="100"></textarea>
                    <button type='submit'>Edit</button>
                </form>}

        </section>
    );
};


    // //add comment 
    // const addCommentHandler = async (data, tattooId) => {
    //     try {
    //         notification.loading('Please wait');
    //         const result = await addTattooCommentById(tattooId, data, user);
    //         setTattoos(state => state.map(x => x._id === tattooId ?  result : x));
    //     } catch (e) {
    //         console.log(e);
    //     } finally {
    //         notification.update('Comment added!');
    //     }
    // };