import React from 'react';
import css from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={css.header}>
            <img src='http://logok.org/wp-content/uploads/2014/05/Total-logo-earth-880x660.png' alt='' />
            <div className={css.loginContainer}>
                {props.isAuth
                    ? <div>
                        {props.login}
                        <button onClick={props.logoutRequest}>Logout</button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;