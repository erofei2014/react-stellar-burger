import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile-update.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../hooks/useForm';
import { updateProfile } from '../../services/actions/authentification';
import { getAuthentification } from '../../services/selectors/authentification';

function ProfileUpdate() {
  const dispatch = useDispatch();
  const { user } = useSelector(getAuthentification);

  const { form, setValue, onChange } = useForm({name: user.name, email: user.email, password: ''});

  const [isFormChanged, setIsFormChanged] = useState(false);
  const buttonsVisible = isFormChanged ? '' : `${styles.buttons_container_hidden}`;

  const onFormChange = (e) => {
    onChange(e);
    if (user.name === document.forms.profile.name.value && user.email === document.forms.profile.email.value && document.forms.profile.password.value === '') {
      setIsFormChanged(false);
    } else {
      setIsFormChanged(true);
    }
  };

  const abortChanges = () => {
    setIsFormChanged(false);
    setValue({name: user.name, email: user.email, password: ''});
  };

  const saveChanges = useCallback(e => {
    e.preventDefault();
    dispatch(updateProfile(form));
    setIsFormChanged(false);
    setValue({name: user.name, email: user.email, password: ''});
  });

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
        icon={'EditIcon'}
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