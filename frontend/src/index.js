import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";

import booksReducer from "./store/reducers/books";
import authorsReducer from "./store/reducers/authors";
import authorReducer from "./store/reducers/author";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const rootReducer = combineReducers({
    books: booksReducer,
    authors: authorsReducer,
    author: authorReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
