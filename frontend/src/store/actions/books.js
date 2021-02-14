import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const fetchBooksStart = () => {
    return {
        type: actionTypes.FETCH_BOOKS_START,
    };
};

export const fetchBooksSuccess = (books) => {
    return {
        type: actionTypes.FETCH_BOOKS_SUCCESS,
        books: books,
    };
};

export const fetchBooksFail = (error) => {
    return {
        type: actionTypes.FETCH_BOOKS_FAIL,
        error: error,
    };
};

export const fetchBooks = () => {
    return (dispatch) => {
        dispatch(fetchBooksStart());
        axios
            .get("/books")
            .then((res) => {
                const fetchedBooks = [];
                for (let key in res.data) {
                    fetchedBooks.push({
                        ...res.data[key],
                        id: key,
                    });
                }
                dispatch(fetchBooksSuccess(fetchedBooks));
            })
            .catch((err) => {
                dispatch(fetchBooksFail(err));
            });
    };
};
