import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

import * as actions from "../../store/actions";

import style from "./Authors.module.css";

const Authors = () => {
    const dispatch = useDispatch();

    const onAuthorsFetch = useCallback(() => dispatch(actions.fetchAuthors()), [
        dispatch,
    ]);

    const authors = useSelector((state) => state.authors.data);

    useEffect(() => {
        onAuthorsFetch();
    }, [onAuthorsFetch]);

    const dateOptions = { year: "numeric", month: "long", day: "numeric" };

    return (
        <div className={style.Authors}>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Date of birth</th>
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
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default Authors;
