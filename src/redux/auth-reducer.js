import {authAPI} from "../api/api";
import {stopSubmit} from 'redux-form';

const SET_AUTH_USER_DATA = 'react-app/auth/SET_AUTH_USER_DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({type: SET_AUTH_USER_DATA, payload: {id, email, login, isAuth}});

export const getAuthUserData = () => {
    return async (dispatch) => {
        let responseData = await authAPI.getAuth();

        if (responseData.resultCode === 0) {
            let {id, email, login} = responseData.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}
export const loginRequest = (email, pass, rememberMe = false) => {
    return async (dispatch) => {
        let responseData = await authAPI.loginRequest(email, pass, rememberMe);

        if (responseData.resultCode === 0) {
            dispatch(getAuthUserData());
        }
        else {
            let errMsg = responseData.messages.length > 0 ? responseData.messages : 'Common error'
            dispatch(stopSubmit('login', {_error: errMsg}));
        }
    }
}
export const logoutRequest = () => {
    return async (dispatch) => {
        let responseData = await authAPI.logoutRequest();

        if (responseData.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authReducer;