import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { InfoCircle } from "react-bootstrap-icons";

import * as actions from "../../store/actions";

import style from "./Books.module.css";

const Books = () => {
    const dispatch = useDispatch();

    const onBooksFetch = useCallback(() => dispatch(actions.fetchBooks()), [
        dispatch,
    ]);

    const books = useSelector((state) => state.books.data);

    useEffect(() => {
        onBooksFetch();
    }, [onBooksFetch]);

    const { path } = useRouteMatch();
    return (
        <div className={style.Books}>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Pages</th>
                        <th>Published</th>
                        <th></th>
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
                                <td className={style.Actions}>
                                    <Link to={path + "/" + isbn}>
                                        <InfoCircle />
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default Books;
