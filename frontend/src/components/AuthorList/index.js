import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { PlusCircle } from "react-bootstrap-icons";

import Modal from "../Modal";
import NewAuthor from "../NewAuthor";

import style from "./AuthorList.module.css";
import AuthorCard from "../AuthorCard";

const AuthorList = (props) => {
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
                        <NewAuthor
                            onSuccess={() => setShowModal(false)}
                            addMethod={props.addMethod}
                        />
                    </Modal>
                    <Button variant="link" onClick={() => setShowModal(true)}>
                        <PlusCircle className={style.Action} />
                    </Button>
                </>
            ) : null}

            {props.authors.map((author) => (
                <AuthorCard
                    key={author.id}
                    {...author}
                    deleteMethod={props.deleteMethod}
                />
            ))}
        </div>
    );
};

export default AuthorList;
