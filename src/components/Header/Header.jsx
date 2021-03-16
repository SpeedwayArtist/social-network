import React from 'react';
import css from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={css.header}>
            <h1>Social network API</h1>
            <div className={css.loginContainer}>
                {props.isAuth
                    ? <div>
                        <span>Hello, {props.login}!</span> |
                        <button onClick={props.logoutRequest}>Logout</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;