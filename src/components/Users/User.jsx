import React from 'react';
import css from './User.module.css';
import avatarPlaceholder from '../../assets/images/user_avatar_placeholder.svg';
import {NavLink} from 'react-router-dom';

const User = ({user, followingInProgress, unfollow, follow, isAuth}) => {
    return (
        <div className={css.userItem}>
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
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small != null ? user.photos.small : avatarPlaceholder} alt=''/>
            </NavLink>
            <span>{user.name} </span>
            <span>{user.status} </span>
            <span>{'user.location.country'}</span>
            <span>{'user.location.city'} </span>
        </div>
    );
}

export default User;