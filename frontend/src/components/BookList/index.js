import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {
    InfoCircle,
    Trash,
    PlusCircle,
    PencilSquare,
} from "react-bootstrap-icons";

import Modal from "../Modal";

import style from "./BookList.module.css";
import NewBook from "../NewBook";

const BookList = (props) => {
    const auth = useSelector((state) => state.auth);

    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {auth.token ? (
                <>
                    <Modal
                        show={showModal}
                        modalClosed={() => setShowModal(false)}
                    >
                        <NewBook
                            onSuccess={() => setShowModal(false)}
                            addMethod={props.addMethod}
                        />
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
                    {props.books.map((book) => {
                        const { isbn, title, pages, published } = book;
                        return (
                            <tr key={isbn}>
                                <td>{isbn}</td>
                                <td>{title}</td>
                                <td>{pages}</td>
                                <td>{published}</td>
                                <td className={style.Actions}>
                                    <Link to={`/books/${isbn}`}>
                                        <InfoCircle className={style.Action} />
                                    </Link>
                                    {auth.token ? (
                                        <>
                                            <Button
                                                variant="link"
                                                onClick={() =>
                                                    props.deleteMethod(isbn)
                                                }
                                            >
                                                <Trash
                                                    className={style.Action}
                                                />
                                            </Button>
                                            <Link to={`/books/edit/${isbn}`}>
                                                <PencilSquare
                                                    className={style.Action}
                                                />
                                            </Link>
                                        </>
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

export default BookList;
