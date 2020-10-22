import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'My first post', likesCount: 14},
        {id: 2, message: 'My second post', likesCount: 145},
        {id: 3, message: 'Props from state.js', likesCount: 322}
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                message: action.newPostBody,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export const addPostCreator = (newPostBody) => ({type: ADD_POST, newPostBody});
export const deletePostCreator = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});


export const getUserProfile = (userId) => async (dispatch) => {
    let responseData = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(responseData));
}
export const getUserStatus = (userId) => async (dispatch) => {
    let responseData = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(responseData));
}
export const updateUserStatus = (status) => async (dispatch) => {
    let responseData = await profileAPI.updateStatus(status);
    if (responseData.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}

export default profileReducer;