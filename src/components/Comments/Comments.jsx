import { useNavigate, useParams } from 'react-router-dom';
import styles from './Comments.module.css';
import { useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from '../Spinner/Spinner';
import { addTattooCommentById, deleteTattooCommentById, editTattooCommentById, getTattooPropsById } from '../../service/tattooService';
import useForm from '../../hooks/useForm';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import commentsReducer from '../../reducers/commentsReducer';
import notification from '../../service/notification';
import useValidate from '../../hooks/useValidate';
import { commentsValidator } from '../../service/validation';
import { commentsMessages } from '../../service/validationMessages';

export default function Comments() {
    const { id } = useParams();
    const { user, clearUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(commentsReducer, null);
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [editValues, setEditValues] = useState('');
    const [commentId, setCommentId] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [isEditSubmit, setIsEditSubmit] = useState(false);

    const body = document.body.style.overflow;

    //getting tattoo information
    useEffect(() => {
        getTattooPropsById(id)
            .then(res => {
                dispatch({ type: 'GET_TATTOO', tattoo: res })
            })
            .catch((e) => {
                if (e.status === 404) {
                    return navigate('*')
                }
                return notification.error(e.message, 3000);
            });
    }, [id]);


    //chech overflow for scrolling down
    useEffect(() => {
        if (body === 'hidden') {
            document.body.style.overflow = 'unset';
        } 
    }, [body]);

    //add comment
    const addCommentHandler = async (data) => {

        if(data.comment === '') {
            return notification.warning('Type your comment');
        };

        try {
            setIsSubmit(true);
            const comment = await addTattooCommentById(id, data, user);
            notification.success('Comment added', 3000);
            dispatch({ type: 'ADD_COMMENT', comment: comment });
            setValues(primaryValues);
        } catch (e) {
            if (e.status === 401) {
                clearUser();
                navigate('/login');
                return notification.error('Your login attempt failed. Please check your username and password, and try again', 3000);
            }
            notification.error(e.message, 3000);
        } finally {
            setIsSubmit(false);
        }
    };

    //delete comment
    const deleteCommentHandler = async (commentId) => {
        try {
            await deleteTattooCommentById(commentId, user);
            notification.success('Comment was deleted', 3000);
            dispatch({ type: 'DELETE_COMMENT', commentId: commentId })
        } catch (e) {
            if (e.status === 401) {
                clearUser();
                navigate('/login');
                return notification.error('Your login attempt failed. Please check your username and password, and try again', 3000);
            }
            notification.error(e.message, 3000);
        }
    };

    //when user submit edited comment
    const onSubmitEdit = async (e) => {
        e.preventDefault();
        const editCommentValidation = editValues.comment.trim() !== "" && editValues.comment.length <= 100 && editValues.comment.length >= 4;

        if (!editCommentValidation) {
            notification.warning("Comment must be between 4 and 100 characters long");
            return;
        };

        try {
            setIsEditSubmit(true);
            const editedCommentTattoo = await editTattooCommentById(commentId, editValues, user);
            notification.success('Comment was edited', 3000);
            dispatch({ type: 'EDIT_COMMENT', editedCommentTattoo: editedCommentTattoo, commentId: commentId })
            setEditValues({ comment: '' });
            setIsEditClicked(false);
        } catch (e) {
            if (e.status === 401) {
                clearUser();
                navigate('/login');
                return notification.error('Your login attempt failed. Please check your username and password, and try again', 3000);
            }
            notification.error(e.message, 3000);
        } finally {
            setIsEditSubmit(false);
        }
    };

    //when user is editing comment
    const onChangeEdit = (e) => {
        setEditValues(state => ({ ...state, [e.target.name]: e.target.value }));

    };

    //when user click on edit icon
    const onClickEdit = async (commentId) => {
        setCommentId(commentId);
        setEditValues({ comment: state.comments.filter(x => x._id === commentId)[0].comment });
        setIsEditClicked(true);
    };

    //validation edit comment 
     function useValidateEdit(primaryValues, values, validator) {
        const [validationErrorsEdit, setEditValidationErrors] = useState(primaryValues);
    
        function onBlurEdit(e) {
            const validation = validator[e.target.name];
    
            if (!validation(e.target.value, values)) {
                setEditValidationErrors(state => ({ ...state, [e.target.name]: true }));
            } else {
                setEditValidationErrors(state => ({ ...state, [e.target.name]: false }));
            }
    
            if (primaryValues.hasOwnProperty('repeatPassword')) {
                if (e.target.name === "password") {
                    if (e.target.value !== values.repeatPassword && values.repeatPassword !== "") {
                        setEditValidationErrors(state => ({ ...state, repeatPassword: true }))
                    } else {
                        setEditValidationErrors(state => ({ ...state, repeatPassword: false }))
                    }
                }
            } 
        }
        return {validationErrorsEdit, onBlurEdit}
    };

    const primaryValues = { comment: '' };

    const primaryValidationValues = {
        comment: false,
    };

    const { values, onChange, onSubmit, setValues } = useForm(primaryValues, addCommentHandler);

    const {
        onBlur, validationErrors
    } = useValidate(primaryValidationValues, values, commentsValidator);

    const { onBlurEdit, validationErrorsEdit } = useValidateEdit(primaryValidationValues, editValues, commentsValidator);

    const disabled = Object.values(validationErrors).some(x => x) ||
    Object.values(validationErrors).some(x => x === "") || isSubmit;

    const disabledEdit = Object.values(validationErrorsEdit).some(x => x) ||
    Object.values(validationErrorsEdit).some(x => x === "") || isSubmit;

    if (!state) {
        return <Spinner />;
    }
    

    return (
        <section className={styles['commentsPage']}>
            <img
                className={styles['tattoo-img']}
                src={state.imageUrl}
                alt="tattoo"
            />

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
                                            <FaEdit onClick={() => onClickEdit(x._id) } className={styles['owner-buttons-edit']} />
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
                        <label
                            htmlFor="comment">Write a comment:
                        </label>
                        <textarea className={`${styles['comment-text']} ${validationErrors.comment ? styles.warning : null}`}
                            name='comment' value={values.comment}
                            onChange={onChange}
                            onBlur={onBlur}
                            maxLength="100"
                            minLength="4">
                        </textarea>
                        {
                        validationErrors.comment ?
                            <p className={styles['validation-message']}>
                                {commentsMessages.comment}
                            </p>
                            : null
                    }
                        <button type='submit' disabled={disabled}>
                            {isSubmit ? 'Loading...' : 'Add'}
                        </button>
                    </form>
                </>
                :
                <form className={styles['commentForm']} onSubmit={onSubmitEdit}>
                    <textarea
                        className={`${styles['comment-text']} ${validationErrorsEdit.comment ? styles.warning : null}`}
                        name='comment'
                        value={editValues.comment}
                        onChange={onChangeEdit}
                        onBlur={onBlurEdit}
                        maxLength="100">
                    </textarea>
                    {
                        validationErrorsEdit.comment ?
                            <p className={styles['validation-message']}>
                                {commentsMessages.comment}
                            </p>
                            : null
                    }
                    <button type='submit' disabled={disabledEdit}>
                        {isEditSubmit ? 'Loading...' : 'Edit'}
                    </button>
                </form>}
        </section>
    );
};