import React from "react";

import defaultBookImage from "../../assets/background.png";

import style from "./Home.module.css";

const Home = (props) => {
    return (
        <div className={style.Home}>
            <img src={defaultBookImage} />
        </div>
    );
};

export default Home;
