import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "react-bootstrap/Button";

const NewAuthor = (props) => {
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
                    props.addMethod(values);
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
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewAuthor;
