import React from "react";
import {Field, reduxForm} from "redux-form";
import { Textarea } from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import css from './AddPostFormRedux.module.css';

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={css.field} name={'newPostBody'} component={Textarea} placeholder={'Post message'} validate={[required, maxLength10]} />
            </div>
            <div>
                <button className={css.button}>Add post</button>
            </div>
        </form>
    );
}

const AddPostFormRedux = reduxForm({
    form: 'addNewPost'
})(AddPostForm);

export default AddPostFormRedux;