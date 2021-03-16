import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return (
        <>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount}
                       pageSize={pageSize}/>
            <div>
                {
                    users.map(user => <User key={user.id}
                                            user={user}
                                            followingInProgress={props.followingInProgress}
                                            unfollow={props.unfollow}
                                            follow={props.follow}
                                            isAuth={props.isAuth}
                    />)
                }
            </div>
        </>
    );
}

export default Users;