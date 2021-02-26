import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import BookList from "../../components/BookList";

import * as actions from "../../store/actions";

import style from "./Books.module.css";

const Books = () => {
    const amount = 10;
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const onBooksFetch = useCallback(
        (search, page, amount) =>
            dispatch(actions.fetchBooks(search, page, amount)),
        [dispatch]
    );

    const onBookDelete = useCallback((id) => dispatch(actions.deleteBook(id)), [
        dispatch,
    ]);

    const onBookAdd = useCallback((book) => dispatch(actions.addBook(book)), [
        dispatch,
    ]);

    const books = useSelector((state) => state.books.data);
    const pagination = useSelector((state) => state.books.pagination);

    const getNext = () => {
        onBooksFetch(
            search,
            parseInt(pagination.currentPage) + 1 || 1,
            pagination.perPage || amount
        );
    };

    useEffect(() => {
        getNext();
    }, [onBooksFetch]);

    const onSeachChange = (event) => {
        setSearch(event.target.value);
        onBooksFetch(event.target.value, 1, amount);
    };

    return (
        <div className={style.Container}>
            <div className="form-group">
                <label>Title: </label>
                <input
                    type="text"
                    className="form-control"
                    value={search}
                    onChange={(event) => onSeachChange(event)}
                ></input>
            </div>
            <InfiniteScroll
                dataLength={books.length}
                next={getNext}
                hasMore={
                    parseInt(pagination.to) - parseInt(pagination.from) ===
                    amount
                }
                loader={<h4>Loading...</h4>}
            >
                <BookList
                    books={books}
                    addMethod={onBookAdd}
                    deleteMethod={onBookDelete}
                />
            </InfiniteScroll>
        </div>
    );
};

export default Books;
