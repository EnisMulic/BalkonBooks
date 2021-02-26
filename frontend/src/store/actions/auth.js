import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    };
};

export const auth = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
        };
        axios
            .post("/auth/login", authData)
            .then((response) => {
                var decoded = jwt_decode(response.data.token);

                const expirationDate = new Date(
                    new Date().getTime() + (decoded.exp - decoded.iat) * 1000
                );

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("expirationDate", expirationDate);

                dispatch(authSuccess(response.data.token));
                dispatch(setAuthRedirectPath("/"));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            })
            .catch((err) => {
                dispatch(authFail(err));
            });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};
