import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utils/updateObject";

const initialState = {
    data: [],
    loading: false,
    error: null,
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
    return updateObject(state, {
        error: action.error,
    });
};

const deleteAuthorStart = (state, action) => {
    return state;
};

const deleteAuthorSuccess = (state, action) => {
    let newAuthors = state.data.filter((author) => author.id !== action.id);
    return updateObject(state, {
        data: newAuthors,
    });
};

const deleteAuthorFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_AUTHORS_START:
            return fetchAuthorsStart(state, action);
        case actionTypes.FETCH_AUTHORS_SUCCESS:
            return fetchAuthorsSuccess(state, action);
        case actionTypes.FETCH_AUTHORS_FAIL:
            return fetchAuthorsFail(state, action);
        case actionTypes.DELETE_AUTHOR_START:
            return deleteAuthorStart(state, action);
        case actionTypes.DELETE_AUTHOR_SUCCESS:
            return deleteAuthorSuccess(state, action);
        case actionTypes.DELETE_AUTHOR_FAIL:
            return deleteAuthorFail(state, action);
        default:
            return state;
    }
};

export default reducer;
