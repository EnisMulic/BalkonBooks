import React from "react";

import Nav from "react-bootstrap/Nav";
import style from "./Nav.module.css";

const NavBar = (props) => {
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
                {!props.isAuth ? (
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
