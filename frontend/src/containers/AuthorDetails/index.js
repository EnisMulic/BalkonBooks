import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";

import style from "./AuthorDetails.module.css";

import defaultAuthorImage from "../../assets/author-default.png";
import BookList from "../../components/BookList";

const AuthorDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const onAuthorFetch = useCallback(
        (id) => dispatch(actions.fetchAuthor(id)),
        [dispatch]
    );

    const onBookAdd = useCallback(
        (book) => dispatch(actions.addBookToAuthor(id, book)),
        [dispatch]
    );

    const onBookDelete = useCallback((bookId) =>
        dispatch(actions.removeBookFromAuthor(id, bookId))
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
            <div className={style.Container}>
                <div className={style.Author}>
                    <p className={style.Name}>
                        {firstName} {lastName}
                    </p>
                    <img
                        className={style.Image}
                        src={image ? image : defaultAuthorImage}
                        alt={
                            image
                                ? `${firstName} ${lastName}`
                                : "Default image for an author"
                        }
                    />
                    <p>
                        <strong>Born</strong>{" "}
                        {new Date(dob).toLocaleString("en-Us", dateOptions)}
                    </p>
                </div>
                <div className={style.Books}>
                    <h4>Books</h4>
                    <BookList
                        books={authorData.books}
                        addMethod={onBookAdd}
                        deleteMethod={onBookDelete}
                    />
                </div>
            </div>
        );
    }

    return <>{author}</>;
};

export default AuthorDetails;
