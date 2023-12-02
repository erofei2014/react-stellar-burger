import { useState } from 'react';

export const useForm = (inputform={}) => {
  const [form, setValue] = useState(inputform);

  const onChange = (e) => {
    setValue({...form, [e.target.name]: e.target.value});
  };

  return {form, setValue, onChange};
};