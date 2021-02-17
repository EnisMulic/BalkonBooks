import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";

import style from "./Authors.module.css";
import AuthorList from "../../components/AuthorList";

const Authors = () => {
    const dispatch = useDispatch();

    const onAuthorsFetch = useCallback(() => dispatch(actions.fetchAuthors()), [
        dispatch,
    ]);

    const onAuthorDelete = useCallback(
        (id) => dispatch(actions.deleteAuthor(id)),
        [dispatch]
    );

    const onAuthorAdd = useCallback(
        (author) => dispatch(actions.addAuthor(author)),
        [dispatch]
    );

    const authors = useSelector((state) => state.authors.data);

    useEffect(() => {
        onAuthorsFetch();
    }, [onAuthorsFetch]);

    return (
        <div className={style.Container}>
            <AuthorList
                authors={authors}
                addMethod={onAuthorAdd}
                deleteMethod={onAuthorDelete}
            />
        </div>
    );
};

export default Authors;
