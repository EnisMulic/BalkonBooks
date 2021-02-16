import React from "react";
import Backdrop from "../Backdrop";

import style from "./Modal.module.css";

const Modal = (props) => {
    const classes = [style.Modal];

    if (props.show) {
        classes.push(style.Show);
    } else {
        classes.push(style.Hide);
    }

    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.join(" ")}>{props.children}</div>
        </>
    );
};

export default Modal;
