import React, { useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

import * as actions from "../../store/actions";

const NewBook = (props) => {
    const dispatch = useDispatch();

    const onBookAdd = useCallback((book) => dispatch(actions.addBook(book)), [
        dispatch,
    ]);

    const error = useSelector((state) => state.book.error);

    return (
        <div>
            <h3>Add new author</h3>
            <Formik
                initialValues={{ isbn: "", title: "", pages: 0, published: 0 }}
                validate={(values) => {
                    const errors = {};
                    if (!values.isbn) {
                        errors.isbn = "Required";
                    } else if (values.isbn.length !== 13) {
                        errors.isbn = "Length must be 13 characters";
                    }

                    if (!values.title) {
                        errors.title = "Required";
                    }

                    if (!values.pages) {
                        errors.pages = "Required";
                    }

                    if (!values.published) {
                        errors.published = "Required";
                    }

                    return errors;
                }}
                onSubmit={(values) => {
                    onBookAdd(values);
                    props.onSuccess();
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="isbn">ISBN</label>
                            <Field
                                className="form-control"
                                type="text"
                                name="isbn"
                            />
                            <ErrorMessage name="isbn" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <Field
                                className="form-control"
                                type="text"
                                name="title"
                            />
                            <ErrorMessage name="title" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pages">Number of pages</label>
                            <Field
                                className="form-control"
                                type="number"
                                min="0"
                                name="pages"
                            />
                            <ErrorMessage name="pages" component="div" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="published">Published</label>
                            <Field
                                className="form-control"
                                type="number"
                                min="0"
                                name="published"
                            />
                            <ErrorMessage name="published" component="div" />
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

export default NewBook;
