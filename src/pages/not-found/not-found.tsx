import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './not-found.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { PATH_HOME } from '../../components/app/app';

function NotFound404() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(PATH_HOME, { replace: true });
  };

  return (
    <div className={styles.container}>
      <p className='text text_type_main-large'>Такой страницы не существует</p>
      <Button onClick={onClick} htmlType="button" type="primary" size="large">Вернуться на главную страницу</Button>
    </div>
  );
}

export default NotFound404;