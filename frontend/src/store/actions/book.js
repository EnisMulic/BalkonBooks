import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const fetchBookStart = () => {
    return {
        type: actionTypes.FETCH_BOOK_START,
    };
};

export const fetchBookSuccess = (book) => {
    return {
        type: actionTypes.FETCH_BOOK_SUCCESS,
        book: book,
    };
};

export const fetchBookFail = (error) => {
    return {
        type: actionTypes.FETCH_BOOK_FAIL,
        error: error,
    };
};

export const fetchBook = (id) => {
    return (dispatch) => {
        dispatch(fetchBookStart());
        axios
            .get(`/books/${id}`)
            .then((res) => {
                const book = { ...res.data };
                dispatch(fetchBookSuccess(book));
            })
            .catch((err) => {
                dispatch(fetchBookFail(err));
            });
    };
};

export const addBookStart = () => {
    return {
        type: actionTypes.ADD_BOOK_START,
    };
};

export const addBookSuccess = () => {
    return {
        type: actionTypes.ADD_BOOK_SUCCESS,
    };
};

export const addBookFail = (error) => {
    return {
        type: actionTypes.ADD_BOOK_FAIL,
        error: error,
    };
};

export const addBook = (book) => {
    return (dispatch) => {
        dispatch(addBookStart());

        let config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        axios
            .post(`/books`, book, config)
            .then((res) => {
                dispatch(addBookSuccess());
            })
            .catch((err) => {
                dispatch(addBookFail(err));
            });
    };
};

export const addAuthorToBookStart = () => {
    return {
        type: actionTypes.ADD_AUTHOR_TO_BOOK_START,
    };
};

export const addAuthorToBookSuccess = (author) => {
    return {
        type: actionTypes.ADD_AUTHOR_TO_BOOK_SUCCESS,
        author: author,
    };
};

export const addAuthorToBookFail = (error) => {
    return {
        type: actionTypes.ADD_AUTHOR_TO_BOOK_FAIL,
        error: error,
    };
};

export const addAuthorToBook = (bookId, author) => {
    return (dispatch) => {
        dispatch(addAuthorToBookStart());

        let config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        axios
            .post(`/books/${bookId}/authors`, author, config)
            .then((res) => {
                dispatch(addAuthorToBookSuccess(res.data));
            })
            .catch((err) => {
                dispatch(addAuthorToBookFail(err));
            });
    };
};

export const removeAuthorFromBookStart = () => {
    return {
        type: actionTypes.REMOVE_AUTHOR_FROM_BOOK_START,
    };
};

export const removeAuthorFromBookSuccess = (bookId, authorId) => {
    return {
        type: actionTypes.REMOVE_AUTHOR_FROM_BOOK_SUCCESS,
        bookId: bookId,
        authorId: authorId,
    };
};

export const removeAuthorFromBookFail = (error) => {
    return {
        type: actionTypes.REMOVE_AUTHOR_FROM_BOOK_FAIL,
        error: error,
    };
};

export const removeAuthorFromBook = (bookId, authorId) => {
    return (dispatch) => {
        dispatch(removeAuthorFromBookStart());

        let config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        axios
            .delete(`/books/${bookId}/authors/${authorId}`, config)
            .then((res) => {
                dispatch(removeAuthorFromBookSuccess(bookId, authorId));
            })
            .catch((err) => {
                dispatch(removeAuthorFromBookFail(err));
            });
    };
};
