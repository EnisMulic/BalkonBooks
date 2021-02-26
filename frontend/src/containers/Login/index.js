import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "react-bootstrap/Button";
import authSchema from "../../constants/validation/auth";

import * as actions from "../../store/actions";

import style from "./Login.module.css";

const Login = () => {
    const dispatch = useDispatch();

    const onLogin = useCallback(
        (email, password) => dispatch(actions.auth(email, password)),
        [dispatch]
    );

    const authData = useSelector((state) => state.auth);

    let errorMessage = null;
    if (authData.error) {
        errorMessage = <p>{authData.error.message}</p>;
    }

    let authRedirect = null;
    if (authData.token) {
        authRedirect = <Redirect to={authData.authRedirectPath} exact />;
    }

    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            onLogin(values.email, values.password);
            setSubmitting(false);
        }, 400);
    };

    return (
        <div className={style.Login}>
            {authRedirect}
            {errorMessage}
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={authSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                className="form-control"
                                type="text"
                                name="email"
                            />
                            <ErrorMessage name="email" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                className="form-control"
                                type="password"
                                name="password"
                            />
                            <ErrorMessage name="lastName" component="div" />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
