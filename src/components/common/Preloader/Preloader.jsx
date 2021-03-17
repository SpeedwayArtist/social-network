import React from "react";
import preloader from "../../../assets/images/loader.gif";
import css from "./Preloader.module.css";

const Preloader = (props) => {
    return (
        <div className={css.container}>
            <img className={css.img} src={preloader} alt='' />
        </div>
    );
}

export default Preloader;