import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { InfoCircle, Trash, PlusCircle } from "react-bootstrap-icons";

import * as actions from "../../store/actions";

import style from "./Books.module.css";
import Modal from "../../components/Modal";
import NewBook from "../../components/NewBook";

const Books = () => {
    const dispatch = useDispatch();

    const onBooksFetch = useCallback(() => dispatch(actions.fetchBooks()), [
        dispatch,
    ]);

    const onBookDelete = useCallback((id) => dispatch(actions.deleteBook(id)), [
        dispatch,
    ]);

    const books = useSelector((state) => state.books.data);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        onBooksFetch();
    }, [onBooksFetch]);

    const [showModal, setShowModal] = useState(false);

    const { path } = useRouteMatch();
    return (
        <div className={style.Books}>
            {auth.token ? (
                <>
                    <Modal
                        show={showModal}
                        modalClosed={() => setShowModal(false)}
                    >
                        <NewBook onSuccess={() => setShowModal(false)} />
                    </Modal>
                    <Button variant="link" onClick={() => setShowModal(true)}>
                        <PlusCircle className={style.Action} />
                    </Button>
                </>
            ) : null}
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
                                        <InfoCircle className={style.Action} />
                                    </Link>
                                    {auth.token ? (
                                        <Button
                                            variant="link"
                                            onClick={() => onBookDelete(isbn)}
                                        >
                                            <Trash className={style.Action} />
                                        </Button>
                                    ) : null}
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
