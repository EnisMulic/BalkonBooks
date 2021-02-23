import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import BookList from "../../components/BookList";

import * as actions from "../../store/actions";

import style from "./Books.module.css";

const Books = () => {
    const amount = 10;
    const dispatch = useDispatch();

    const onBooksFetch = useCallback(
        (page, amount) => dispatch(actions.fetchBooks(page, amount)),
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
            parseInt(pagination.currentPage) + 1 || 1,
            pagination.perPage || amount
        );
    };

    useEffect(() => {
        getNext();
    }, [onBooksFetch]);

    return (
        <div className={style.Container}>
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
