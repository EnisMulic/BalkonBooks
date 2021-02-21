import React from "react";
import "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

import style from "./AuthorCard.module.css";
import defaultAuthorImage from "../../assets/author-default.png";

const AuthorCard = (props) => {
    const { id, firstName, lastName, dob, image } = props;
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };

    const auth = useSelector((state) => state.auth);

    return (
        <div className={style.AuthorCard}>
            <Link to={`/authors/${id}`} className={style.Link}>
                <div className={style.ImageWrapper}>
                    <img
                        src={image ? image : defaultAuthorImage}
                        alt={
                            image
                                ? `${firstName} ${lastName}`
                                : "Default image for an author"
                        }
                    />
                </div>
                <div className={style.Info}>
                    <h4>
                        {lastName}, {firstName}
                    </h4>
                    <p>{new Date(dob).toLocaleString("en-Us", dateOptions)}</p>
                </div>
            </Link>
            {auth.token ? (
                <div className={style.Actions}>
                    <>
                        <Link to={`/authors/edit/${id}`}>
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
                            onClick={() => props.deleteMethod(id)}
                        >
                            Delete
                        </Button>
                    </>
                </div>
            ) : null}
        </div>
    );
};

export default AuthorCard;
