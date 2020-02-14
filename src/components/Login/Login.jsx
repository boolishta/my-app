import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validator';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div><Field placeholder={"email"}
                  name={"email"}
                  validate={[required]}
                  component={Input}/></div>
      <div><Field placeholder={"Password"}
                  type={"password"}
                  name={"password"}
                  validate={[required]}
                  component={Input}/></div>
      <div><Field name={"rememberMe"}
                  component={Input}
                  type={"checkbox"}/> remember me </div>
      <div><button>Login</button></div>
    </form>)
}

/* контейнерная компонента формируемая с помощью reduxForm */
const LoginReduxForm = reduxForm({form: 'login'}) (LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => { //собирает данные из формы логин пароль rememberMe
    props.login(formData.email, formData.password, formData.rememberMe);
  }

  if(props.isAuth) { //если залогинины то redirect на страницу profile
    return <Redirect to={"/profile"} />
  }

  return (
  <div>
    <h1>LOGIN</h1>
    <LoginReduxForm onSubmit={onSubmit} />
  </div>)
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login}) (Login);