import React, { useCallback, FormEvent } from 'react';
import styles from './user-auth-pages.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';
import { postNewPassword } from '../utils/burger-api';
import { PATH_HOME, PATH_LOGIN } from '../components/app/app';

function ResetPassword() {
  const navigate = useNavigate();
  const { form, onChange } = useForm({password: '', token: ''});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postNewPassword(form.password, form.token)
      .then(res => {
        localStorage.removeItem("passwordIsRequested");
        navigate(PATH_LOGIN);
      });
  };  

  if(!localStorage.getItem("passwordIsRequested")) {
    return <Navigate to={PATH_HOME} />;
  }

  return(
    <form className={`${styles.container} ${styles.margin_top}`} onSubmit={onSubmit}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <PasswordInput 
        extraClass="mt-6" 
        placeholder={'Введите новый пароль'}
        name={'password'}
        value={form.password}
        onChange={onChange}
      />
      <Input 
        extraClass="mt-6" 
        placeholder={'Введите код из письма'}
        type={'text'}
        name={'token'}
        error={false}
        errorText={'Ошибка'}
        value={form.token}
        onChange={onChange}
      />
      <Button htmlType="submit" extraClass="mt-6">Сохранить</Button>
      <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль?<span className={`${styles.link} ml-2`}>Войти</span></p>
    </form>
  );
}

export default ResetPassword;