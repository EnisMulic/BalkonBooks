import React from "react";
import { useSelector } from "react-redux";

import Nav from "react-bootstrap/Nav";
import style from "./Nav.module.css";

const NavBar = () => {
    const auth = useSelector((state) => state.auth);
    console.log(auth);
    return (
        <>
            <Nav className={style.Nav}>
                <Nav.Item className="btn">
                    <Nav.Link href="/" className="text-white">
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="btn">
                    <Nav.Link href="/books" className="text-white">
                        Books
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="btn">
                    <Nav.Link href="/authors" className="text-white">
                        Authors
                    </Nav.Link>
                </Nav.Item>
                <div className={style.Spacer} />
                {auth.token === null ? (
                    <Nav.Item className="btn">
                        <Nav.Link href="/login" className="text-white">
                            Login
                        </Nav.Link>
                    </Nav.Item>
                ) : null}
            </Nav>
        </>
    );
};

export default NavBar;
