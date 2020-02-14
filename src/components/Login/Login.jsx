import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validator';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div><Field placeholder={"Login"}
                  name={"login"}
                  validate={[required]}
                  component={Input}/></div>
      <div><Field placeholder={"Password"}
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
    console.log(formData);
  }
  return (
  <div>
    <h1>LOGIN</h1>
    <LoginReduxForm onSubmit={onSubmit} />
  </div>)
}

export default Login;