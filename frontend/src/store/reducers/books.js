import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utils/updateObject";

const initialState = {
    data: [],
    pagination: {},
    loading: false,
    error: null,
};

const fetchBooksStart = (state, action) => {
    return state;
};

const fetchBooksSuccess = (state, action) => {
    const books = [...state.data, ...action.books];
    return updateObject(state, {
        data: books,
        pagination: action.pagination,
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

const editBookStart = (state, action) => {
    return state;
};

const editBookSuccess = (state, action) => {
    const newBooks = { ...state.data };
    var foundIndex = newBooks.findIndex((book) => book.isbn === action.id);
    newBooks[foundIndex] = action.book;

    return updateObject(state, {
        data: newBooks,
    });
};

const editBookFail = (state, action) => {
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
        case actionTypes.EDIT_BOOK_START:
            return editBookStart(state, action);
        case actionTypes.EDIT_BOOK_SUCCESS:
            return editBookSuccess(state, action);
        case actionTypes.EDIT_BOOK_FAIL:
            return editBookFail(state, action);
        default:
            return state;
    }
};

export default reducer;
