import React from 'react';
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import css from "../../common/FormsControls/FormsControls.module.css";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit, profile, deactivateEditMode}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <b>Full name:</b> {createField('Full name', 'fullName', [], Input)}
        </div>
        <div>
            <b>Open to work:</b> {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
        </div>
        <div>
            <b>Looking for position:</b> {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div>
            <b>About me:</b> {createField('About me', 'aboutMe', [], Textarea)}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <div key={key}>
                <b>{key}:</b> {createField(key, 'contacts.' + key, [], Input)}
            </div>
        })}
        </div>
        <button>Save</button>
        <input type={'button'} value={'Cancel'} onClick={deactivateEditMode}/>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;