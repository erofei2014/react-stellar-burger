import React, { useCallback } from 'react';
import styles from './user-auth-pages.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';
import { postPasswordReset } from '../utils/burger-api';
import { PATH_LOGIN } from '../components/app/app';

function ForgotPassword() {
  const navigate = useNavigate();
  const { form, onChange } = useForm({email: ''});

  const onSubmit = useCallback(e => {
    e.preventDefault();
    postPasswordReset(form)
      .then(res => {
        localStorage.setItem("passwordIsRequested", true);
        navigate('/reset-password');
      });
  });

  return(
    <form className={`${styles.container} ${styles.margin_top}`} onSubmit={onSubmit}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <EmailInput 
        extraClass="mt-6" 
        placeholder={'Укажите e-mail'}
        name={'email'}
        value={form.email}
        onChange={onChange}
      />
      <Button htmlType="submit" extraClass="mt-6">Восстановить</Button>
      <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль?<Link to={PATH_LOGIN} className={`${styles.link} ml-2`}>Войти</Link></p>
    </form>
  );
};

export default ForgotPassword;