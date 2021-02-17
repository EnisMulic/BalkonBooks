import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookList from "../../components/BookList";

import * as actions from "../../store/actions";

import style from "./Books.module.css";

const Books = () => {
    const dispatch = useDispatch();

    const onBooksFetch = useCallback(() => dispatch(actions.fetchBooks()), [
        dispatch,
    ]);

    const onBookDelete = useCallback((id) => dispatch(actions.deleteBook(id)), [
        dispatch,
    ]);

    const onBookAdd = useCallback((book) => dispatch(actions.addBook(book)), [
        dispatch,
    ]);

    const books = useSelector((state) => state.books.data);

    useEffect(() => {
        onBooksFetch();
    }, [onBooksFetch]);

    return (
        <div className={style.Container}>
            <BookList
                books={books}
                addMethod={onBookAdd}
                deleteMethod={onBookDelete}
            />
        </div>
    );
};

export default Books;
