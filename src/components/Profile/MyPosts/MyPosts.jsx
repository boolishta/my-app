import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validator';
import { Textarea } from '../../common/FormsControls/FormsControls';
import style from './MyPosts.module.css';
import Post from './Post/Post';


const maxLength10 = maxLengthCreator(10); // если > 10 символов то ошибка

const MyPosts = React.memo( (props) => { //React.memo оборачивает компоненту и перерисовывает ее только когда были изменены пропсы или state

  // shouldComponentUpdate(nextProps, nextState) { //применяется в классовой компоненте, отрисовывается если пришли новые props или state
  //   return nextProps !== this.props || nextState !== this.state; //вернем true если props или state изменился
  // }

    let postsElements = props.posts.map( e => <Post message={e.message} likesCount={e.likesCount}/>);
    const onAddPost = (values) => { props.addPost(values.newPostText); }; //диспатчим текст из формы
    return (
      <div className = { style.posts }>
        <p>My posts:</p>
        <AddNewPostFormRedux onSubmit={onAddPost}/>
        <div className = { style.allPosts }> { postsElements } </div>
      </div>
    );
});

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field name="newPostText" component={Textarea} validate={ [required, maxLength10] } placeholder={"Post message"}/>
      <button>Add post</button>
    </form>)
}

const AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"}) (AddNewPostForm); //обязательно оборачиваем в reduxForm

export default MyPosts;