import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utils/updateObject";

const initialState = {
    data: null,
    loading: false,
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
    return state;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_AUTHOR_START:
            return fetchAuthorStart(state, action);
        case actionTypes.FETCH_AUTHOR_SUCCESS:
            return fetchAuthorSuccess(state, action);
        case actionTypes.FETCH_AUTHOR_FAIL:
            return fetchAuthorFail(state, action);
        default:
            return state;
    }
};

export default reducer;
