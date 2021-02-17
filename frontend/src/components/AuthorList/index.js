import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
    InfoCircle,
    Trash,
    PlusCircle,
    PencilSquare,
} from "react-bootstrap-icons";

import Modal from "../Modal";
import NewAuthor from "../NewAuthor";

import style from "./AuthorList.module.css";

const AuthorList = (props) => {
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };

    const auth = useSelector((state) => state.auth);

    const [showModal, setShowModal] = useState(false);

    return (
        <div className={style.Authors}>
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

            <Table striped bordered>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Date of birth</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.authors.map((author) => {
                        const { id, firstName, lastName, dob } = author;
                        let dateOfBirth = new Date(dob);

                        return (
                            <tr key={id}>
                                <td>{firstName}</td>
                                <td>{lastName}</td>
                                <td>
                                    {dateOfBirth.toLocaleString(
                                        "en-Us",
                                        dateOptions
                                    )}
                                </td>
                                <td className={style.Actions}>
                                    <Link to={`/authors/${id}`}>
                                        <InfoCircle className={style.Action} />
                                    </Link>
                                    {auth.token ? (
                                        <>
                                            <Button
                                                variant="link"
                                                onClick={() =>
                                                    props.deleteMethod(id)
                                                }
                                            >
                                                <Trash
                                                    className={style.Action}
                                                />
                                            </Button>
                                            <Link to={`/authors/edit/${id}`}>
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

export default AuthorList;
