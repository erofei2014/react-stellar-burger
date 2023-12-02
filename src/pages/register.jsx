import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from './user-auth-pages.module.css';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';
import { registerNewUser } from '../services/actions/authentification';

function Register() {
  const dispatch = useDispatch();

  const { form, onChange } = useForm({name: '', email: '', password: ''});

  const onSubmit = useCallback(e => {
    e.preventDefault();
    dispatch(registerNewUser(form));
  });

  return(
    <form className={`${styles.container} ${styles.margin_top}`} onSubmit={onSubmit}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <Input 
        extraClass="mt-6" 
        placeholder={'Имя'}
        type={'text'}
        name={'name'}
        value={form.name}
        error={false}
        errorText={'Ошибка'}
        onChange={onChange}
      />
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
      <Button htmlType="submit" extraClass="mt-6">Зарегистрироваться</Button>
      <p className="text text_type_main-default text_color_inactive mt-20">Уже зарегистрированы?<Link to='/login' className={`${styles.link} ml-2`}>Войти</Link></p>
    </form>
  );
}

export default Register;