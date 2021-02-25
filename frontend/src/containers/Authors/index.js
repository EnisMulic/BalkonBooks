import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import * as actions from "../../store/actions";

import style from "./Authors.module.css";
import AuthorList from "../../components/AuthorList";

const Authors = () => {
    const amount = 10;
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const onAuthorsFetch = useCallback(
        (search, page, amount) =>
            dispatch(actions.fetchAuthors(search, page, amount)),
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
            search,
            parseInt(pagination.currentPage) + 1 || 1,
            pagination.perPage || amount
        );
    };

    useEffect(() => {
        getNext();
    }, [onAuthorsFetch]);

    const onSeachChange = (event) => {
        setSearch(event.target.value);
        onAuthorsFetch(event.target.value, 1, amount);
    };

    return (
        <div className={style.Container}>
            <div className="form-group">
                <label>Author: </label>
                <input
                    type="text"
                    className="form-control"
                    value={search}
                    onChange={(event) => onSeachChange(event)}
                ></input>
            </div>
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
