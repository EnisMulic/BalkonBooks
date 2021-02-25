import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utils/updateObject";

const initialState = {
    data: [],
    pagination: {},
    loading: false,
    error: null,
};

const fetchAuthorsStart = (state, action) => {
    return state;
};

const fetchAuthorsSuccess = (state, action) => {
    let authors = [];

    if (state.search !== action.search) {
        authors = [...action.authors];
    } else {
        authors = [...state.data, ...action.authors];
    }

    return updateObject(state, {
        data: authors,
        pagination: action.pagination,
        loading: false,
        search: action.search,
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

const editAuthorStart = (state, action) => {
    return state;
};

const editAuthorSuccess = (state, action) => {
    const newAuthors = { ...state.data };
    var foundIndex = newAuthors.findIndex((author) => author.id === action.id);
    newAuthors[foundIndex] = action.author;

    return updateObject(state, {
        data: newAuthors,
    });
};

const editAuthorFail = (state, action) => {
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
        case actionTypes.EDIT_AUTHOR_START:
            return editAuthorStart(state, action);
        case actionTypes.EDIT_AUTHOR_SUCCESS:
            return editAuthorSuccess(state, action);
        case actionTypes.EDIT_AUTHOR_FAIL:
            return editAuthorFail(state, action);
        default:
            return state;
    }
};

export default reducer;
