import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import { addPostActionCreator, addUpdateNewPostTextActionCreator } from '../../../redux/state';



const MyPosts = (props) => {

  let postsElements = props.posts.map( e => <Post message={e.message} likesCount={e.likesCount}/>)

  let newPostElement = React.createRef();

  const addPost = () => {
    props.dispatch(addPostActionCreator());
  };

  const onPostChange = () => {
    let text = newPostElement.current.value;
    let action = addUpdateNewPostTextActionCreator(text);
    props.dispatch(action);
  };

  return (
    <div className = { style.posts }>
      <p>My posts:</p>

      <textarea ref={newPostElement} cols="50" rows="3"
                onChange={onPostChange}
                value={props.newPostText}/>

      <button className = { style.button }
              onClick={ addPost }>Add post</button>

      <div className = { style.allPosts }> { postsElements } </div>
    </div>
    );
  }

export default MyPosts;