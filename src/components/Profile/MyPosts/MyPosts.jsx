import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';



const MyPosts = (props) => {

  let postsElements = props.posts.map( e => <Post message={e.message} likesCount={e.likesCount}/>);
  let newPostElement = React.createRef();

  const onAddPost = () => { props.addPost(); };
  const onPostChange = () => { props.updateNewPostText(newPostElement.current.value); };

  return (
    <div className = { style.posts }>
      <p>My posts:</p>
      <textarea ref={newPostElement} cols="50" rows="3"
                placeholder='Enter your post'
                onChange={onPostChange}
                value={props.newPostText}/>
      <button className = { style.button }
              onClick={ onAddPost }>Add post</button>
      <div className = { style.allPosts }> { postsElements } </div>
    </div>
    );
  }

export default MyPosts;