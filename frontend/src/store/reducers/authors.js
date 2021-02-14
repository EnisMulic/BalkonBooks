import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utils/updateObject";

const initialState = {
    data: [],
    loading: false,
};

const fetchAuthorsStart = (state, action) => {
    return state;
};

const fetchAuthorsSuccess = (state, action) => {
    return updateObject(state, {
        data: action.authors,
        loading: false,
    });
};

const fetchAuthorsFail = (state, action) => {
    return state;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_AUTHORS_START:
            return fetchAuthorsStart(state, action);
        case actionTypes.FETCH_AUTHORS_SUCCESS:
            return fetchAuthorsSuccess(state, action);
        case actionTypes.FETCH_AUTHORS_FAIL:
            return fetchAuthorsFail(state, action);
        default:
            return state;
    }
};

export default reducer;
