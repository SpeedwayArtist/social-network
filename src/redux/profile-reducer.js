import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SET_USER_AVATAR_SUCCESS = 'SET_USER_AVATAR_SUCCESS';
const SET_USER_PROFILE_EDIT_MODE = 'SET_USER_PROFILE_EDIT_MODE';

let initialState = {
    posts: [
        {id: 1, message: 'My first post', likesCount: 14},
        {id: 2, message: 'My second post', likesCount: 145},
        {id: 3, message: 'Props from state.js', likesCount: 322}
    ],
    profile: null,
    isEditMode: false,
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
        case SET_USER_AVATAR_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.avatar}
            }
        }
        case SET_USER_PROFILE_EDIT_MODE: {
            return {
                ...state,
                isEditMode: action.isEditMode
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
export const setAvatarSuccess = (avatar) => ({type: SET_USER_AVATAR_SUCCESS, avatar});
export const setUserProfileEditMode = (isEditMode) => ({type: SET_USER_PROFILE_EDIT_MODE, isEditMode});

export const getUserProfile = (userId) => async (dispatch) => {
    const responseData = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(responseData));
}
export const getUserStatus = (userId) => async (dispatch) => {
    const responseData = await profileAPI.getStatus(userId);
    dispatch(setUserStatus(responseData));
}
export const updateUserStatus = (status) => async (dispatch) => {
    const responseData = await profileAPI.updateStatus(status);
    if (responseData.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}
export const setAvatar = (imgFile) => async (dispatch) => {
    const responseData = await profileAPI.setAvatar(imgFile);
    if (responseData.resultCode === 0) {
        dispatch(setAvatarSuccess(responseData.data.photos));
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const responseData = await profileAPI.saveProfile(profile);
    if (responseData.resultCode === 0) {
        dispatch(getUserProfile(userId));
        dispatch(setUserProfileEditMode(false));
    } else {
        dispatch(stopSubmit('edit-profile',{contacts: {facebook: responseData.messages[0]}}));
        return Promise.reject(responseData.messages[0]);
    }
}

export default profileReducer;