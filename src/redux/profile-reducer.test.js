import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

let state = {
  posts: [
    {id: 1, message: 'Hi, lol', likesCount:'80'},
    {id: 2, message: 'Hi, kok', likesCount:'140'}
  ]
};

it('length of post should be increment', () => {
  // 1. test data
  let action = addPostActionCreator("it-kamasutra.com");
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.posts.length).toBe(3);
});

it('message of new post should be correct', () => {
  // 1. test data
  let action = addPostActionCreator("it-kamasutra.com");
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.posts[2].message).toBe("it-kamasutra.com");
});

it('after deleting length of message should be decrement', () => {
  // 1. test data
  let action = deletePost(1);
  // 2. action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.posts.length).toBe(1);
});