import {connect} from "react-redux";
import {
    follow,
    unfollow,
    setFollowingInProgress, requestUsers
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from '../../redux/users-selectors'

class UsersContainer extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (num) => {
        const {pageSize} = this.props;
        this.props.requestUsers(num, this.props.pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       users={this.props.users}
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
                       followingInProgress={this.props.followingInProgress}
                       isAuth={this.props.isAuth}
                       />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = {follow, unfollow, setFollowingInProgress, requestUsers};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer);