import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions";

import style from "./Login.module.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const onLogin = useCallback(
        (email, password) => dispatch(actions.auth(email, password)),
        [dispatch]
    );

    const authData = useSelector((state) => state.auth);
    const login = (event) => {
        event.preventDefault();

        onLogin(email, password);
    };

    let errorMessage = null;
    if (authData.error) {
        errorMessage = <p>{authData.error.message}</p>;
    }

    let authRedirect = null;
    if (authData.token) {
        authRedirect = <Redirect to={authData.authRedirectPath} />;
    }

    return (
        <div className={style.Login}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={(event) => login(event)}>
                <div className="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary bg-gradient-primary text-white"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
