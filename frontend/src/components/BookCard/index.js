import React from "react";
import "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

import style from "./BookCard.module.css";
import defaultBookImage from "../../assets/book-default.jpg";

const BookCard = (props) => {
    const { isbn, title, pages, published, image } = props;

    const auth = useSelector((state) => state.auth);

    return (
        <div className={style.BookCard}>
            <Link to={`/books/${isbn}`} className={style.Link}>
                <div className={style.ImageWrapper}>
                    <img
                        src={image ? image : defaultBookImage}
                        alt={image ? `${title} cover` : "Default book cover"}
                    />
                </div>
                <div className={style.Info}>
                    <h4>{title}</h4>
                    <p>
                        <strong>ISBN: </strong>
                        {isbn}
                    </p>
                    <p>
                        <strong>Pages: </strong>
                        {pages}
                    </p>
                    <p>
                        <strong>Published: </strong>
                        {published}
                    </p>
                </div>
            </Link>
            {auth.token ? (
                <div className={style.Actions}>
                    <>
                        <Link to={`/books/edit/${isbn}`}>
                            <Button
                                className={style.Action}
                                variant="outline-primary"
                                size="sm"
                            >
                                Edit
                            </Button>
                        </Link>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className={style.Action}
                            onClick={() => props.deleteMethod(isbn)}
                        >
                            Delete
                        </Button>
                    </>
                </div>
            ) : null}
        </div>
    );
};

export default BookCard;
