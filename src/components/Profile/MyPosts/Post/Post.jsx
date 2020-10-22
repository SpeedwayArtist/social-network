import React from 'react';
import css from './Post.module.css';

const Post = (props) => {
    return (
        <div className={css.item}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg' alt='' />
            <div>
                {props.message}
            </div>
            <div>
                <span>Like {props.likesCount}</span>
            </div>
        </div>
    );
}

export default Post;