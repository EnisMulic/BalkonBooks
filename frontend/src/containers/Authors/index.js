import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { InfoCircle, Trash } from "react-bootstrap-icons";

import * as actions from "../../store/actions";

import style from "./Authors.module.css";

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

    const { path } = useRouteMatch();
    return (
        <div className={style.Authors}>
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
                                        <InfoCircle />
                                    </Link>
                                    {auth.token ? (
                                        <Button
                                            variant="link"
                                            onClick={() => onAuthorDelete(id)}
                                        >
                                            <Trash />
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
