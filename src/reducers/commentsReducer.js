export default function commentsReducer(state, action) {
    switch (action.type) {
        case 'GET_TATTOO':
            return action.tattoo;

        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [...state.comments, action.comment],
            };
        case 'EDIT_COMMENT':
            return {
                ...state,
                comments: state.comments.map(comment => comment._id === action.commentId ? action.editedCommentTattoo : comment)
            };
        case 'DELETE_COMMENT':
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.commentId)
              };       
        default:
            return state;
    }
};