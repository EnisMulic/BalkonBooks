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
    const books = [...state.data.books, action.book];
    state.data = updateObject(state.data, { books: books });
    return state;
};

const addBookToAuthorFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const removeBookFromAuthorStart = (state, action) => {
    return state;
};

const removeBookFromAuthorSuccess = (state, action) => {
    const books = state.data.books.filter(
        (book) => book.isbn !== action.bookId
    );
    state.data = updateObject(state.data, { books: books });
    return state;
};

const removeBookFromAuthorFail = (state, action) => {
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
        case actionTypes.REMOVE_BOOK_FROM_AUTHOR_START:
            return removeBookFromAuthorStart(state, action);
        case actionTypes.REMOVE_BOOK_FROM_AUTHOR_SUCCESS:
            return removeBookFromAuthorSuccess(state, action);
        case actionTypes.REMOVE_BOOK_FROM_AUTHOR_FAIL:
            return removeBookFromAuthorFail(state, action);
        default:
            return state;
    }
};

export default reducer;
