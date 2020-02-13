import React from 'react';
import { reduxForm, Field } from 'redux-form';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div><Field placeholder={"Login"} name={"login"} component={"input"}/></div>
      <div><Field placeholder={"Password"} name={"password"} component={"input"}/></div>
      <div><Field type={"checkbox"} name={"rememberMe"} component={"input"}/> remember me </div>
      <div><button>Login</button></div>
    </form>)
}

/* контейнерная компонента формируемая с помощью reduxForm */
const LoginReduxForm = reduxForm({form: 'login'}) (LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => { //собирает данные из формы логин пароль rememberMe
    console.log(formData);
  }
  return (
  <div>
    <h1>LOGIN</h1>
    <LoginReduxForm onSubmit={onSubmit} />
  </div>)
}

export default Login;