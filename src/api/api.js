import * as axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c8203bd9-dd64-4cd7-9191-bfdc5a1ca3dd'
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;
        });
    },
    follow(userId) {
        return axiosInstance.post('follow/' + userId).then(response => {
            return response.data;
        });
    },
    unfollow(userId) {
        return axiosInstance.delete('follow/' + userId).then(response => {
            return response.data;
        });
    }
}

export const profileAPI = {
    getProfile(userId = 2) {
        return axiosInstance.get('profile/' + userId).then(response => {
            return response.data;
        });
    },
    getStatus(userId) {
        return axiosInstance.get('profile/status/' + userId).then(response => {
            return response.data;
        });
    },
    updateStatus(status) {
        return axiosInstance.put('profile/status', {status: status}).then(response => {
            return response.data;
        });
    }
}

export const authAPI = {
    getAuth() {
        return axiosInstance.get('auth/me').then(response => {
           return response.data;
        });
    },
    loginRequest(email, password, rememberMe = false) {
        return axiosInstance.post('auth/login', {email: email, password: password, rememberMe: rememberMe}).then(response => {
            return response.data;
        });
    },
    logoutRequest() {
        return axiosInstance.delete('auth/login').then(response => {
            return response.data;
        });
    }
}