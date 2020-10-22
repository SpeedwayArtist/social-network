import profileReducer, {addPostCreator, deletePostCreator} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'My first post', likesCount: 14},
        {id: 2, message: 'My second post', likesCount: 145},
        {id: 3, message: 'Props from state.js', likesCount: 322}
    ]
};

it('length of posts should be incremented', () => {
    // 1. test data
    let action = addPostCreator('action test');

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(4);
});

it('message of new post should be correct', () => {
    // 1. test data
    let action = addPostCreator('action test');

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts[3].message).toBe('action test');
});

it('length of posts after removing post should be decreased ', () => {
    // 1. test data
    let action = deletePostCreator(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(2);
});

it(`length of posts after removing post shouldn't be decreased if ID is incorrect`, () => {
    // 1. test data
    let action = deletePostCreator(1000);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3);
});
