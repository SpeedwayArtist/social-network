import React from 'react';
import css from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from  './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateUserStatus}) => {
    if (!profile) {
        return <Preloader />
    }
    return (
        <div>
            <div className={css.avatar}>
                <img src={profile.photos.large ? profile.photos.large : 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg'} alt='' />
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus} />
            </div>
        </div>
    );
}

export default ProfileInfo;