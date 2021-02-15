import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utils/updateObject";

const initialState = {
    data: null,
    loading: false,
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
    return state;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOOK_START:
            return fetchBookStart(state, action);
        case actionTypes.FETCH_BOOK_SUCCESS:
            return fetchBookSuccess(state, action);
        case actionTypes.FETCH_BOOK_FAIL:
            return fetchBookFail(state, action);
        default:
            return state;
    }
};

export default reducer;
