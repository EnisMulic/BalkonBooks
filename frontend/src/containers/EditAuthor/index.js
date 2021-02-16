import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useHistory, useParams } from "react-router-dom";

import * as actions from "../../store/actions";
import Button from "react-bootstrap/Button";

import style from "./EditAuthor.module.css";

const EditAuthor = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const onAuthorFetch = useCallback(
        (id) => dispatch(actions.fetchAuthor(id)),
        [dispatch]
    );

    const onAuthorEdit = useCallback(
        (id, author) => dispatch(actions.editAuthor(id, author)),
        [dispatch]
    );

    const authorData = useSelector((state) => state.author.data);

    useEffect(() => {
        onAuthorFetch(id);
    }, [onAuthorFetch, id]);

    let history = useHistory();

    let form = null;
    if (authorData) {
        form = (
            <Formik
                initialValues={{
                    firstName: authorData.firstName,
                    lastName: authorData.lastName,
                    dob: new Date(authorData.dob).toISOString().split("T")[0],
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.firstName) {
                        errors.firstName = "Required";
                    }

                    if (!values.lastName) {
                        errors.lastName = "Required";
                    }

                    return errors;
                }}
                onSubmit={(values) => {
                    onAuthorEdit(id, values);
                    history.push("/authors");
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field
                                className="form-control"
                                type="text"
                                name="firstName"
                            />
                            <ErrorMessage name="firstName" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field
                                className="form-control"
                                type="text"
                                name="lastName"
                            />
                            <ErrorMessage name="lastName" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of birth</label>
                            <Field
                                className="form-control"
                                type="date"
                                name="dob"
                            />
                            <ErrorMessage name="dob" component="div" />
                        </div>

                        <Button type="submit" disabled={isSubmitting}>
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        );
    }

    return (
        <div className={style.Form}>
            <h3>Edit author</h3>
            {form}
        </div>
    );
};

export default EditAuthor;
