import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validator';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import { Textarea } from '../../common/FormsControls/FormsControls';


const maxLength10 = maxLengthCreator(10); // если > 10 символов то ошибка

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
      <Field name="newPostText" component={Textarea} validate={ [required, maxLength10] } placeholder={"Post message"}/>
      <button>Add post</button>
    </form>)
}

const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"}) (AddNewPostForm); //обязательно оборачиваем в reduxForm

export default MyPosts;