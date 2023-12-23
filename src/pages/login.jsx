import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from './user-auth-pages.module.css';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';
import { login } from '../services/actions/authentification';
import { PATH_REGISTER, PATH_FORGOT_PASSWORD } from '../components/app/app';
import { refreshToken } from '../utils/burger-api';

function Login() {
  const dispatch = useDispatch();
  
  const { form, onChange } = useForm({email: '', password: ''});

  const onSubmit = useCallback(e => {
    e.preventDefault();
    dispatch(login(form));
  });

  return(
    <form className={`${styles.container} ${styles.margin_top}`} onSubmit={onSubmit}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <EmailInput 
        extraClass="mt-6" 
        name={'email'}
        value={form.email}
        onChange={onChange}
      />
      <PasswordInput 
        extraClass="mt-6" 
        name={'password'}
        value={form.password}
        onChange={onChange}
      />
      <Button htmlType="submit" extraClass="mt-6">Войти</Button>
      <p className="text text_type_main-default text_color_inactive mt-20">Вы — новый пользователь?<Link to={PATH_REGISTER} className={`${styles.link} ml-2`}>Зарегистрироваться</Link></p>
      <p className="text text_type_main-default text_color_inactive mt-4">Забыли пароль?<Link to={PATH_FORGOT_PASSWORD} className={`${styles.link} ml-2`}>Восстановить пароль</Link></p>
    </form>
  );
}

export default Login;