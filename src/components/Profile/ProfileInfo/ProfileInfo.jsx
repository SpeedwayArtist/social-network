import React, {useState} from 'react';
import css from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({isOwner, profile, status, updateUserStatus, setAvatar, saveProfile, isEditMode, setUserProfileEditMode}) => {

    if (!profile) {
        return <Preloader/>
    }

    const activateEditMode = () => {
        setUserProfileEditMode(true);
    }
    const deactivateEditMode = () => {
        setUserProfileEditMode(false);
    }

    const onMainAvatarSelected = (e) => {
        if (e.target.files.length) {
            setAvatar(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData);
    }

    return (
        <div>
            <div className={css.avatarContainer}>
                <div className={css.avatar}>
                    <img
                        src={profile.photos.large ? profile.photos.large : 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg'}
                        alt=''/>
                </div>
                {isOwner && <input type={'file'} onChange={onMainAvatarSelected}/>}
            </div>
            <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
            {isEditMode
                ? <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit} deactivateEditMode={deactivateEditMode}/>
                : <ProfileData profile={profile} isOwner={isOwner} activateEditMode={activateEditMode}/>}
        </div>
    );
}

const ProfileData = ({profile, isOwner, activateEditMode}) => {
    return <div>
        <div className={css.profileField}>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div className={css.profileField}>
            <b>Open to work:</b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
        <div className={css.profileField}>
            <b>Looking for position:</b> {profile.lookingForAJobDescription}
        </div>}
        <div className={css.profileField}>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div className={css.profileField}>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
        {isOwner && <button className={css.editBtn} type={'button'} onClick={activateEditMode}>Edit</button>}
    </div>
}

const Contacts = ({contactTitle, contactValue}) => {
    return <div className={css.contacts}>
        <b>{contactTitle}:</b> {contactValue}
    </div>
}

export default ProfileInfo;