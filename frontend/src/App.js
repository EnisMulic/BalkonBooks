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
import EditAuthor from "./containers/EditAuthor";
import EditBook from "./containers/EditBook";

const App = () => {
    const dispatch = useDispatch();

    const onTryAutoAuth = useCallback(
        () => dispatch(actions.authCheckState()),
        [dispatch]
    );

    useEffect(() => {
        onTryAutoAuth();
    }, [onTryAutoAuth]);

    const auth = useSelector((state) => state.auth);

    let routes = (
        <Switch>
            <Route path="/books/:id" exact>
                <BookDetails />
            </Route>
            <Route path="/books" exact>
                <Books />
            </Route>
            <Route path="/authors/:id" exact>
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
    );

    if (auth.token !== null) {
        routes = (
            <Switch>
                <Route path="/books/:id" exact>
                    <BookDetails />
                </Route>
                <Route path="/books" exact>
                    <Books />
                </Route>
                <Route path="/books/edit/:id">
                    <EditBook />
                </Route>
                <Route path="/authors/:id" exact>
                    <AuthorDetails />
                </Route>
                <Route path="/authors" exact>
                    <Authors />
                </Route>
                <Route path="/authors/edit/:id">
                    <EditAuthor />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
            </Switch>
        );
    }

    return (
        <>
            <Nav />
            {routes}
        </>
    );
};

export default App;
