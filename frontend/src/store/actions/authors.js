import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const fetchAuthorsStart = () => {
    return {
        type: actionTypes.FETCH_AUTHORS_START,
    };
};

export const fetchAuthorsSuccess = (authors) => {
    return {
        type: actionTypes.FETCH_AUTHORS_SUCCESS,
        authors: authors,
    };
};

export const fetchAuthorsFail = (error) => {
    return {
        type: actionTypes.FETCH_AUTHORS_FAIL,
        error: error,
    };
};

export const fetchAuthors = () => {
    return (dispatch) => {
        dispatch(fetchAuthorsStart());
        axios
            .get("/authors")
            .then((res) => {
                const fetchedAuthors = [];
                for (let key in res.data) {
                    fetchedAuthors.push({
                        ...res.data[key],
                    });
                }
                dispatch(fetchAuthorsSuccess(fetchedAuthors));
            })
            .catch((err) => {
                dispatch(fetchAuthorsFail(err));
            });
    };
};
