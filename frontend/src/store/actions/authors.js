import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const fetchAuthorsStart = () => {
    return {
        type: actionTypes.FETCH_AUTHORS_START,
    };
};

export const fetchAuthorsSuccess = (authors, pagination) => {
    return {
        type: actionTypes.FETCH_AUTHORS_SUCCESS,
        authors: authors,
        pagination: pagination,
    };
};

export const fetchAuthorsFail = (error) => {
    return {
        type: actionTypes.FETCH_AUTHORS_FAIL,
        error: error,
    };
};

export const fetchAuthors = (page, amount) => {
    return (dispatch) => {
        dispatch(fetchAuthorsStart());

        const params = new URLSearchParams({
            page: page,
            amount: amount,
        }).toString();

        axios
            .get("/authors?" + params)
            .then((res) => {
                const fetchedAuthors = [];
                for (let key in res.data.data) {
                    fetchedAuthors.push({
                        ...res.data.data[key],
                    });
                }
                dispatch(
                    fetchAuthorsSuccess(fetchedAuthors, res.data.pagination)
                );
            })
            .catch((err) => {
                dispatch(fetchAuthorsFail(err));
            });
    };
};

export const deleteAuthorStart = (id) => {
    return {
        type: actionTypes.DELETE_AUTHOR_START,
        id: id,
    };
};

export const deleteAuthorSuccess = (id) => {
    return {
        type: actionTypes.DELETE_AUTHOR_SUCCESS,
        id: id,
    };
};

export const deleteAuthorFail = () => {
    return {
        type: actionTypes.DELETE_AUTHOR_FAIL,
    };
};

export const deleteAuthor = (id) => {
    return (dispatch) => {
        dispatch(deleteAuthorStart());

        let config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        axios
            .delete(`/authors/${id}`, config)
            .then((res) => dispatch(deleteAuthorSuccess(id)))
            .catch((error) => deleteAuthorFail(error));
    };
};

export const editAuthorStart = () => {
    return {
        type: actionTypes.EDIT_AUTHOR_START,
    };
};

export const editAuthorSuccess = () => {
    return {
        type: actionTypes.EDIT_AUTHOR_SUCCESS,
    };
};

export const editAuthorFail = (error) => {
    return {
        type: actionTypes.EDIT_AUTHOR_FAIL,
        error: error,
    };
};

export const editAuthor = (id, author) => {
    return (dispatch) => {
        dispatch(editAuthorStart());

        let config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        axios
            .put(`/authors/${id}`, author, config)
            .then((res) => {
                dispatch(editAuthorSuccess());
            })
            .catch((err) => {
                dispatch(editAuthorFail(err));
            });
    };
};
