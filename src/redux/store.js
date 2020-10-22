import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogsReducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'My first post', likesCount: 14},
                {id: 2, message: 'My second post', likesCount: 145},
                {id: 3, message: 'Props from state.js', likesCount: 322}
            ],
            postText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'User 1'},
                {id: 2, name: 'User 2'},
                {id: 3, name: 'User 3'},
                {id: 4, name: 'User 4'},
                {id: 5, name: 'User from state.js'}
            ],
            messages: [
                {id: 1, message: 'Hi!'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'Nice!'},
                {id: 4, message: 'Message from state.js'}
            ],
            messageText: ''
        }
    },
    _callSubscriber() {
        console.log('state changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this.getState());
    }
};

export default store;
window.store = store;