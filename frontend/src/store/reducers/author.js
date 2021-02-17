import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utils/updateObject";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const fetchAuthorStart = (state, action) => {
    return state;
};

const fetchAuthorSuccess = (state, action) => {
    return updateObject(state, {
        data: action.author,
        loading: false,
    });
};

const fetchAuthorFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const addAuthorStart = (state, action) => {
    return state;
};

const addAuthorSuccess = (state, action) => {
    return state;
};

const addAuthorFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const addBookToAuthorStart = (state, action) => {
    return state;
};

const addBookToAuthorSuccess = (state, action) => {
    return state.data.books.push(action.book);
};

const addBookToAuthorFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_AUTHOR_START:
            return fetchAuthorStart(state, action);
        case actionTypes.FETCH_AUTHOR_SUCCESS:
            return fetchAuthorSuccess(state, action);
        case actionTypes.FETCH_AUTHOR_FAIL:
            return fetchAuthorFail(state, action);
        case actionTypes.ADD_AUTHOR_START:
            return addAuthorStart(state, action);
        case actionTypes.ADD_AUTHOR_SUCCESS:
            return addAuthorSuccess(state, action);
        case actionTypes.ADD_AUTHOR_FAIL:
            return addAuthorFail(state, action);
        case actionTypes.ADD_BOOK_TO_AUTHOR_START:
            return addBookToAuthorStart(state, action);
        case actionTypes.ADD_BOOK_TO_AUTHOR_SUCCESS:
            return addBookToAuthorSuccess(state, action);
        case actionTypes.ADD_BOOK_TO_AUTHOR_FAIL:
            return addBookToAuthorFail(state, action);
        default:
            return state;
    }
};

export default reducer;
