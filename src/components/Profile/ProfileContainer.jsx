import React from 'react';
import Profile from './Profile';
import {
    getUserProfile,
    getUserStatus,
    saveProfile,
    setAvatar,
    setUserProfileEditMode,
    updateUserStatus
} from '../../redux/profile-reducer';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            } else {
                this.props.getUserProfile(userId);
                this.props.getUserStatus(userId);
            }
        } else {
            this.props.getUserProfile(userId);
            this.props.getUserStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateUserStatus={this.props.updateUserStatus}
                     setAvatar={this.props.setAvatar}
                     saveProfile={this.props.saveProfile}
                     isEditMode={this.props.isEditMode}
                     setUserProfileEditMode={this.props.setUserProfileEditMode}/>
        );
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isEditMode: state.profilePage.isEditMode,
    status: state.profilePage.status,
    autorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, setAvatar, saveProfile, setUserProfileEditMode}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer);