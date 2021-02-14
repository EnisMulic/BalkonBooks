import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utils/updateObject";

const initialState = {
    books: [],
    loading: false,
};

const fetchBooksStart = (state, action) => {
    return state;
};

const fetchBooksSuccess = (state, action) => {
    return updateObject(state, {
        books: action.books,
        loading: false,
    });
};

const fetchBooksFail = (state, action) => {
    return state;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOOKS_START:
            return fetchBooksStart(state, action);
        case actionTypes.FETCH_BOOKS_SUCCESS:
            return fetchBooksSuccess(state, action);
        case actionTypes.FETCH_BOOKS_FAIL:
            return fetchBooksFail(state, action);
        default:
            return state;
    }
};

export default reducer;
