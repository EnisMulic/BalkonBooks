import React, { useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

import * as actions from "../../store/actions";

const NewAuthor = (props) => {
    const dispatch = useDispatch();

    const onAuthorAdd = useCallback(
        (author) => dispatch(actions.addAuthor(author)),
        [dispatch]
    );

    return (
        <div>
            <h3>Add new author</h3>
            <Formik
                initialValues={{ firstName: "", lastName: "", dob: "" }}
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
                    onAuthorAdd(values);
                    props.onSuccess();
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
                            <ErrorMessage name="text" component="div" />
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
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewAuthor;
