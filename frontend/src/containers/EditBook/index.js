import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useHistory, useParams } from "react-router-dom";

import * as actions from "../../store/actions";
import Button from "react-bootstrap/Button";

import style from "./EditBook.module.css";

const EditBook = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const onBookFetch = useCallback((id) => dispatch(actions.fetchBook(id)), [
        dispatch,
    ]);

    const onBookEdit = useCallback(
        (id, book) => dispatch(actions.editBook(id, book)),
        [dispatch]
    );

    const bookData = useSelector((state) => state.book.data);

    useEffect(() => {
        onBookFetch(id);
    }, [onBookFetch, id]);

    let history = useHistory();

    let form = null;
    if (bookData) {
        form = (
            <Formik
                initialValues={{
                    isbn: bookData.isbn,
                    title: bookData.title,
                    pages: bookData.pages,
                    published: bookData.published,
                }}
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
                    onBookEdit(id, values);
                    history.push("/books");
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
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        );
    }

    return (
        <div className={style.Form}>
            <h3>Edit book</h3>
            {form}
        </div>
    );
};

export default EditBook;
