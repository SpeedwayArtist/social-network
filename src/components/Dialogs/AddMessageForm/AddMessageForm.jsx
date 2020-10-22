import {Field, reduxForm} from "redux-form";
import React from "react";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import css from "../Dialogs.module.css";

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={css.inputContainer}>
            <Field component={Textarea} name={'newMessageBody'} placeholder={'Enter Your message'} validate={[required, maxLength50]} />
            <button>Send</button>
        </form>
    );
};

export default reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);