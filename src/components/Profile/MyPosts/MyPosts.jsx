import React from 'react';
import css from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostFormRedux from "./AddPostFormRedux";

const MyPosts = React.memo((props) => {
    let postElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    let onAddPost = (values) => {
        props.addPost(values.newPostBody);
    }

    return (
        <div className={css.postsContainer}>
            <h3>
                My posts
            </h3>
            <div>
                <AddPostFormRedux onSubmit={onAddPost}/>
            </div>
            <div className={css.postsItems}>
                {postElements}
            </div>
        </div>
    );
});

export default MyPosts;