import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';



const MyPosts = (props) => {

  let postsElements = props.posts.map( e => <Post message={e.message} likesCount={e.likesCount}/>);
  const onAddPost = (values) => { props.addPost(values.newPostText); }; //диспатчим текст из формы
  return (
    <div className = { style.posts }>
      <p>My posts:</p>
      <AddNewPostFormRedux onSubmit={onAddPost}/>
      <div className = { style.allPosts }> { postsElements } </div>
    </div>
  );
}

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name="newPostText" component="textarea"/>
      <button>Add post</button>
    </form>)
}

const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"}) (AddNewPostForm); //обязательно оборачиваем в reduxForm

export default MyPosts;