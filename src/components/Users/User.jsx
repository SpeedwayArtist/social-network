import React from 'react';
import css from './User.module.css';
import avatarPlaceholder from '../../assets/images/user_avatar_placeholder.svg';
import {NavLink} from 'react-router-dom';

const User = ({user, followingInProgress, unfollow, follow, isAuth}) => {
    return (
        <div className={css.userItem}>
            <div className={css.userAvatarContainer}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : avatarPlaceholder} alt=''/>
                </NavLink>
            </div>
            <div>
                <div className={css.field}>
                    <span className={css.fieldTitle}>Name: </span><span>{user.name} </span>
                </div>
                <div className={css.field}>
                    <span className={css.fieldTitle}>Status: </span><span>{user.status} </span>
                </div>
                <div className={css.field}>
                    <span className={css.fieldTitle}>Location: </span>
                    <span>{'user.location.country, user.location.city'}</span>
                </div>
            </div>
            {isAuth &&
            (user.followed
                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  unfollow(user.id)
                              }}>Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  follow(user.id)
                              }}>Follow</button>
            )}
            <div className={css.clear}></div>
        </div>
    );
}

export default User;