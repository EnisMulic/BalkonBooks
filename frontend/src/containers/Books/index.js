import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

import * as actions from "../../store/actions";

import style from "./Books.module.css";

const Books = (props) => {
    const dispatch = useDispatch();

    const onBooksFetch = useCallback(() => dispatch(actions.fetchBooks()), [
        dispatch,
    ]);

    const books = useSelector((state) => state.book.books);

    useEffect(() => {
        onBooksFetch();
    }, [onBooksFetch]);

    return (
        <div className={style.Books}>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Pages</th>
                        <th>Published</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => {
                        const { isbn, title, pages, published } = book;
                        return (
                            <tr key={isbn}>
                                <td>{isbn}</td>
                                <td>{title}</td>
                                <td>{pages}</td>
                                <td>{published}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default Books;
