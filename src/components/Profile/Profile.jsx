import React from 'react';
import css from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
                         updateUserStatus={props.updateUserStatus} setAvatar={props.setAvatar} saveProfile={props.saveProfile} isEditMode={props.isEditMode} setUserProfileEditMode={props.setUserProfileEditMode}/>
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;