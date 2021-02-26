import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { PlusCircle } from "react-bootstrap-icons";

import Modal from "../Modal";
import NewBook from "../NewBook";
import BookCard from "../BookCard";

import style from "./BookList.module.css";

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

            {props.books.map((book) => {
                return (
                    <BookCard
                        key={book.isbn}
                        {...book}
                        deleteMethod={props.deleteMethod}
                    />
                );
            })}
        </div>
    );
};

export default BookList;
