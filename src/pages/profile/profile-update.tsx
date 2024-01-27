import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './profile-update.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../hooks/useForm';
import { updateProfile } from '../../services/actions/authentification';
import { getAuthentification } from '../../services/selectors/authentification';

function ProfileUpdate() {
  const dispatch = useDispatch();
  const { user } = useSelector(getAuthentification);

  const { form, setValue, onChange } = useForm(user ? {name: user.name, email: user.email, password: ''} : {name: '', emal: '', password: ''});

  const [isFormChanged, setIsFormChanged] = useState(false);
  const buttonsVisible = isFormChanged ? '' : `${styles.buttons_container_hidden}`;

  const onFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e);
    if (user && user.name === form.name && user.email === form.email && form.password === '') {
      setIsFormChanged(false);
    } else {
      setIsFormChanged(true);
    }
  };

  const abortChanges = () => {
    setIsFormChanged(false);
    setValue(user ? {name: user.name, email: user.email, password: ''} : {name: '', emal: '', password: ''});
  };

  const saveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile(form));
    setIsFormChanged(false);
    setValue(user ? {name: form.name, email: form.email, password: ''} : {name: '', emal: '', password: ''});
  };

  return(
    <form className={styles.container} onSubmit={saveChanges} name={'profile'}>
      <Input 
        placeholder={'Имя'}
        type={'text'}
        name={'name'}
        value={form.name}
        icon={'EditIcon'}
        error={false}
        errorText={'Ошибка'}
        onChange={onFormChange}
      />
      <EmailInput 
        placeholder={'Логин'}
        name={'email'}
        value={form.email}
        onChange={onFormChange}
      />
      <PasswordInput  
        icon={'EditIcon'}
        name={'password'}
        value={form.password}
        onChange={onFormChange}
      />
      <div className={`${styles.buttons_container} ${buttonsVisible}`}>
        <Button 
          type='secondary' 
          htmlType='reset' 
          extraClass='pl-2 pr-2'
          onClick={abortChanges}
        >Отмена</Button>
        <Button type='primary' htmlType='submit'>Сохранить</Button>
      </div>
    </form>
  );
}

export default ProfileUpdate;