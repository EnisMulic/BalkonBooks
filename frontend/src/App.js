import { useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "./store/actions";
import "./App.css";

import Nav from "./components/Nav";
import AuthorDetails from "./containers/AuthorDetails";
import Authors from "./containers/Authors";
import BookDetails from "./containers/BookDetails";
import Books from "./containers/Books";
import Home from "./containers/Home";
import Login from "./containers/Login";

const App = () => {
    const dispatch = useDispatch();

    const onTryAutoAuth = useCallback(
        () => dispatch(actions.authCheckState()),
        [dispatch]
    );

    useEffect(() => {
        onTryAutoAuth();
    }, [onTryAutoAuth]);

    return (
        <>
            <Nav />
            <Switch>
                <Route path="/books/:id">
                    <BookDetails />
                </Route>
                <Route path="/books" exact>
                    <Books />
                </Route>
                <Route path="/authors/:id">
                    <AuthorDetails />
                </Route>
                <Route path="/authors" exact>
                    <Authors />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
            </Switch>
        </>
    );
};

export default App;
