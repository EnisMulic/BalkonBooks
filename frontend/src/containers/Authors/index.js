import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import * as actions from "../../store/actions";

import style from "./Authors.module.css";
import AuthorList from "../../components/AuthorList";

const Authors = () => {
    const amount = 10;
    const dispatch = useDispatch();

    const onAuthorsFetch = useCallback(
        (page, amount) => dispatch(actions.fetchAuthors(page, amount)),
        [dispatch]
    );

    const onAuthorDelete = useCallback(
        (id) => dispatch(actions.deleteAuthor(id)),
        [dispatch]
    );

    const onAuthorAdd = useCallback(
        (author) => dispatch(actions.addAuthor(author)),
        [dispatch]
    );

    const authors = useSelector((state) => state.authors.data);
    const pagination = useSelector((state) => state.books.pagination);

    const getNext = () => {
        onAuthorsFetch(
            parseInt(pagination.currentPage) + 1 || 1,
            pagination.perPage || amount
        );
    };

    useEffect(() => {
        getNext();
    }, [onAuthorsFetch]);

    return (
        <div className={style.Container}>
            <InfiniteScroll
                dataLength={authors.length}
                next={getNext}
                hasMore={
                    parseInt(pagination.to) - parseInt(pagination.from) ===
                    amount
                }
                loader={<h4>Loading...</h4>}
            >
                <AuthorList
                    authors={authors}
                    addMethod={onAuthorAdd}
                    deleteMethod={onAuthorDelete}
                />
            </InfiniteScroll>
        </div>
    );
};

export default Authors;
