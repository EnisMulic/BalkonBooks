import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";

import style from "./BookDetails.module.css";
import defaultBookImage from "../../assets/book-default.jpg";
import AuthorList from "../../components/AuthorList";

const BookDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const onBookFetch = useCallback(
        (id, page, amount) => dispatch(actions.fetchBook(id, page, amount)),
        [dispatch]
    );

    const onAuthorAdd = useCallback(
        (author) => dispatch(actions.addAuthorToBook(id, author)),
        [dispatch]
    );

    const onAuthorDelete = useCallback((authorId) =>
        dispatch(actions.removeAuthorFromBook(id, authorId))
    );

    const bookData = useSelector((state) => state.book.data);

    useEffect(() => {
        onBookFetch(id);
    }, [onBookFetch, id]);

    let book = null;

    if (bookData !== null) {
        const { isbn, title, pages, published, image } = bookData;
        book = (
            <div className={style.Container}>
                <div className={style.Book}>
                    <p className={style.Title}>{title}</p>
                    <img
                        className={style.Image}
                        src={image ? image : defaultBookImage}
                        alt={
                            image
                                ? `Book cover for ${title}`
                                : "Default book cover"
                        }
                    />
                    <p>
                        <strong>ISBN:</strong> {isbn}
                    </p>
                    <p>
                        <strong>Pages:</strong> {pages}
                    </p>
                    <p>
                        <strong>Published:</strong> {published}
                    </p>
                </div>
                <div className={style.Authors}>
                    <h4>Authors</h4>
                    <AuthorList
                        authors={bookData.authors}
                        getMethod={onBookFetch}
                        addMethod={onAuthorAdd}
                        deleteMethod={onAuthorDelete}
                    />
                </div>
            </div>
        );
    }

    return <>{book}</>;
};

export default BookDetails;
