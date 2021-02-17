import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utils/updateObject";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const fetchBookStart = (state, action) => {
    return state;
};

const fetchBookSuccess = (state, action) => {
    return updateObject(state, {
        data: action.book,
        loading: false,
    });
};

const fetchBookFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const addBookStart = (state, action) => {
    return state;
};

const addBookSuccess = (state, action) => {
    return state;
};

const addBookFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const addAuthorToBookStart = (state, action) => {
    return state;
};

const addAuthorToBookSuccess = (state, action) => {
    return state.data.authors.push(action.author);
};

const addAuthorToBookFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const removeAuthorFromBookStart = (state, action) => {
    return state;
};

const removeAuthorFromBookSuccess = (state, action) => {
    const authors = state.data.authors.filter(
        (author) => author.id !== action.authorId
    );
    state.data = updateObject(state.data, { authors: authors });
    return state;
};

const removeAuthorFromBookFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOOK_START:
            return fetchBookStart(state, action);
        case actionTypes.FETCH_BOOK_SUCCESS:
            return fetchBookSuccess(state, action);
        case actionTypes.FETCH_BOOK_FAIL:
            return fetchBookFail(state, action);
        case actionTypes.ADD_BOOK_START:
            return addBookStart(state, action);
        case actionTypes.ADD_BOOK_SUCCESS:
            return addBookSuccess(state, action);
        case actionTypes.ADD_BOOK_FAIL:
            return addBookFail(state, action);
        case actionTypes.ADD_AUTHOR_TO_BOOK_START:
            return addAuthorToBookStart(state, action);
        case actionTypes.ADD_AUTHOR_TO_BOOK_SUCCESS:
            return addAuthorToBookSuccess(state, action);
        case actionTypes.ADD_AUTHOR_TO_BOOK_FAIL:
            return addAuthorToBookFail(state, action);
        case actionTypes.REMOVE_AUTHOR_FROM_BOOK_START:
            return removeAuthorFromBookStart(state, action);
        case actionTypes.REMOVE_AUTHOR_FROM_BOOK_SUCCESS:
            return removeAuthorFromBookSuccess(state, action);
        case actionTypes.REMOVE_AUTHOR_FROM_BOOK_FAIL:
            return removeAuthorFromBookFail(state, action);
        default:
            return state;
    }
};

export default reducer;
