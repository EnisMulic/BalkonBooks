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
        default:
            return state;
    }
};

export default reducer;
