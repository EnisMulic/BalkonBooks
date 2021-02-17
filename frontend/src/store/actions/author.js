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

export const addBookToAuthorStart = () => {
    return {
        type: actionTypes.ADD_BOOK_TO_AUTHOR_START,
    };
};

export const addBookToAuthorSuccess = (book) => {
    return {
        type: actionTypes.ADD_BOOK_TO_AUTHOR_SUCCESS,
        book: book,
    };
};

export const addBookToAuthorFail = (error) => {
    return {
        type: actionTypes.ADD_BOOK_TO_AUTHOR_FAIL,
        error: error,
    };
};

export const addBookToAuthor = (authorId, book) => {
    return (dispatch) => {
        dispatch(addBookToAuthorStart());

        let config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        axios
            .post(`/authors/${authorId}/books`, book, config)
            .then((res) => {
                dispatch(addBookToAuthorSuccess(res.data));
            })
            .catch((err) => {
                dispatch(addBookToAuthorFail(err));
            });
    };
};

export const removeBookFromAuthorStart = () => {
    return {
        type: actionTypes.REMOVE_BOOK_FROM_AUTHOR_START,
    };
};

export const removeBookFromAuthorSuccess = (authorId, bookId) => {
    return {
        type: actionTypes.REMOVE_BOOK_FROM_AUTHOR_SUCCESS,
        bookId: bookId,
        authorId: authorId,
    };
};

export const removeBookFromAuthorFail = (error) => {
    return {
        type: actionTypes.REMOVE_BOOK_FROM_AUTHOR_FAIL,
        error: error,
    };
};

export const removeBookFromAuthor = (authorId, bookId) => {
    return (dispatch) => {
        dispatch(removeBookFromAuthorStart());

        let config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        axios
            .delete(`/authors/${authorId}/books/${bookId}`, config)
            .then((res) => {
                dispatch(removeBookFromAuthorSuccess(authorId, bookId));
            })
            .catch((err) => {
                dispatch(removeBookFromAuthorFail(err));
            });
    };
};
