import { Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Authors from "./containers/Authors";
import Books from "./containers/Books";
import Home from "./containers/Home";
import Login from "./containers/Login";

const App = () => {
    return (
        <>
            <Nav isAuth={false} />
            <Switch>
                <Route path="/books">
                    <Books />
                </Route>
                <Route path="/authors">
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
