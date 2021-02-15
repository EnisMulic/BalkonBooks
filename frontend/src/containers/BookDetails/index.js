import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";

import style from "./BookDetails.module.css";
import defaultBookImage from "../../assets/book-default.jpg";

const BookDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const onBookFetch = useCallback((id) => dispatch(actions.fetchBook(id)), [
        dispatch,
    ]);

    const bookData = useSelector((state) => state.book.data);

    useEffect(() => {
        onBookFetch(id);
    }, [onBookFetch, id]);

    let book = null;

    if (bookData !== null) {
        const { isbn, title, pages, published, image } = bookData;
        book = (
            <div className={style.Book}>
                <p className={style.Title}>{title}</p>
                <img
                    className={style.Image}
                    src={image ? image : defaultBookImage}
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
        );
    }

    return <>{book}</>;
};

export default BookDetails;
