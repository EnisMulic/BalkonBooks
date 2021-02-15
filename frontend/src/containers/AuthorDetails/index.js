import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";

import style from "./AuthorDetails.module.css";

import defaultAuthorImage from "../../assets/author-default.png";

const AuthorDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const onAuthorFetch = useCallback(
        (id) => dispatch(actions.fetchAuthor(id)),
        [dispatch]
    );

    const authorData = useSelector((state) => state.author.data);

    useEffect(() => {
        onAuthorFetch(id);
    }, [onAuthorFetch, id]);

    const dateOptions = { year: "numeric", month: "long", day: "numeric" };

    let author = null;

    if (authorData !== null) {
        const { firstName, lastName, dob, image } = authorData;
        author = (
            <div className={style.Author}>
                <p className={style.Name}>
                    {firstName} {lastName}
                </p>
                <img
                    className={style.Image}
                    src={image ? image : defaultAuthorImage}
                />
                <p>
                    <strong>Born</strong>{" "}
                    {new Date(dob).toLocaleString("en-Us", dateOptions)}
                </p>
            </div>
        );
    }

    return <>{author}</>;
};

export default AuthorDetails;
