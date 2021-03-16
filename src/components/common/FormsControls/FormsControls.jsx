import React from 'react';
import css from './FormsControls.module.css';
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, children, ...props}) => {
    const isError = touched && error;
    return (
        <div className={css.formControl + " " + (isError ? css.error : '')}>
            <div>
                {React.cloneElement(children, {...input, ...props})}
            </div>
            {isError && <span className={css.errorMsg}>{error}</span>}
        </div>
    );
}

export const Textarea = (props) => {
    return <FormControl {...props}><textarea /></FormControl>

}

export const Input = (props) => {
    return <FormControl {...props}><input /></FormControl>
}

export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
    return <div className={props.type ? css[props.type] + " " + css.formFieldWrapper : css.formFieldWrapper}>
        {text &&
            <div className={css.formFieldText}>
                {text}
            </div>
        }
        <Field className={css.formField} component={component} name={name} placeholder={placeholder} validate={validators} {...props} />
    </div>
}