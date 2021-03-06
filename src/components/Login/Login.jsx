import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginRequest} from "../../redux/auth-reducer";
import {compose} from "redux";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import formCss from '../common/FormsControls/FormsControls.module.css';
import css from './Login.module.css';

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me')}
            {captchaUrl && <img src={captchaUrl} alt={''}/>}
            {captchaUrl && createField('Enter symbols from captcha', 'captcha', [required], Input)}
            {error &&
            <div className={formCss.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button className={formCss.formButton}>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
        props.loginRequest(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        console.log('profile');
        return <Redirect to={'profile'}/>
    }

    return (
        <div className={css.container}>
            <div className={css.form}>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default compose(
    connect(mapStateToProps, {loginRequest})
)(Login);