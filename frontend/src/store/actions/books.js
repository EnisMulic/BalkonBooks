import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const fetchBooksStart = () => {
    return {
        type: actionTypes.FETCH_BOOKS_START,
    };
};

export const fetchBooksSuccess = (books, pagination, search) => {
    return {
        type: actionTypes.FETCH_BOOKS_SUCCESS,
        books: books,
        pagination: pagination,
        search: search,
    };
};

export const fetchBooksFail = (error) => {
    return {
        type: actionTypes.FETCH_BOOKS_FAIL,
        error: error,
    };
};

export const fetchBooks = (search, page, amount) => {
    return (dispatch) => {
        dispatch(fetchBooksStart());

        let searchParams = new URLSearchParams({
            page: page,
            amount: amount,
        });

        if (search) {
            searchParams.append("title", search);
        }

        axios
            .get("/books?" + searchParams.toString())
            .then((res) => {
                const fetchedBooks = [];
                for (let key in res.data.data) {
                    fetchedBooks.push({
                        ...res.data.data[key],
                        id: key,
                    });
                }

                dispatch(
                    fetchBooksSuccess(fetchedBooks, res.data.pagination, search)
                );
            })
            .catch((err) => {
                dispatch(fetchBooksFail(err));
            });
    };
};

export const deleteBookStart = (id) => {
    return {
        type: actionTypes.DELETE_BOOK_START,
        id: id,
    };
};

export const deleteBookSuccess = (id) => {
    return {
        type: actionTypes.DELETE_BOOK_SUCCESS,
        id: id,
    };
};

export const deleteBookFail = () => {
    return {
        type: actionTypes.DELETE_BOOK_FAIL,
    };
};

export const deleteBook = (id) => {
    return (dispatch) => {
        dispatch(deleteBookStart());

        let config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        axios
            .delete(`/books/${id}`, config)
            .then((res) => dispatch(deleteBookSuccess(id)))
            .catch((error) => deleteBookFail(error));
    };
};

export const editBookStart = () => {
    return {
        type: actionTypes.EDIT_BOOK_START,
    };
};

export const editBookSuccess = () => {
    return {
        type: actionTypes.EDIT_BOOK_SUCCESS,
    };
};

export const editBookFail = (error) => {
    return {
        type: actionTypes.EDIT_BOOK_FAIL,
        error: error,
    };
};

export const editBook = (id, book) => {
    return (dispatch) => {
        dispatch(editBookStart());

        let config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };

        axios
            .put(`/books/${id}`, book, config)
            .then((res) => {
                dispatch(editBookSuccess());
            })
            .catch((err) => {
                dispatch(editBookFail(err));
            });
    };
};
