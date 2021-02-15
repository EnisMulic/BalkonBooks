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
