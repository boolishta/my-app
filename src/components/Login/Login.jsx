import React from 'react';
import { reduxForm } from 'redux-form';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validator';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from '../common/FormsControls/FormsControls.module.css'

const LoginForm = ({handleSubmit, error, captchaUrl}) => { //получаем из пропсов, что бы не писать props.handleSubmit
  return (
    <form onSubmit={handleSubmit}>
      {createField("email", "email", [required], Input)}
      {createField("Password", "password", [required], Input, {type: "password"})}
      {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
      
      {captchaUrl && <img src={captchaUrl} alt=""/>}
      {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {})}

      { error && <div className={style.formSummaryError}> {error} </div> }
      <div><button>Login</button></div>
    </form>)
}

/* контейнерная компонента формируемая с помощью reduxForm */
const LoginReduxForm = reduxForm({form: 'login'}) (LoginForm) //в form название формы

const Login = (props) => {
  const onSubmit = (formData) => { //собирает данные из формы логин пароль rememberMe
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  if(props.isAuth) { //если залогинины то redirect на страницу profile
    return <Redirect to={"/profile"} />
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login}) (Login);