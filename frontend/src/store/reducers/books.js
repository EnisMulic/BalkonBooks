import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utils/updateObject";

const initialState = {
    data: [],
    loading: false,
};

const fetchBooksStart = (state, action) => {
    return state;
};

const fetchBooksSuccess = (state, action) => {
    return updateObject(state, {
        data: action.books,
        loading: false,
    });
};

const fetchBooksFail = (state, action) => {
    return state;
};

const deleteBookStart = (state, action) => {
    return state;
};

const deleteBookSuccess = (state, action) => {
    let newBooks = state.data.filter((book) => book.isbn !== action.id);
    return updateObject(state, {
        data: newBooks,
    });
};

const deleteBookFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOOKS_START:
            return fetchBooksStart(state, action);
        case actionTypes.FETCH_BOOKS_SUCCESS:
            return fetchBooksSuccess(state, action);
        case actionTypes.FETCH_BOOKS_FAIL:
            return fetchBooksFail(state, action);
        case actionTypes.DELETE_BOOK_START:
            return deleteBookStart(state, action);
        case actionTypes.DELETE_BOOK_SUCCESS:
            return deleteBookSuccess(state, action);
        case actionTypes.DELETE_BOOK_FAIL:
            return deleteBookFail(state, action);
        default:
            return state;
    }
};

export default reducer;
