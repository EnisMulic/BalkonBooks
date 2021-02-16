import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { InfoCircle, Trash, PlusCircle } from "react-bootstrap-icons";

import * as actions from "../../store/actions";

import style from "./Authors.module.css";
import Modal from "../../components/Modal";
import NewAuthor from "../../components/NewAuthor";

const Authors = () => {
    const dispatch = useDispatch();

    const onAuthorsFetch = useCallback(() => dispatch(actions.fetchAuthors()), [
        dispatch,
    ]);

    const onAuthorDelete = useCallback(
        (id) => dispatch(actions.deleteAuthor(id)),
        [dispatch]
    );

    const authors = useSelector((state) => state.authors.data);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        onAuthorsFetch();
    }, [onAuthorsFetch]);

    const dateOptions = { year: "numeric", month: "long", day: "numeric" };

    const [showModal, setShowModal] = useState(false);

    const { path } = useRouteMatch();
    return (
        <div className={style.Authors}>
            {auth.token ? (
                <>
                    <Modal
                        show={showModal}
                        modalClosed={() => setShowModal(false)}
                    >
                        <NewAuthor onSuccess={() => setShowModal(false)} />
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
                    {authors.map((author) => {
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
                                    <Link to={path + "/" + id}>
                                        <InfoCircle className={style.Action} />
                                    </Link>
                                    {auth.token ? (
                                        <Button
                                            variant="link"
                                            onClick={() => onAuthorDelete(id)}
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

export default Authors;
