import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const fetchAuthorStart = () => {
    return {
        type: actionTypes.FETCH_AUTHOR_START,
    };
};

export const fetchAuthorSuccess = (author) => {
    return {
        type: actionTypes.FETCH_AUTHOR_SUCCESS,
        author: author,
    };
};

export const fetchAuthorFail = (error) => {
    return {
        type: actionTypes.FETCH_AUTHOR_FAIL,
        error: error,
    };
};

export const fetchAuthor = (id) => {
    return (dispatch) => {
        dispatch(fetchAuthorStart());
        axios
            .get(`/authors/${id}`)
            .then((res) => {
                const author = { ...res.data };
                dispatch(fetchAuthorSuccess(author));
            })
            .catch((err) => {
                dispatch(fetchAuthorFail(err));
            });
    };
};

export const addAuthorStart = () => {
    return {
        type: actionTypes.ADD_AUTHOR_START,
    };
};

export const addAuthorSuccess = (id, author) => {
    return {
        type: actionTypes.ADD_AUTHOR_SUCCESS,
        author: author,
        id: id,
    };
};

export const addAuthorFail = (error) => {
    return {
        type: actionTypes.ADD_AUTHOR_FAIL,
        error: error,
    };
};

export const addAuthor = (author) => {
    return (dispatch) => {
        dispatch(addAuthorStart());

        let config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        axios
            .post(`/authors`, author, config)
            .then((res) => {
                dispatch(addAuthorSuccess());
            })
            .catch((err) => {
                dispatch(addAuthorFail(err));
            });
    };
};
